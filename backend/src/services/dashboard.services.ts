import User from "../models/User";
import Order from "../models/Order";
import Cart from "../models/Cart";
import Product from "../models/Product";

export const getUserDashboard = async (userId: string) => {
  // Exécution 100% parallèle des requêtes MongoDB via Promise.all
  // Utilisation de .lean() et sélection ciblée des champs pour des performances maximales
  const [user, recentOrders, allOrderStats, cart, recommendedProducts] =
    await Promise.all([
      User.findById(userId)
        .select("fullName email role profileImage favoriteProducts")
        .lean(),

      // Seules les 5 commandes les plus récentes ont besoin d'être peuplées avec leurs produits
      Order.find({ user: userId })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("items.product", "name price image")
        .lean(),

      // Statistiques globales ultra-rapides (uniquement status et totalAmount sans population lourde)
      Order.find({ user: userId })
        .select("status totalAmount")
        .lean(),

      Cart.findOne({ user: userId })
        .select("items.quantity")
        .lean(),

      Product.find({
        isActive: true,
        stock: { $gt: 0 },
      })
        .select("name price image")
        .sort({ createdAt: -1 })
        .limit(4)
        .lean(),
    ]);

  if (!user) {
    throw new Error("Utilisateur introuvable");
  }

  // Calcul instantané des métriques en mémoire en une seule passe O(N)
  let totalOrders = 0;
  let pendingOrders = 0;
  let confirmedOrders = 0;
  let cancelledOrders = 0;
  let totalSpent = 0;

  for (const order of allOrderStats) {
    totalOrders++;
    if (order.status === "confirmed") {
      confirmedOrders++;
      totalSpent += order.totalAmount || 0;
    } else if (order.status === "pending") {
      pendingOrders++;
    } else if (order.status === "cancelled") {
      cancelledOrders++;
    }
  }

  const favoriteCount = user.favoriteProducts?.length || 0;

  const cartItemsCount =
    cart?.items?.reduce(
      (total: number, item: { quantity: number }) =>
        total + (item.quantity || 0),
      0
    ) || 0;

  return {
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage || null,
    },
    statistics: {
      totalOrders,
      pendingOrders,
      confirmedOrders,
      cancelledOrders,
      totalSpent,
      favoriteCount,
      cartItemsCount,
    },
    recentOrders,
    recommendedProducts,
  };
};