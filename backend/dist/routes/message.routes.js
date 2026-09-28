"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_controllers_1 = require("../controllers/message.controllers");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const validate_middleware_1 = require("../middleware/validate.middleware");
const message_schemas_1 = require("../schemas/message.schemas");
const router = (0, express_1.Router)();
/**
 * Customer
 */
router.post("/", auth_middleware_1.authMiddleware, (0, role_middleware_1.authorizeRoles)("customer"), (0, validate_middleware_1.validate)(message_schemas_1.createConversationSchema), message_controllers_1.createMessage);
router.get("/my", auth_middleware_1.authMiddleware, (0, role_middleware_1.authorizeRoles)("customer"), message_controllers_1.getMyMessages);
router.get("/my/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.authorizeRoles)("customer"), message_controllers_1.getMyConversation);
/**
 * Admin
 */
router.get("/admin", auth_middleware_1.authMiddleware, (0, role_middleware_1.authorizeRoles)("admin"), message_controllers_1.getAdminMessages);
router.post("/admin/:id/reply", auth_middleware_1.authMiddleware, (0, role_middleware_1.authorizeRoles)("admin"), (0, validate_middleware_1.validate)(message_schemas_1.createReplySchema), message_controllers_1.replyToMessage);
router.put("/admin/:id/close", auth_middleware_1.authMiddleware, (0, role_middleware_1.authorizeRoles)("admin"), message_controllers_1.closeMessageConversation);
exports.default = router;
