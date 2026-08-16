import { Router } from "express";

import {
    getMyFavorites,
    addProductToFavorites,
    removeProductFromFavorites
} from "../controllers/favorite.controllers";

import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get(
    "/",
    authMiddleware,
    getMyFavorites
);

router.post(
    "/:productId",
    authMiddleware,
    addProductToFavorites
);

router.delete(
    "/:productId",
    authMiddleware,
    removeProductFromFavorites
);

export default router;