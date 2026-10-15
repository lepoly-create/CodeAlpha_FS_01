import { Router } from "express";

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
    validate,
} from "../middleware/validate.middleware";

import upload from "../middleware/upload.middleware";

import {
    updateProfileSchema,
    changePasswordSchema,
    requestEmailChangeSchema,
    linkGoogleAccountSchema,
} from "../schemas/user.schemas";

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
    validate(linkGoogleAccountSchema),
    linkGoogleAccountController,
);

export default router;