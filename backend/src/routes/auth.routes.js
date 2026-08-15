"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controllers_1 = require("../controllers/auth.controllers");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = (0, express_1.Router)();
router.post("/register", auth_controllers_1.register);
router.post("/login", auth_controllers_1.login);
router.get("/profile", auth_middleware_1.authMiddleware, (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
});
router.get("/admin-test", auth_middleware_1.authMiddleware, (0, role_middleware_1.authorizeRoles)("admin"), (req, res) => {
    res.json({
        success: true,
        message: "Bienvenue administrateur",
        user: req.user
    });
});
router.get("/customer-test", auth_middleware_1.authMiddleware, (0, role_middleware_1.authorizeRoles)("customer"), (req, res) => {
    res.json({
        success: true,
        message: "Bienvenue client",
        user: req.user
    });
});
exports.default = router;
