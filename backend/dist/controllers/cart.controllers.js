"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProductFromCart = exports.updateQuantity = exports.addProductToCart = exports.getMyCart = void 0;
const cart_services_1 = require("../services/cart.services");
// Voir le panier
const getMyCart = async (req, res) => {
    try {
        const cart = await (0, cart_services_1.getCart)(req.user.id);
        res.status(200).json({
            success: true,
            data: cart
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};
exports.getMyCart = getMyCart;
// Ajouter un produit
const addProductToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await (0, cart_services_1.addToCart)(req.user.id, productId, quantity);
        res.status(200).json({
            success: true,
            message: "Produit ajouté au panier",
            data: cart
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
exports.addProductToCart = addProductToCart;
// Modifier quantité
const updateQuantity = async (req, res) => {
    try {
        const cart = await (0, cart_services_1.updateCartItem)(req.user.id, req.params.productId, req.body.quantity);
        res.status(200).json({
            success: true,
            message: "Quantité modifiée",
            data: cart
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
exports.updateQuantity = updateQuantity;
// Supprimer un produit
const removeProductFromCart = async (req, res) => {
    try {
        const cart = await (0, cart_services_1.removeFromCart)(req.user.id, req.params.productId);
        res.status(200).json({
            success: true,
            message: "Produit retiré du panier",
            data: cart
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
exports.removeProductFromCart = removeProductFromCart;
