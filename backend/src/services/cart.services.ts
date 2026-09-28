import Cart from "../models/Cart";
import Product from "../models/Product";


// Récupérer le panier d'un utilisateur
// Retourne un panier vide si l'utilisateur n'en a pas encore,
// plutôt que de lancer une erreur qui serait silencieusement ignorée côté frontend.

export const getCart = async (
    userId: string
) => {

    const cart = await Cart.findOne({
        user: userId
    })
    .populate("items.product");

    if (!cart) {
        return { items: [], total: 0 };
    }

    // Filtrer les articles dont le produit a été supprimé ou n'existe plus
    const originalLength = cart.items.length;
    cart.items = cart.items.filter(item => item.product != null) as any;
    if (cart.items.length !== originalLength) {
        await cart.save();
    }

    return cart;
};

// Ajouter un produit au panier

export const addToCart = async (
    userId: string,
    productId: string,
    quantity: number
) => {

    // Vérifier que le produit existe

    const product = await Product.findById(productId);


    if (!product || !product.isActive) {
        throw new Error("Produit introuvable");
    }

    // Chercher le panier utilisateur, ou en créer un nouveau (upsert)

    let cart = await Cart.findOne({
        user: userId
    });


    if (!cart) {
        // Premier ajout au panier : créer le document Cart pour cet utilisateur
        cart = await Cart.create({
            user: userId,
            items: [{ product: product._id, quantity }],
        });
    } else {
        // Vérifier si le produit existe déjà dans le panier

        const existingItem = cart.items.find(
            item => item.product.toString() === productId
        );

        if (existingItem) {

            if (existingItem.quantity + quantity > product.stock) {
                throw new Error("Stock insuffisant");
            }

            existingItem.quantity += quantity;

        } else {

            if (quantity > product.stock) {
                throw new Error("Stock insuffisant");
            }

            cart.items.push({
                product: product._id,
                quantity
            });

        }

        await cart.save();
    }

    await cart.populate("items.product");

    return cart;
};


// Modifier la quantité

export const updateCartItem = async (
    userId: string,
    productId: string,
    quantity: number
) => {
    if (quantity < 1) {
        throw new Error("La quantité doit être supérieure ou égale à 1");
    }

    const cart = await Cart.findOne({
        user: userId
    });


    if (!cart) {
        throw new Error("Panier introuvable");
    }

    const item = cart.items.find(
        item => item.product.toString() === productId
    );

    if (!item) {
        throw new Error("Produit absent du panier");
    }

    item.quantity = quantity;

    await cart.save();
    await cart.populate("items.product");

    return cart;

};


// Supprimer un produit du panier

export const removeFromCart = async (
    userId: string,
    productId: string
) => {


    const cart = await Cart.findOne({
        user: userId
    });


    if (!cart) {
        throw new Error("Panier introuvable");
    }

    cart.items = cart.items.filter(
        item => item.product.toString() !== productId
    );

    await cart.save();
    await cart.populate("items.product");

    return cart;

};