import { Router } from "express";

import {
    getMyCart,
    addProductToCart,
    updateQuantity,
    removeProductFromCart
} from "../controllers/cart.controllers";

import { authMiddleware } from "../middleware/auth.middleware";


const router = Router();


// Voir le panier de l'utilisateur connecté
router.get(
    "/",
    authMiddleware,
    getMyCart
);


// Ajouter un produit au panier
router.post(
    "/",
    authMiddleware,
    addProductToCart
);


// Modifier la quantité d'un produit
router.put(
    "/:productId",
    authMiddleware,
    updateQuantity
);


// Retirer un produit du panier
router.delete(
    "/:productId",
    authMiddleware,
    removeProductFromCart
);


export default router;