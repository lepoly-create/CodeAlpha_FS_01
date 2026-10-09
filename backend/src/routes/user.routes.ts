import { Router } from "express";

import {
    register,
    login,
    verifyEmailController,
    resendVerification,
    googleLogin,
    requestPasswordResetController,
    resetPasswordController,
    verifyEmailChangeController,
} from "../controllers/auth.controllers";

import {
    getMyProfileController,
    updateMyProfileController,
    changeMyPasswordController,
    uploadMyProfileImageController,
    requestEmailChangeController,
    linkGoogleAccountController,
} from "../controllers/user.controllers";

import {
    authMiddleware,
} from "../middleware/auth.middleware";

import {
    authorizeRoles,
} from "../middleware/role.middleware";

import {
    validate,
} from "../middleware/validate.middleware";

import upload from "../middleware/upload.middleware";

import {
    updateProfileSchema,
    changePasswordSchema,
    requestEmailChangeSchema,
} from "../schemas/user.schemas";

import {
    registerSchema,
    loginSchema,
    verifyEmailSchema,
    resendVerificationSchema,
    googleLoginSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    verifyEmailChangeSchema,
} from "../schemas/auth.schemas";

const router = Router();

router.get(
    "/me",
    authMiddleware,
    getMyProfileController,
);

router.put(
    "/me",
    authMiddleware,
    validate(updateProfileSchema),
    updateMyProfileController,
);

router.put(
    "/me/password",
    authMiddleware,
    validate(changePasswordSchema),
    changeMyPasswordController,
);

router.put(
    "/me/avatar",
    authMiddleware,
    upload.single("profileImage"),
    uploadMyProfileImageController,
);

router.post(
    "/me/email-change",
    authMiddleware,
    validate(requestEmailChangeSchema),
    requestEmailChangeController,
);

router.post(
    "/me/google-link",
    authMiddleware,
    linkGoogleAccountController,
);

router.post(
    "/register",
    validate(registerSchema),
    register,
);

router.post(
    "/login",
    validate(loginSchema),
    login,
);

router.post(
    "/google",
    validate(googleLoginSchema),
    googleLogin,
);

router.post(
    "/verify-email",
    validate(verifyEmailSchema),
    verifyEmailController,
);

router.post(
    "/resend-verification",
    validate(
        resendVerificationSchema,
    ),
    resendVerification,
);

router.post(
    "/forgot-password",
    validate(
        forgotPasswordSchema,
    ),
    requestPasswordResetController,
);

router.post(
    "/reset-password",
    validate(
        resetPasswordSchema,
    ),
    resetPasswordController,
);

router.post(
    "/verify-email-change",
    validate(
        verifyEmailChangeSchema,
    ),
    verifyEmailChangeController,
);

router.get(
    "/profile",
    authMiddleware,
    (req, res) => {
        res.json({
            success: true,
            user: req.user,
        });
    },
);

router.get(
    "/admin-test",
    authMiddleware,
    authorizeRoles("admin"),
    (req, res) => {
        res.json({
            success: true,
            message:
                "Bienvenue administrateur",
            user: req.user,
        });
    },
);

router.get(
    "/customer-test",
    authMiddleware,
    authorizeRoles("customer"),
    (req, res) => {
        res.json({
            success: true,
            message:
                "Bienvenue client",
            user: req.user,
        });
    },
);

export default router;