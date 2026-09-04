import { Router } from "express";

import {
    getDashboard
} from "../controllers/dashboard.controllers";

import {
    authMiddleware
} from "../middleware/auth.middleware";

const router = Router();

router.get(
    "/user",
    authMiddleware,
    getDashboard
);

export default router;