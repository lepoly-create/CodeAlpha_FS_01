import User from "../models/User";
import Order from "../models/Order";
import Cart from "../models/Cart";
import Product from "../models/Product";

export const getUserDashboard = async (
    userId: string
) => {

    const user = await User.findById(userId)
        .select("-password");

    if (!user) {
        throw new Error("Utilisateur introuvable");
    }

    const orders = await Order.find({
        user: userId
    })
        .populate("items.product")
        .sort({
            createdAt: -1
        });

    const cart = await Cart.findOne({
        user: userId
    });

    const recommendedProducts = await Product.find({
        isActive: true,
        stock: { $gt: 0 },
    })
        .sort({ createdAt: -1 })
        .limit(4);

    const totalOrders = orders.length;

    const pendingOrders = orders.filter(
        order => order.status === "pending"
    ).length;

    const confirmedOrders = orders.filter(
        order => order.status === "confirmed"
    ).length;

    const cancelledOrders = orders.filter(
        order => order.status === "cancelled"
    ).length;

    const totalSpent = orders
        .filter(order => order.status === "confirmed")
        .reduce(
            (total, order) =>
                total + order.totalAmount,
            0
        );

    const favoriteCount =
        user.favoriteProducts?.length || 0;

    const cartItemsCount =
        cart?.items.reduce(
            (total, item) =>
                total + item.quantity,
            0
        ) || 0;

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