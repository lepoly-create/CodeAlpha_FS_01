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
    authMiddleware,
} from "../middleware/auth.middleware";

import {
    authorizeRoles,
} from "../middleware/role.middleware";

import {
    validate,
} from "../middleware/validate.middleware";

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