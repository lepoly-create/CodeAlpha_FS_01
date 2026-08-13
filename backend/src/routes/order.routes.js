"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controllers_1 = require("../controllers/order.controllers");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Créer une commande
router.post("/", auth_middleware_1.authMiddleware, order_controllers_1.checkout);
// Voir toutes mes commandes
router.get("/", auth_middleware_1.authMiddleware, order_controllers_1.getOrders);
// Voir une commande
router.get("/:id", auth_middleware_1.authMiddleware, order_controllers_1.getOrder);
exports.default = router;
