import { Router } from "express";

import {
  createMessage,
  getMyMessages,
  getMyConversation,
  getAdminMessages,
  replyToMessage,
  closeMessageConversation,
} from "../controllers/message.controllers";

import { authMiddleware } from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";
import { validate } from "../middleware/validate.middleware";

import {
  createConversationSchema,
  createReplySchema,
} from "../schemas/message.schemas";

const router = Router();

/**
 * Customer
 */

router.post(
  "/",
  authMiddleware,
  authorizeRoles("customer"),
  validate(createConversationSchema),
  createMessage
);

router.get(
  "/my",
  authMiddleware,
  authorizeRoles("customer"),
  getMyMessages
);

router.get(
  "/my/:id",
  authMiddleware,
  authorizeRoles("customer"),
  getMyConversation
);

/**
 * Admin
 */

router.get(
  "/admin",
  authMiddleware,
  authorizeRoles("admin"),
  getAdminMessages
);

router.post(
  "/admin/:id/reply",
  authMiddleware,
  authorizeRoles("admin"),
  validate(createReplySchema),
  replyToMessage
);

router.put(
  "/admin/:id/close",
  authMiddleware,
  authorizeRoles("admin"),
  closeMessageConversation
);

export default router;