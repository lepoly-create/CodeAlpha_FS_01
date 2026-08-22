import User from "../models/User";
import bcrypt from "bcryptjs";

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