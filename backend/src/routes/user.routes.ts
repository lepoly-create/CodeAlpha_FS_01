import { Router } from "express";

import {
    getProfile,
    updateProfile,
    changePassword
} from "../controllers/user.controllers";

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


export default router;