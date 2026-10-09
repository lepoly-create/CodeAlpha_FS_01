import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import User, { type IUser } from "../models/User";
import Cart from "../models/Cart";
import EmailVerificationToken from "../models/EmailVerificationToken";

import {
    generateToken,
} from "../utils/jwt";

import {
    generateOpaqueToken,
    hashOpaqueToken,
    createExpiration,
} from "../utils/tokens";

import PasswordResetToken from "../models/PasswordResetToken";

interface LoginData {
    email: string;
    password: string;
}

interface RegisterData {
    fullName: string;
    email: string;
    password: string;
}

export const loginUser = async (
    data: LoginData,
) => {
    const user =
        await User.findOne({
            email: data.email,
        }).select("+password");

    if (
        !user ||
        !user.password
    ) {
        throw new Error(
            "Email ou mot de passe incorrect"
        );
    }

    const passwordValid =
        await bcrypt.compare(
            data.password,
            user.password,
        );

    if (!passwordValid) {
        throw new Error(
            "Email ou mot de passe incorrect"
        );
    }

    if (!user.emailVerified) {
        const error =
            new Error(
                "Veuillez confirmer votre adresse email avant de vous connecter.",
            );

        (error as any).code =
            "EMAIL_NOT_VERIFIED";

        throw error;
    }

    const token =
        generateToken({
            id:
                user._id.toString(),
            email:
                user.email,
            role:
                user.role,
        });

    return {
        token,

        user: {
            id:
                user._id.toString(),
            fullName:
                user.fullName,
            email:
                user.email,
            role:
                user.role,
            profileImage:
                user.profileImage ?? null,
            emailVerified:
                user.emailVerified,
            authProvider:
                user.authProvider,
        },
    };
};

export const registerUser = async (
    data: RegisterData,
) => {
    const hashedPassword =
        await bcrypt.hash(
            data.password,
            10,
        );

    const {
        rawToken,
        tokenHash,
    } = generateOpaqueToken();

    const expiresAt =
        createExpiration(30);

    const session =
        await mongoose.startSession();

    try {
        let user:
            IUser | undefined;

        await session.withTransaction(
            async () => {
                [user] =
                    await User.create(
                        [
                            {
                                fullName:
                                    data.fullName,
                                email:
                                    data.email,
                                password:
                                    hashedPassword,
                                role:
                                    "customer",
                                emailVerified:
                                    false,
                                emailVerifiedAt:
                                    null,
                                authProvider:
                                    "local",
                            },
                        ],
                        {
                            session,
                        },
                    );

                await Cart.create(
                    [
                        {
                            user:
                                user!._id,
                            items: [],
                        },
                    ],
                    {
                        session,
                    },
                );

                await EmailVerificationToken.create(
                    [
                        {
                            user:
                                user!._id,
                            tokenHash,
                            expiresAt,
                        },
                    ],
                    {
                        session,
                    },
                );
            },
        );

        if (!user) {
            throw new Error(
                "Utilisateur non créé"
            );
        }

        return {
            user,
            verificationToken:
                rawToken,
        };
    } catch (error: any) {
        if (
            error?.code === 11000
        ) {
            throw new Error(
                "Cet email est déjà utilisé"
            );
        }

        throw error;
    } finally {
        await session.endSession();
    }
};

export const verifyEmail = async (
    rawToken: string,
) => {
    const tokenHash =
        hashOpaqueToken(rawToken);

    const token =
        await EmailVerificationToken
            .findOneAndDelete({
                tokenHash,
            });

    if (!token) {
        throw new Error(
            "Lien de vérification invalide ou expiré.",
        );
    }

    if (
        token.expiresAt.getTime() <=
        Date.now()
    ) {
        throw new Error(
            "Lien de vérification invalide ou expiré.",
        );
    }

    const user =
        await User.findById(
            token.user,
        );

    if (!user) {
        throw new Error(
            "Utilisateur introuvable",
        );
    }

    /*
     * Confirmation de l'adresse email
     */
    user.emailVerified = true;
    user.emailVerifiedAt = new Date();

    await user.save();

    /*
     * Création de la session MarketElectro
     */
    const authToken =
        generateToken({
            id:
                user._id.toString(),
            email:
                user.email,
            role:
                user.role,
        });

    return {
        token: authToken,

        user: {
            id:
                user._id.toString(),
            fullName:
                user.fullName,
            email:
                user.email,
            role:
                user.role,
            profileImage:
                user.profileImage ?? null,
            emailVerified:
                user.emailVerified,
            authProvider:
                user.authProvider,
        },
    };
};

export const resendVerificationEmail =
    async (
        email: string,
    ) => {
        const user =
            await User.findOne({
                email,
            });

        if (
            !user ||
            user.emailVerified
        ) {
            return null;
        }

        const recentToken =
            await EmailVerificationToken
                .findOne({
                    user:
                        user._id,
                    createdAt: {
                        $gt:
                            new Date(
                                Date.now()
                                -
                                60 * 1000,
                            ),
                    },
                });

        if (recentToken) {
            return null;
        }

        await EmailVerificationToken
            .deleteMany({
                user:
                    user._id,
            });

        const {
            rawToken,
            tokenHash,
        } = generateOpaqueToken();

        await EmailVerificationToken
            .create({
                user:
                    user._id,
                tokenHash,
                expiresAt:
                    createExpiration(30),
            });

        return {
            email:
                user.email,
            fullName:
                user.fullName,
            verificationToken:
                rawToken,
        };
    };

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
        });

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
        expiresAt: createExpiration(15),
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