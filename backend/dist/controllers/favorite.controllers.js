"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProductFromFavorites = exports.addProductToFavorites = exports.getMyFavorites = void 0;
const favorite_services_1 = require("../services/favorite.services");
const getMyFavorites = async (req, res) => {
    try {
        const favorites = await (0, favorite_services_1.getFavorites)(req.user.id);
        res.status(200).json({
            success: true,
            data: favorites
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
exports.getMyFavorites = getMyFavorites;
const addProductToFavorites = async (req, res) => {
    try {
        const favorites = await (0, favorite_services_1.addFavorite)(req.user.id, req.params.productId);
        res.status(200).json({
            success: true,
            message: "Produit ajouté aux favoris",
            data: favorites
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
exports.addProductToFavorites = addProductToFavorites;
const removeProductFromFavorites = async (req, res) => {
    try {
        const favorites = await (0, favorite_services_1.removeFavorite)(req.user.id, req.params.productId);
        res.status(200).json({
            success: true,
            message: "Produit retiré des favoris",
            data: favorites
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
exports.removeProductFromFavorites = removeProductFromFavorites;
