"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromCart = exports.updateCartItem = exports.addToCart = exports.getCart = void 0;
const Cart_1 = __importDefault(require("../models/Cart"));
const Product_1 = __importDefault(require("../models/Product"));
// Récupérer le panier d'un utilisateur
const getCart = async (userId) => {
    const cart = await Cart_1.default.findOne({
        user: userId
    })
        .populate("items.product");
    if (!cart) {
        throw new Error("Panier introuvable");
    }
    return cart;
};
exports.getCart = getCart;
// Ajouter un produit au panier
const addToCart = async (userId, productId, quantity) => {
    // Vérifier que le produit existe
    const product = await Product_1.default.findById(productId);
    if (!product) {
        throw new Error("Produit introuvable");
    }
    // Chercher le panier utilisateur
    const cart = await Cart_1.default.findOne({
        user: userId
    });
    if (!cart) {
        throw new Error("Panier introuvable");
    }
    // Vérifier si le produit existe déjà dans le panier
    const existingItem = cart.items.find(item => item.product.toString() === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    }
    else {
        cart.items.push({
            product: product._id,
            quantity
        });
    }
    await cart.save();
    await cart.populate("items.product");
    return cart;
};
exports.addToCart = addToCart;
// Modifier la quantité
const updateCartItem = async (userId, productId, quantity) => {
    if (quantity < 1) {
        throw new Error("La quantité doit être supérieure ou égale à 1");
    }
    const cart = await Cart_1.default.findOne({
        user: userId
    });
    if (!cart) {
        throw new Error("Panier introuvable");
    }
    const item = cart.items.find(item => item.product.toString() === productId);
    if (!item) {
        throw new Error("Produit absent du panier");
    }
    item.quantity = quantity;
    await cart.save();
    await cart.populate("items.product");
    return cart;
};
exports.updateCartItem = updateCartItem;
// Supprimer un produit du panier
const removeFromCart = async (userId, productId) => {
    const cart = await Cart_1.default.findOne({
        user: userId
    });
    if (!cart) {
        throw new Error("Panier introuvable");
    }
    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();
    await cart.populate("items.product");
    return cart;
};
exports.removeFromCart = removeFromCart;
