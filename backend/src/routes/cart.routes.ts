import { Router } from "express";

import {
    getMyCart,
    addProductToCart,
    updateQuantity,
    removeProductFromCart
} from "../controllers/cart.controllers";

import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import {
    addCartItemSchema,
    updateCartItemSchema,
} from "../schemas/cart.schemas";


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
    validate(addCartItemSchema),
    addProductToCart
);


// Modifier la quantité d'un produit
router.put(
    "/:productId",
    authMiddleware,
    validate(updateCartItemSchema),
    updateQuantity
);


// Retirer un produit du panier
router.delete(
    "/:productId",
    authMiddleware,
    removeProductFromCart
);


export default router;