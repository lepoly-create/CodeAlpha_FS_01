"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFavorite = exports.addFavorite = exports.getFavorites = void 0;
const User_1 = __importDefault(require("../models/User"));
const Product_1 = __importDefault(require("../models/Product"));
const getFavorites = async (userId) => {
    const user = await User_1.default.findById(userId)
        .populate("favoriteProducts");
    if (!user) {
        throw new Error("Utilisateur introuvable");
    }
    return user.favoriteProducts;
};
exports.getFavorites = getFavorites;
const addFavorite = async (userId, productId) => {
    const user = await User_1.default.findById(userId);
    if (!user) {
        throw new Error("Utilisateur introuvable");
    }
    const product = await Product_1.default.findById(productId);
    if (!product) {
        throw new Error("Produit introuvable");
    }
    const alreadyFavorite = user.favoriteProducts.some(favoriteId => favoriteId.toString() === productId);
    if (alreadyFavorite) {
        throw new Error("Produit déjà dans les favoris");
    }
    user.favoriteProducts.push(product._id);
    await user.save();
    return { productId };
};
exports.addFavorite = addFavorite;
const removeFavorite = async (userId, productId) => {
    const user = await User_1.default.findById(userId);
    if (!user) {
        throw new Error("Utilisateur introuvable");
    }
    user.favoriteProducts = user.favoriteProducts.filter(favoriteId => favoriteId.toString() !== productId);
    await user.save();
    return { productId };
};
exports.removeFavorite = removeFavorite;
