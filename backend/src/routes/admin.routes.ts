import { Router } from "express";

import { getDashboard } from "../controllers/admin.controllers";

import { authMiddleware } from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";

const router = Router();

router.get(
  "/dashboard",
  authMiddleware,
  authorizeRoles("admin"),
  getDashboard,
);

export default router;