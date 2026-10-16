import mongoose from "mongoose";
import User from "../models/User";
import Product from "../models/Product";
import Order from "../models/Order";
import Cart from "../models/Cart";
import EmailVerificationToken from "../models/EmailVerificationToken";
import PasswordResetToken from "../models/PasswordResetToken";
import EmailChangeToken from "../models/EmailChangeToken";
import cloudinary from "../config/cloudinary";

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

  const statsByUser = new Map<string, { totalOrders: number; totalSpent: number }>();

  if (users.length > 0) {
    const orderStats = await Order.aggregate([
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

export const deleteAdminUser = async (
  adminUserId: string,
  targetUserId: string
) => {
  if (adminUserId === targetUserId) {
    throw new Error(
      "Vous ne pouvez pas supprimer votre propre compte administrateur."
    );
  }

  const user = await User.findById(targetUserId);
  if (!user) {
    throw new Error("Utilisateur introuvable");
  }

  if (user.role === "admin") {
    throw new Error("Impossible de supprimer un compte administrateur.");
  }

  if (user.profileImagePublicId) {
    try {
      await cloudinary.uploader.destroy(user.profileImagePublicId, {
        resource_type: "image",
      });
    } catch (cloudinaryError) {
      console.error(
        "Erreur suppression image Cloudinary :",
        cloudinaryError
      );
    }
  }

  await Promise.all([
    Cart.deleteMany({ user: user._id }),
    EmailChangeToken.deleteMany({ user: user._id }),
    EmailVerificationToken.deleteMany({ user: user._id }),
    PasswordResetToken.deleteMany({ user: user._id }),
  ]);

  await User.findByIdAndDelete(user._id);

  return { success: true };
};

export const deleteAdminOrder = async (orderId: string) => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const order = await Order.findById(orderId).session(session);
      if (!order) {
        throw new Error("Commande introuvable");
      }

      // Si la commande était en attente, restitution automatique des stocks
      if (order.status === "pending") {
        for (const item of order.items) {
          await Product.updateOne(
            { _id: item.product },
            { $inc: { stock: item.quantity } },
            { session }
          );
        }
      }

      await Order.findByIdAndDelete(orderId).session(session);
    });

    return { success: true };
  } finally {
    await session.endSession();
  }
};