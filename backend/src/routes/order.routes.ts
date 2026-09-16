import { Router } from "express";

import {
    checkout,
    getOrders,
    getOrder
} from "../controllers/order.controllers";

import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { orderIdSchema } from "../schemas/order.schemas";

const router = Router();


// Créer une commande
router.post(
    "/",
    authMiddleware,
    checkout
);


// Voir toutes mes commandes
router.get(
    "/",
    authMiddleware,
    getOrders
);


// Voir une commande
router.get(
    "/:id",
    authMiddleware,
    validate(orderIdSchema),
    getOrder
);

export default router;