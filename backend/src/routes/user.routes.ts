import { Router } from "express";

import {
    getProfile,
    updateProfile,
    changePassword,
    updateProfileImage,
    removeProfileImage
} from "../controllers/user.controllers";

import upload from "../middleware/upload.middleware";
import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { updateProfileSchema, changePasswordSchema } from "../schemas/user.schemas";

const router = Router();

router.get(
    "/me",
    authMiddleware,
    getProfile
);

router.put(
    "/me",
    authMiddleware,
    validate(updateProfileSchema),
    updateProfile
);

router.put(
    "/me/password",
    authMiddleware,
    validate(changePasswordSchema),
    changePassword
);

router.put(
    "/me/avatar",
    authMiddleware,
    upload.single("profileImage"),
    updateProfileImage
);

router.delete(
    "/me/avatar",
    authMiddleware,
    removeProfileImage
);

export default router;