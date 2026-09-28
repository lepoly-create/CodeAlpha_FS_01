"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDashboard = void 0;
const User_1 = __importDefault(require("../models/User"));
const Order_1 = __importDefault(require("../models/Order"));
const Cart_1 = __importDefault(require("../models/Cart"));
const Product_1 = __importDefault(require("../models/Product"));
const getUserDashboard = async (userId) => {
    const user = await User_1.default.findById(userId)
        .select("-password");
    if (!user) {
        throw new Error("Utilisateur introuvable");
    }
    const orders = await Order_1.default.find({
        user: userId
    })
        .populate("items.product")
        .sort({
        createdAt: -1
    });
    const cart = await Cart_1.default.findOne({
        user: userId
    });
    const recommendedProducts = await Product_1.default.find({
        isActive: true,
        stock: { $gt: 0 },
    })
        .sort({ createdAt: -1 })
        .limit(4);
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(order => order.status === "pending").length;
    const confirmedOrders = orders.filter(order => order.status === "confirmed").length;
    const cancelledOrders = orders.filter(order => order.status === "cancelled").length;
    const totalSpent = orders
        .filter(order => order.status === "confirmed")
        .reduce((total, order) => total + order.totalAmount, 0);
    const favoriteCount = user.favoriteProducts?.length || 0;
    const cartItemsCount = cart?.items.reduce((total, item) => total + item.quantity, 0) || 0;
    const recentOrders = orders.slice(0, 5);
    return {
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage || null
        },
        statistics: {
            totalOrders,
            pendingOrders,
            confirmedOrders,
            cancelledOrders,
            totalSpent,
            favoriteCount,
            cartItemsCount
        },
        recentOrders,
        recommendedProducts
    };
};
exports.getUserDashboard = getUserDashboard;
