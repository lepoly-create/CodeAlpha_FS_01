import Cart from "../models/Cart";
import Product from "../models/Product";


// Récupérer le panier d'un utilisateur

export const getCart = async (
    userId: string
) => {

    const cart = await Cart.findOne({
        user: userId
    })
    .populate("items.product");


    if (!cart) {
        throw new Error("Panier introuvable");
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


    if (!product) {
        throw new Error("Produit introuvable");
    }


    // Chercher le panier utilisateur

    const cart = await Cart.findOne({
        user: userId
    });


    if (!cart) {
        throw new Error("Panier introuvable");
    }



    // Vérifier si le produit existe déjà dans le panier

    const existingItem = cart.items.find(
        item => item.product.toString() === productId
    );



    if (existingItem) {

        existingItem.quantity += quantity;

    } else {

        cart.items.push({
            product: product._id,
            quantity
        });

    }


    await cart.save();
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