"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderById = exports.getMyOrders = exports.createOrder = void 0;
const Cart_1 = __importDefault(require("../models/Cart"));
const Order_1 = __importDefault(require("../models/Order"));
// Créer une commande à partir du panier
const createOrder = async (userId) => {
    // Récupérer le panier
    const cart = await Cart_1.default.findOne({
        user: userId
    }).populate("items.product");
    if (!cart) {
        throw new Error("Panier introuvable");
    }
    if (cart.items.length === 0) {
        throw new Error("Votre panier est vide");
    }
    let totalAmount = 0;
    const orderItems = [];
    for (const item of cart.items) {
        const product = item.product;
        if (!product) {
            throw new Error("Produit introuvable");
        }
        if (product.stock < item.quantity) {
            throw new Error(`Stock insuffisant pour ${product.name}`);
        }
        totalAmount += product.price * item.quantity;
        orderItems.push({
            product: product._id,
            quantity: item.quantity,
            price: product.price
        });
        // Décrémenter le stock
        product.stock -= item.quantity;
        await product.save();
    }
    // Créer la commande
    const order = await Order_1.default.create({
        user: userId,
        items: orderItems,
        totalAmount
    });
    // Vider le panier
    cart.items = [];
    await cart.save();
    return order;
};
exports.createOrder = createOrder;
// Récupérer les commandes d'un utilisateur
const getMyOrders = async (userId) => {
    return await Order_1.default.find({
        user: userId
    })
        .populate("items.product")
        .sort({
        createdAt: -1
    });
};
exports.getMyOrders = getMyOrders;
// Voir une commande
const getOrderById = async (orderId, userId) => {
    const order = await Order_1.default.findOne({
        _id: orderId,
        user: userId
    }).populate("items.product");
    if (!order) {
        throw new Error("Commande introuvable");
    }
    return order;
};
exports.getOrderById = getOrderById;
