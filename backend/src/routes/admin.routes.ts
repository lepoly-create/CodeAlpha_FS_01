import { Router } from "express";

import {
  getDashboard,
  getProducts,
  getOrders,
  getOrder,
  updateOrderStatus,
} from "../controllers/admin.controllers";

import { authMiddleware } from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";

const router = Router();

router.get(
  "/dashboard",
  authMiddleware,
  authorizeRoles("admin"),
  getDashboard,
);
router.get(
  "/products",
  authMiddleware,
  authorizeRoles("admin"),
  getProducts,
);


router.get(
  "/orders",
  authMiddleware,
  authorizeRoles("admin"),
  getOrders,
);

router.get(
  "/orders/:id",
  authMiddleware,
  authorizeRoles("admin"),
  getOrder,
);

router.put(
  "/orders/:id/status",
  authMiddleware,
  authorizeRoles("admin"),
  updateOrderStatus,
);

export default router;