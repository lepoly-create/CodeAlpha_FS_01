import { Router } from "express";

import {
  getDashboard,
  getProducts,
  getOrders,
  getOrder,
  updateOrderStatus,
  getUsers
} from "../controllers/admin.controllers";

import { authMiddleware } from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";

import {
  getSettings,
  updateSettings,
} from "../controllers/store-settings.controllers";

import { validate } from "../middleware/validate.middleware";

import {
  updateStoreSettingsSchema,
} from "../schemas/store-settings.schemas";
import {
  orderIdSchema,
  updateOrderStatusSchema,
} from "../schemas/order.schemas";

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
  validate(orderIdSchema),
  getOrder,
);

router.put(
  "/orders/:id/status",
  authMiddleware,
  authorizeRoles("admin"),
  validate(updateOrderStatusSchema),
  updateOrderStatus,
);

router.get(
  "/users",
  authMiddleware,
  authorizeRoles("admin"),
  getUsers
);

router.get(
  "/settings/store",
  authMiddleware,
  authorizeRoles("admin"),
  getSettings
);

router.put(
  "/settings/store",
  authMiddleware,
  authorizeRoles("admin"),
  validate(updateStoreSettingsSchema),
  updateSettings
);

export default router;