"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controllers_1 = require("../controllers/dashboard.controllers");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = (0, express_1.Router)();
router.get("/user", auth_middleware_1.authMiddleware, (0, role_middleware_1.authorizeRoles)("customer"), dashboard_controllers_1.getDashboard);
exports.default = router;
