import bcrypt from "bcryptjs";

import User from "../models/User";
import PasswordResetToken from "../models/PasswordResetToken";

import {
    generateOpaqueToken,
    hashOpaqueToken,
    createExpiration,
} from "../utils/tokens";


interface PasswordResetRequestResult {
    email: string;
    fullName: string;
    resetToken: string;
}

export const requestPasswordReset = async (
    email: string,
): Promise<PasswordResetRequestResult | null> => {
    const normalizedEmail =
        email.trim().toLowerCase();

    const user =
        await User.findOne({
            email: normalizedEmail,
        }).select("+password");

    /*
     * Nous ne révélons jamais si le compte existe.
     */
    if (!user) {
        return null;
    }

    /*
     * Un compte Google uniquement ne possède
     * pas nécessairement de mot de passe local.
     */
    if (!user.password) {
        return null;
    }

    /*
     * Empêcher plusieurs demandes immédiates
     * pour le même compte.
     */
    const recentToken =
        await PasswordResetToken.findOne({
            user: user._id,
            createdAt: {
                $gt: new Date(
                    Date.now() - 60 * 1000,
                ),
            },
        });

    if (recentToken) {
        return null;
    }

    /*
     * Invalider les anciens tokens.
     */
    await PasswordResetToken.deleteMany({
        user: user._id,
    });

    /*
     * Générer un nouveau token.
     *
     * Le token brut sera envoyé par email.
     * Seul son hash sera enregistré en base.
     */
    const {
        rawToken,
        tokenHash,
    } = generateOpaqueToken();

    await PasswordResetToken.create({
        user: user._id,
        tokenHash,
        expiresAt: createExpiration(30),
    });

    return {
        email: user.email,
        fullName: user.fullName,
        resetToken: rawToken,
    };
};


export const resetPassword = async (
    rawToken: string,
    newPassword: string,
) => {
    const tokenHash =
        hashOpaqueToken(rawToken);

    const resetToken =
        await PasswordResetToken.findOne(
            {
                tokenHash,
            },
        );

    if (!resetToken) {
        throw new Error(
            "Le lien de réinitialisation est invalide ou expiré.",
        );
    }

    if (
        resetToken.expiresAt.getTime() <=
        Date.now()
    ) {
        await PasswordResetToken.deleteOne({
            _id: resetToken._id,
        });

        throw new Error(
            "Le lien de réinitialisation est invalide ou expiré.",
        );
    }

    const user =
        await User.findById(
            resetToken.user,
        ).select("+password");

    if (!user) {
        await PasswordResetToken.deleteOne({
            _id: resetToken._id,
        });

        throw new Error(
            "Utilisateur introuvable.",
        );
    }

    /*
     * Empêcher de réutiliser exactement
     * le même mot de passe.
     */
    if (user.password) {
        const samePassword =
            await bcrypt.compare(
                newPassword,
                user.password,
            );

        if (samePassword) {
            throw new Error(
                "Le nouveau mot de passe doit être différent de l'ancien.",
            );
        }
    }

    user.password =
        await bcrypt.hash(
            newPassword,
            10,
        );

    /*
     * Un mot de passe local existe maintenant.
     */
    if (
        user.authProvider ===
        "google"
    ) {
        user.authProvider = "both";
    }

    await user.save();

    /*
     * Un token de reset ne doit être
     * utilisable qu'une seule fois.
     */
    await PasswordResetToken.deleteMany({
        user: user._id,
    });
};