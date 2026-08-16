import User from "../models/User";
import Product from "../models/Product";

export const getFavorites = async (userId: string) => {
    const user = await User.findById(userId)
        .populate("favoriteProducts");

    if (!user) {
        throw new Error("Utilisateur introuvable");
    }

    return user.favoriteProducts;
};

export const addFavorite = async (
    userId: string,
    productId: string
) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("Utilisateur introuvable");
    }

    const product = await Product.findById(productId);

    if (!product) {
        throw new Error("Produit introuvable");
    }

    const alreadyFavorite = user.favoriteProducts.some(
        favoriteId => favoriteId.toString() === productId
    );

    if (alreadyFavorite) {
        throw new Error("Produit déjà dans les favoris");
    }

    user.favoriteProducts.push(product._id);

    await user.save();

    return await User.findById(userId)
        .populate("favoriteProducts");
};

export const removeFavorite = async (
    userId: string,
    productId: string
) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("Utilisateur introuvable");
    }

    user.favoriteProducts = user.favoriteProducts.filter(
        favoriteId => favoriteId.toString() !== productId
    );

    await user.save();

    return await User.findById(userId)
        .populate("favoriteProducts");
};