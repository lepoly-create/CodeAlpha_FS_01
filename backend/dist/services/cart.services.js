"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromCart = exports.updateCartItem = exports.addToCart = exports.getCart = void 0;
const Cart_1 = __importDefault(require("../models/Cart"));
const Product_1 = __importDefault(require("../models/Product"));
// Récupérer le panier d'un utilisateur
// Retourne un panier vide si l'utilisateur n'en a pas encore,
// plutôt que de lancer une erreur qui serait silencieusement ignorée côté frontend.
const getCart = async (userId) => {
    const cart = await Cart_1.default.findOne({
        user: userId
    })
        .populate("items.product");
    if (!cart) {
        return { items: [], total: 0 };
    }
    // Filtrer les articles dont le produit a été supprimé ou n'existe plus
    const originalLength = cart.items.length;
    cart.items = cart.items.filter(item => item.product != null);
    if (cart.items.length !== originalLength) {
        await cart.save();
    }
    return cart;
};
exports.getCart = getCart;
// Ajouter un produit au panier
const addToCart = async (userId, productId, quantity) => {
    // Vérifier que le produit existe
    const product = await Product_1.default.findById(productId);
    if (!product || !product.isActive) {
        throw new Error("Produit introuvable");
    }
    // Chercher le panier utilisateur, ou en créer un nouveau (upsert)
    let cart = await Cart_1.default.findOne({
        user: userId
    });
    if (!cart) {
        // Premier ajout au panier : créer le document Cart pour cet utilisateur
        cart = await Cart_1.default.create({
            user: userId,
            items: [{ product: product._id, quantity }],
        });
    }
    else {
        // Vérifier si le produit existe déjà dans le panier
        const existingItem = cart.items.find(item => item.product.toString() === productId);
        if (existingItem) {
            if (existingItem.quantity + quantity > product.stock) {
                throw new Error("Stock insuffisant");
            }
            existingItem.quantity += quantity;
        }
        else {
            if (quantity > product.stock) {
                throw new Error("Stock insuffisant");
            }
            cart.items.push({
                product: product._id,
                quantity
            });
        }
        await cart.save();
    }
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
