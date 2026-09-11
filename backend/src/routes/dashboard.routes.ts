import { Router } from "express";

import {
    getDashboard
} from "../controllers/dashboard.controllers";

import {
    authMiddleware
} from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";

const router = Router();

router.get(
    "/user",
    authMiddleware,
    authorizeRoles("customer"),
    getDashboard
);

export default router;