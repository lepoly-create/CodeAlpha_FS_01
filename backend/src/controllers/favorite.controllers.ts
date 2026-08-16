import { Request, Response } from "express";

import {
    getFavorites,
    addFavorite,
    removeFavorite
} from "../services/favorite.services";

export const getMyFavorites = async (
    req: Request,
    res: Response
) => {
    try {
        const favorites = await getFavorites(req.user.id);

        res.status(200).json({
            success: true,
            data: favorites
        });

    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const addProductToFavorites = async (
    req: Request,
    res: Response
) => {
    try {
        const favorites = await addFavorite(
            req.user.id,
            req.params.productId as string
        );

        res.status(200).json({
            success: true,
            message: "Produit ajouté aux favoris",
            data: favorites
        });

    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const removeProductFromFavorites = async (
    req: Request,
    res: Response
) => {
    try {
        const favorites = await removeFavorite(
            req.user.id,
            req.params.productId as string
        );

        res.status(200).json({
            success: true,
            message: "Produit retiré des favoris",
            data: favorites
        });

    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};