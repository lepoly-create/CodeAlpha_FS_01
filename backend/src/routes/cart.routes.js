"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controllers_1 = require("../controllers/cart.controllers");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Voir le panier de l'utilisateur connecté
router.get("/", auth_middleware_1.authMiddleware, cart_controllers_1.getMyCart);
// Ajouter un produit au panier
router.post("/", auth_middleware_1.authMiddleware, cart_controllers_1.addProductToCart);
// Modifier la quantité d'un produit
router.put("/:productId", auth_middleware_1.authMiddleware, cart_controllers_1.updateQuantity);
// Retirer un produit du panier
router.delete("/:productId", auth_middleware_1.authMiddleware, cart_controllers_1.removeProductFromCart);
exports.default = router;
