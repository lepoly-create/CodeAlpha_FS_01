import { Router } from "express";

import {
    getMyFavorites,
    addProductToFavorites,
    removeProductFromFavorites
} from "../controllers/favorite.controllers";

import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { favoriteProductSchema } from "../schemas/favorite.schemas";

const router = Router();

router.get(
    "/",
    authMiddleware,
    getMyFavorites
);

router.post(
    "/:productId",
    authMiddleware,
    validate(favoriteProductSchema),
    addProductToFavorites
);

router.delete(
    "/:productId",
    authMiddleware,
    validate(favoriteProductSchema),
    removeProductFromFavorites
);

export default router;