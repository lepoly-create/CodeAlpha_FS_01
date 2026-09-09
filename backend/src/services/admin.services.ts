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