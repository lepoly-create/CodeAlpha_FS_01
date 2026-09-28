"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminUsers = exports.updateAdminOrderStatus = exports.getAdminOrderById = exports.getAdminOrders = exports.getAdminProducts = exports.getAdminDashboard = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const Product_1 = __importDefault(require("../models/Product"));
const Order_1 = __importDefault(require("../models/Order"));
const getAdminDashboard = async () => {
    const [totalUsers, totalProducts, activeProducts, outOfStockProducts, totalOrders, pendingOrders, confirmedOrders, cancelledOrders, revenueResult, recentOrders, recentProducts, lowStockProducts,] = await Promise.all([
        User_1.default.countDocuments({ role: "customer" }),
        Product_1.default.countDocuments(),
        Product_1.default.countDocuments({
            isActive: true,
        }),
        Product_1.default.countDocuments({
            stock: 0,
        }),
        Order_1.default.countDocuments(),
        Order_1.default.countDocuments({
            status: "pending",
        }),
        Order_1.default.countDocuments({
            status: "confirmed",
        }),
        Order_1.default.countDocuments({
            status: "cancelled",
        }),
        Order_1.default.aggregate([
            {
                $match: {
                    status: "confirmed",
                },
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$totalAmount",
                    },
                },
            },
        ]),
        Order_1.default.find()
            .populate("user", "fullName email")
            .populate("items.product", "name price image")
            .sort({ createdAt: -1 })
            .limit(5),
        Product_1.default.find()
            .sort({ createdAt: -1 })
            .limit(5),
        Product_1.default.find({
            isActive: true,
            stock: {
                $gt: 0,
                $lte: 5,
            },
        })
            .sort({ stock: 1 })
            .limit(5),
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;
    return {
        statistics: {
            totalUsers,
            totalProducts,
            activeProducts,
            outOfStockProducts,
            totalOrders,
            pendingOrders,
            confirmedOrders,
            cancelledOrders,
            totalRevenue,
        },
        recentOrders,
        recentProducts,
        lowStockProducts,
    };
};
exports.getAdminDashboard = getAdminDashboard;
const getAdminProducts = async () => {
    return await Product_1.default.find().sort({
        createdAt: -1,
    });
};
exports.getAdminProducts = getAdminProducts;
const getAdminOrders = async () => {
    return await Order_1.default.find()
        .populate("user", "fullName email")
        .populate("items.product", "name price image")
        .sort({
        createdAt: -1,
    });
};
exports.getAdminOrders = getAdminOrders;
const getAdminOrderById = async (orderId) => {
    const order = await Order_1.default.findById(orderId)
        .populate("user", "fullName email")
        .populate("items.product", "name price image");
    if (!order) {
        throw new Error("Commande introuvable");
    }
    return order;
};
exports.getAdminOrderById = getAdminOrderById;
const updateAdminOrderStatus = async (orderId, status) => {
    const session = await mongoose_1.default.startSession();
    try {
        let updatedOrderId;
        await session.withTransaction(async () => {
            const order = await Order_1.default.findById(orderId).session(session);
            if (!order) {
                throw new Error("Commande introuvable");
            }
            if (order.status === status) {
                updatedOrderId = order._id;
                return;
            }
            if (order.status === "confirmed" ||
                order.status === "cancelled") {
                throw new Error("Cette commande ne peut plus être modifiée");
            }
            if (status === "cancelled") {
                for (const item of order.items) {
                    const result = await Product_1.default.updateOne({ _id: item.product }, { $inc: { stock: item.quantity } }, { session });
                    if (result.modifiedCount !== 1) {
                        throw new Error("Produit de commande introuvable");
                    }
                }
            }
            order.status = status;
            await order.save({ session });
            updatedOrderId = order._id;
        });
        if (!updatedOrderId) {
            throw new Error("Commande introuvable");
        }
        return await Order_1.default.findById(updatedOrderId)
            .populate("user", "fullName email")
            .populate("items.product", "name price image");
    }
    finally {
        await session.endSession();
    }
};
exports.updateAdminOrderStatus = updateAdminOrderStatus;
const getAdminUsers = async () => {
    const users = await User_1.default.find({
        role: "customer",
    })
        .select("-password")
        .sort({ createdAt: -1 })
        .lean();
    const statsByUser = new Map();
    if (users.length > 0) {
        const orderStats = await Order_1.default.aggregate([
            {
                $match: {
                    user: {
                        $in: users.map((user) => user._id),
                    },
                },
            },
            {
                $group: {
                    _id: "$user",
                    totalOrders: {
                        $sum: 1,
                    },
                    totalSpent: {
                        $sum: {
                            $cond: [
                                { $eq: ["$status", "confirmed"] },
                                "$totalAmount",
                                0,
                            ],
                        },
                    },
                },
            },
        ]);
        for (const stats of orderStats) {
            statsByUser.set(stats._id.toString(), {
                totalOrders: stats.totalOrders,
                totalSpent: stats.totalSpent,
            });
        }
    }
    const usersWithStats = users.map((user) => {
        const stats = statsByUser.get(user._id.toString());
        return {
            ...user,
            totalOrders: stats?.totalOrders || 0,
            totalSpent: stats?.totalSpent || 0,
        };
    });
    return usersWithStats;
};
exports.getAdminUsers = getAdminUsers;
