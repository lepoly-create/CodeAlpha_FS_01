import { Router } from "express";

import {
    getProfile,
    updateProfile,
    changePassword,
    updateProfileImage,
    removeProfileImage
} from "../controllers/user.controllers";

import upload from "../middleware/upload.middleware";
import {
    authMiddleware
} from "../middleware/auth.middleware";


const router = Router();

router.get(
    "/me",
    authMiddleware,
    getProfile
);

router.put(
    "/me",
    authMiddleware,
    updateProfile
);

router.put(
    "/me/password",
    authMiddleware,
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