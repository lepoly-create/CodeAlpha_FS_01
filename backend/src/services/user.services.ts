import bcrypt from "bcryptjs";
import User from "../models/User";
import cloudinary from "../config/cloudinary";
import EmailChangeToken from "../models/EmailChangeToken";
import {
    generateOpaqueToken,
    hashOpaqueToken,
    createExpiration,
} from "../utils/tokens";

export const getMyProfile = async (userId: string) => {
    const user = await User.findById(userId).select("-password");

    if (!user) {
        throw new Error("Utilisateur introuvable");
    }

    return {
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage ?? null,
        emailVerified: user.emailVerified,
        authProvider: user.authProvider,
    };
};

interface UpdateProfileData {
    fullName: string;
}

export const updateMyProfile = async (
    userId: string,
    data: UpdateProfileData
) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("Utilisateur introuvable");
    }

    user.fullName = data.fullName.trim();
    await user.save();

    return getMyProfile(userId);
};

interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
}

export const changeMyPassword = async (
    userId: string,
    data: ChangePasswordData
) => {
    const user = await User.findById(userId).select("+password");

    if (!user) {
        throw new Error("Utilisateur introuvable");
    }

    if (!user.password) {
        throw new Error(
            "Ce compte utilise uniquement Google pour se connecter."
        );
    }

    const currentPasswordValid = await bcrypt.compare(
        data.currentPassword,
        user.password
    );

    if (!currentPasswordValid) {
        throw new Error("Mot de passe actuel incorrect");
    }

    const samePassword = await bcrypt.compare(
        data.newPassword,
        user.password
    );

    if (samePassword) {
        throw new Error(
            "Le nouveau mot de passe doit être différent de l'ancien"
        );
    }

    // Note : Retirez bcrypt.hash si vous avez un hook pre('save') dans votre User schema
    user.password = await bcrypt.hash(data.newPassword, 10);

    await user.save();
};

export const updateMyProfileImage = async (
    userId: string,
    file: Express.Multer.File
) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("Utilisateur introuvable");
    }

    if (!file) {
        throw new Error("Aucune image fournie");
    }

    // Suppression de l'ancienne image sur Cloudinary si elle existe
    if (user.profileImagePublicId) {
        await cloudinary.uploader.destroy(user.profileImagePublicId, {
            resource_type: "image",
        });
    }

    const uploadResult = await new Promise<{
        secure_url: string;
        public_id: string;
    }>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "marketelectro/profiles",
                resource_type: "image",
            },
            (error, result) => {
                if (error) return reject(error);
                if (!result)
                    return reject(
                        new Error("Échec de l'upload de l'image")
                    );

                resolve({
                    secure_url: result.secure_url,
                    public_id: result.public_id,
                });
            }
        );

        uploadStream.end(file.buffer);
    });

    user.profileImage = uploadResult.secure_url;
    user.profileImagePublicId = uploadResult.public_id;

    await user.save();

    return getMyProfile(userId);
};

export const removeMyProfileImage = async (userId: string) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("Utilisateur introuvable");
    }

    if (user.profileImagePublicId) {
        await cloudinary.uploader.destroy(user.profileImagePublicId, {
            resource_type: "image",
        });
    }

    user.profileImage = null;
    user.profileImagePublicId = null;

    await user.save();

    return getMyProfile(userId);
};

export const requestEmailChange = async (
    userId: string,
    newEmail: string,
    currentPassword: string
) => {
    const user = await User.findById(userId).select("+password");

    if (!user) {
        throw new Error("Utilisateur introuvable");
    }

    if (!user.password) {
        throw new Error(
            "Un mot de passe MarketElectro est requis pour modifier l'adresse email."
        );
    }

    const passwordValid = await bcrypt.compare(
        currentPassword,
        user.password
    );

    if (!passwordValid) {
        throw new Error("Mot de passe actuel incorrect");
    }

    const normalizedEmail = newEmail.trim().toLowerCase();

    if (normalizedEmail === user.email) {
        throw new Error(
            "Cette adresse est déjà associée à votre compte."
        );
    }

    const existing = await User.findOne({ email: normalizedEmail });

    if (existing) {
        throw new Error("Cette adresse email est déjà utilisée.");
    }

    // Annule les anciennes demandes non vérifiées
    await EmailChangeToken.deleteMany({ user: user._id });

    const { rawToken, tokenHash } = generateOpaqueToken();

    await EmailChangeToken.create({
        user: user._id,
        newEmail: normalizedEmail,
        tokenHash,
        expiresAt: createExpiration(30), // Expire dans 30 min
    } as any);

    return {
        oldEmail: user.email,
        newEmail: normalizedEmail,
        fullName: user.fullName,
        token: rawToken,
    };
};

export const verifyEmailChange = async (rawToken: string) => {
    const tokenHash = hashOpaqueToken(rawToken);

    // 1. Recherche du token sans le supprimer immédiatement
    const token = await EmailChangeToken.findOne({ tokenHash });

    if (!token) {
        throw new Error("Lien de changement d'email invalide ou expiré.");
    }

    // 2. Vérification de l'expiration
    if (token.expiresAt.getTime() <= Date.now()) {
        await EmailChangeToken.deleteOne({ _id: token._id });
        throw new Error("Lien de changement d'email invalide ou expiré.");
    }

    const user = await User.findById(token.user);

    if (!user) {
        throw new Error("Utilisateur introuvable");
    }

    const newEmail = (token as typeof token & { newEmail: string }).newEmail;

    // 3. Vérification de conflit (si l'email a été pris entre temps)
    const conflict = await User.findOne({
        email: newEmail,
        _id: { $ne: user._id },
    });

    if (conflict) {
        throw new Error("Cette adresse email est déjà utilisée.");
    }

    const oldEmail = user.email;

    // 4. Mise à jour de l'utilisateur
    user.email = newEmail;
    user.emailVerified = true;
    user.emailVerifiedAt = new Date();

    await user.save();

    // 5. Nettoyage du token consommé
    await EmailChangeToken.deleteOne({ _id: token._id });

    return {
        id: user._id.toString(),
        oldEmail,
        newEmail: user.email,
        fullName: user.fullName,
    };
};