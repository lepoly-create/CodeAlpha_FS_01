"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user.controllers");
const upload_middleware_1 = __importDefault(require("../middleware/upload.middleware"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const validate_middleware_1 = require("../middleware/validate.middleware");
const user_schemas_1 = require("../schemas/user.schemas");
const router = (0, express_1.Router)();
router.get("/me", auth_middleware_1.authMiddleware, user_controllers_1.getProfile);
router.put("/me", auth_middleware_1.authMiddleware, (0, validate_middleware_1.validate)(user_schemas_1.updateProfileSchema), user_controllers_1.updateProfile);
router.put("/me/password", auth_middleware_1.authMiddleware, (0, validate_middleware_1.validate)(user_schemas_1.changePasswordSchema), user_controllers_1.changePassword);
router.put("/me/avatar", auth_middleware_1.authMiddleware, upload_middleware_1.default.single("profileImage"), user_controllers_1.updateProfileImage);
router.delete("/me/avatar", auth_middleware_1.authMiddleware, user_controllers_1.removeProfileImage);
exports.default = router;
