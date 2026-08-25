import User from "../models/User";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary";

export const getMyProfile = async (userId: string) => {
    const user = await User.findById(userId)
        .select("-password");

    if (!user) {
        throw new Error("Utilisateur introuvable");
    }

    return user;
};

interface UpdateProfileData {
    fullName?: string;
    email?: string;
}

export const updateMyProfile = async (
    userId: string,
    data: UpdateProfileData
) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("Utilisateur introuvable");
    }

    if (data.email && data.email !== user.email) {

        const existingUser = await User.findOne({
            email: data.email
        });

        if (existingUser) {
            throw new Error("Cet email est déjà utilisé");
        }

        user.email = data.email;
    }

    if (data.fullName !== undefined) {
        user.fullName = data.fullName;
    }

    await user.save();

    return await User.findById(userId)
        .select("-password");
};

interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
}

export const changeMyPassword = async (
    userId: string,
    data: ChangePasswordData
) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("Utilisateur introuvable");
    }

    const isCurrentPasswordValid = await bcrypt.compare(
        data.currentPassword,
        user.password
    );

    if (!isCurrentPasswordValid) {
        throw new Error("Mot de passe actuel incorrect");
    }

    if (data.newPassword.length < 6) {
        throw new Error(
            "Le nouveau mot de passe doit contenir au moins 6 caractères"
        );
    }

    const isSamePassword = await bcrypt.compare(
        data.newPassword,
        user.password
    );

    if (isSamePassword) {
        throw new Error(
            "Le nouveau mot de passe doit être différent de l'ancien"
        );
    }

    user.password = await bcrypt.hash(
        data.newPassword,
        10
    );

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

    // Supprimer l'ancienne image de Cloudinary
    if (user.profileImagePublicId) {

        await cloudinary.uploader.destroy(
            user.profileImagePublicId,
            {
                resource_type: "image"
            }
        );
    }

    // Upload de la nouvelle image
    const uploadResult = await new Promise<{
        secure_url: string;
        public_id: string;
    }>((resolve, reject) => {

        const uploadStream =
            cloudinary.uploader.upload_stream(
                {
                    folder: "marketelectro/profiles",
                    resource_type: "image"
                },

                (error, result) => {

                    if (error) {
                        reject(error);
                        return;
                    }

                    if (!result) {
                        reject(
                            new Error(
                                "Échec de l'upload de l'image"
                            )
                        );
                        return;
                    }

                    resolve({
                        secure_url: result.secure_url,
                        public_id: result.public_id
                    });
                }
            );

        uploadStream.end(file.buffer);
    });

    // Sauvegarder les nouvelles informations
    user.profileImage = uploadResult.secure_url;

    user.profileImagePublicId =
        uploadResult.public_id;

    await user.save();

    return await User.findById(userId)
        .select("-password");
};

export const removeMyProfileImage = async (
    userId: string
) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("Utilisateur introuvable");
    }

    if (user.profileImagePublicId) {

        await cloudinary.uploader.destroy(
            user.profileImagePublicId,
            {
                resource_type: "image"
            }
        );
    }

    user.profileImage = null;

    user.profileImagePublicId = null;

    await user.save();

    return await User.findById(userId)
        .select("-password");
};