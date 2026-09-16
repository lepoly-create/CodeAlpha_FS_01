import mongoose from "mongoose";
import User from "../models/User";
import Product from "../models/Product";
import Order from "../models/Order";

export const getAdminDashboard = async () => {
  const [
    totalUsers,
    totalProducts,
    activeProducts,
    outOfStockProducts,
    totalOrders,
    pendingOrders,
    confirmedOrders,
    cancelledOrders,
    revenueResult,
    recentOrders,
    recentProducts,
    lowStockProducts,
  ] = await Promise.all([
    User.countDocuments({ role: "customer" }),

    Product.countDocuments(),

    Product.countDocuments({
      isActive: true,
    }),

    Product.countDocuments({
      stock: 0,
    }),

    Order.countDocuments(),

    Order.countDocuments({
      status: "pending",
    }),

    Order.countDocuments({
      status: "confirmed",
    }),

    Order.countDocuments({
      status: "cancelled",
    }),

    Order.aggregate([
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

    Order.find()
      .populate("user", "fullName email")
      .populate("items.product", "name price image")
      .sort({ createdAt: -1 })
      .limit(5),

    Product.find()
      .sort({ createdAt: -1 })
      .limit(5),

    Product.find({
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

export const getAdminProducts = async () => {
  return await Product.find().sort({
    createdAt: -1,
  });
};

export const getAdminOrders = async () => {
  return await Order.find()
    .populate("user", "fullName email")
    .populate("items.product", "name price image")
    .sort({
      createdAt: -1,
    });
};

export const getAdminOrderById = async (
  orderId: string
) => {
  const order = await Order.findById(orderId)
    .populate("user", "fullName email")
    .populate("items.product", "name price image");

  if (!order) {
    throw new Error("Commande introuvable");
  }

  return order;
};

export const updateAdminOrderStatus = async (
  orderId: string,
  status: "pending" | "confirmed" | "cancelled"
) => {
  const session = await mongoose.startSession();

  try {
    let updatedOrderId: mongoose.Types.ObjectId | undefined;

    await session.withTransaction(async () => {
      const order = await Order.findById(orderId).session(session);

      if (!order) {
        throw new Error("Commande introuvable");
      }

      if (order.status === status) {
        updatedOrderId = order._id;
        return;
      }

      if (
        order.status === "confirmed" ||
        order.status === "cancelled"
      ) {
        throw new Error(
          "Cette commande ne peut plus être modifiée"
        );
      }

      if (status === "cancelled") {
        for (const item of order.items) {
          const result = await Product.updateOne(
            { _id: item.product },
            { $inc: { stock: item.quantity } },
            { session },
          );

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

    return await Order.findById(updatedOrderId)
    .populate("user", "fullName email")
    .populate("items.product", "name price image");
  } finally {
    await session.endSession();
  }
};

export const getAdminUsers = async () => {
  const users = await User.find({
      role: "customer",
    })
    .select("-password")
    .sort({ createdAt: -1 })
    .lean();

  const usersWithStats = await Promise.all(
    users.map(async (user) => {
      const [totalOrders, revenueResult] = await Promise.all([
        Order.countDocuments({
          user: user._id,
        }),

        Order.aggregate([
          {
            $match: {
              user: user._id,
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
      ]);

      return {
        ...user,
        totalOrders,
        totalSpent: revenueResult[0]?.total || 0,
      };
    })
  );

  return usersWithStats;
};