import {
    Request,
    Response,
} from "express";

import {
    registerUser,
    loginUser,
    verifyEmail,
    resendVerificationEmail,
} from "../services/auth.services";

import {
    requestPasswordReset,
    resetPassword,
} from "../services/password.services";

import {
    loginWithGoogle,
} from "../services/google-auth.services";

import {
    verifyEmailChange,
    getMyProfile,
    updateMyProfile,
    changeMyPassword,
    updateMyProfileImage,
    requestEmailChange,
} from "../services/user.services";

import {
    sendEmailChangeEmail,
} from "../services/email.services";

import {
    linkGoogleAccount,
} from "../services/google-auth.services";

export const requestEmailChangeController = async (
    req: Request,
    res: Response,
) => {
    try {
        const result = await requestEmailChange(
            req.user!.id,
            req.body.newEmail,
            req.body.currentPassword,
        );

        await sendEmailChangeEmail(
            result.newEmail,
            result.fullName,
            result.token,
        );

        res.status(200).json({
            success: true,
            message: "Un email de confirmation a été envoyé.",
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const linkGoogleAccountController = async (
    req: Request,
    res: Response,
) => {
    try {
        const profile = await linkGoogleAccount(
            req.user!.id,
            req.body.credential,
        );

        res.status(200).json({
            success: true,
            data: profile,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getMyProfileController = async (
    req: Request,
    res: Response,
) => {
    try {
        const profile = await getMyProfile(req.user!.id);

        res.status(200).json({
            success: true,
            data: profile,
        });
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateMyProfileController = async (
    req: Request,
    res: Response,
) => {
    try {
        const profile = await updateMyProfile(
            req.user!.id,
            req.body,
        );

        res.status(200).json({
            success: true,
            data: profile,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const changeMyPasswordController = async (
    req: Request,
    res: Response,
) => {
    try {
        await changeMyPassword(
            req.user!.id,
            req.body,
        );

        res.status(200).json({
            success: true,
            message: "Mot de passe modifié avec succès.",
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const uploadMyProfileImageController = async (
    req: Request,
    res: Response,
) => {
    try {
        const profile = await updateMyProfileImage(
            req.user!.id,
            req.file!,
        );

        res.status(200).json({
            success: true,
            data: profile,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

import {
    sendVerificationEmail,
    sendPasswordResetEmail,
    sendEmailChangeNotification,
} from "../services/email.services";

export const login = async (
    req: Request,
    res: Response,
) => {
    try {
        const result =
            await loginUser(
                req.body,
            );

        res.status(200).json({
            success: true,
            message:
                "Connexion réussie",
            data: result,
        });
    } catch (error: any) {
        const status =
            error?.code ===
            "EMAIL_NOT_VERIFIED"
                ? 403
                : 401;

        res.status(status).json({
            success: false,
            message:
                error.message,
        });
    }
};

export const register = async (
    req: Request,
    res: Response,
) => {
    try {
        const {
            user,
            verificationToken,
        } =
            await registerUser(
                req.body,
            );

        let emailSent =
            true;

        try {
            await sendVerificationEmail(
                user.email,
                user.fullName,
                verificationToken,
            );
        } catch (emailError) {
            emailSent =
                false;

            console.error(
                "Erreur lors de l'envoi de l'email de vérification :",
                emailError,
            );
        }

        res.status(201).json({
            success: true,

            message:
                emailSent
                    ? "Compte créé. Vérifiez votre adresse email."
                    : "Compte créé, mais l'email de vérification n'a pas pu être envoyé. Vous pourrez demander un nouvel envoi.",

            data: {
                id:
                    user._id.toString(),
                fullName:
                    user.fullName,
                email:
                    user.email,
                emailVerificationRequired:
                    true,
                emailSent,
            },
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message:
                error.message,
        });
    }
};

export const verifyEmailController =
    async (
        req: Request,
        res: Response,
    ) => {
        try {
            const result =
                await verifyEmail(
                    req.body.token,
                );

            res.status(200).json({
                success: true,
                message:
                    "Adresse email vérifiée avec succès.",
                data: result,
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

export const resendVerification =
    async (
        req: Request,
        res: Response,
    ) => {
        try {
            const result =
                await resendVerificationEmail(
                    req.body.email,
                );

            if (result) {
                try {
                    await sendVerificationEmail(
                        result.email,
                        result.fullName,
                        result.verificationToken,
                    );
                } catch (error) {
                    console.error(
                        "Erreur lors du renvoi de l'email :",
                        error,
                    );
                }
            }

            res.status(200).json({
                success: true,
                message:
                    "Si un compte non vérifié correspond à cette adresse, un nouvel email de vérification a été envoyé.",
            });
        } catch {
            res.status(200).json({
                success: true,
                message:
                    "Si un compte non vérifié correspond à cette adresse, un nouvel email de vérification a été envoyé.",
            });
        }
    };

export const googleLogin =
    async (
        req: Request,
        res: Response,
    ) => {
        try {
            const result =
                await loginWithGoogle(
                    req.body.credential,
                );

            res.status(200).json({
                success: true,
                message:
                    "Connexion avec Google réussie",
                data: result,
            });
        } catch (error: any) {
            const status =
                error?.code ===
                "ACCOUNT_LINK_REQUIRED"
                    ? 409
                    : 401;

            res.status(status).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

export const requestPasswordResetController =
    async (
        req: Request,
        res: Response,
    ) => {
        const genericMessage =
            "Si un compte correspond à cette adresse, un email de récupération a été envoyé.";

        try {
            const result =
                await requestPasswordReset(
                    req.body.email,
                );

            if (result) {
                try {
                    await sendPasswordResetEmail(
                        result.email,
                        result.fullName,
                        result.resetToken,
                    );
                } catch (error) {
                    console.error(
                        "Erreur email reset :",
                        error,
                    );
                }
            }

            res.status(200).json({
                success: true,
                message:
                    genericMessage,
            });
        } catch (error) {
            console.error(
                "Erreur password reset :",
                error,
            );

            res.status(200).json({
                success: true,
                message:
                    genericMessage,
            });
        }
    };

export const resetPasswordController =
    async (
        req: Request,
        res: Response,
    ) => {
        try {
            await resetPassword(
                req.body.token,
                req.body.newPassword,
            );

            res.status(200).json({
                success: true,
                message:
                    "Mot de passe modifié avec succès.",
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

export const verifyEmailChangeController =
    async (
        req: Request,
        res: Response,
    ) => {
        try {
            const result =
                await verifyEmailChange(
                    req.body.token,
                );

            try {
                await sendEmailChangeNotification(
                    result.oldEmail,
                    result.fullName,
                    result.newEmail,
                );
            } catch (error) {
                console.error(
                    "Notification ancienne adresse impossible :",
                    error,
                );
            }

            res.status(200).json({
                success: true,
                message:
                    "Adresse email modifiée avec succès.",
                data: result,
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message:
                    error.message,
            });
        }
    };