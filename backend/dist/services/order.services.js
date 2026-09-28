"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderById = exports.getMyOrders = exports.createOrder = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Cart_1 = __importDefault(require("../models/Cart"));
const Order_1 = __importDefault(require("../models/Order"));
const Product_1 = __importDefault(require("../models/Product"));
// Créer une commande à partir du panier
const createOrder = async (userId) => {
    const session = await mongoose_1.default.startSession();
    try {
        let createdOrder;
        await session.withTransaction(async () => {
            const cart = await Cart_1.default.findOne({ user: userId })
                .session(session)
                .populate("items.product");
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
                if (!product || !product.isActive) {
                    throw new Error("Produit introuvable");
                }
                if (product.stock < item.quantity) {
                    throw new Error(`Stock insuffisant pour ${product.name}`);
                }
                const stockUpdate = await Product_1.default.updateOne({
                    _id: product._id,
                    isActive: true,
                    stock: { $gte: item.quantity },
                }, { $inc: { stock: -item.quantity } }, { session });
                if (stockUpdate.modifiedCount !== 1) {
                    throw new Error(`Stock insuffisant pour ${product.name}`);
                }
                totalAmount += product.price * item.quantity;
                orderItems.push({
                    product: product._id,
                    quantity: item.quantity,
                    price: product.price,
                });
            }
            [createdOrder] = await Order_1.default.create([{
                    user: userId,
                    items: orderItems,
                    totalAmount,
                }], { session });
            cart.items = [];
            await cart.save({ session });
        });
        return createdOrder;
    }
    finally {
        await session.endSession();
    }
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
