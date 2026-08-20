import Cart from "../models/Cart";
import Order from "../models/Order";

// Créer une commande à partir du panier

export const createOrder = async (
    userId: string
) => {

    // Récupérer le panier

    const cart = await Cart.findOne({
        user: userId
    }).populate("items.product");


    if (!cart) {
        throw new Error("Panier introuvable");
    }

    if (cart.items.length === 0) {
        throw new Error("Votre panier est vide");
    }

    let totalAmount = 0;

    const orderItems = [];

    for (const item of cart.items) {

        const product: any = item.product;

        if (!product) {
            throw new Error("Produit introuvable");
        }

        if (product.stock < item.quantity) {

            throw new Error(
                `Stock insuffisant pour ${product.name}`
            );

        }
        totalAmount += product.price * item.quantity;

        orderItems.push({

            product: product._id,

            quantity: item.quantity,

            price: product.price

        });
        // Décrémenter le stock

        product.stock -= item.quantity;

        await product.save();
    }

    // Créer la commande

    const order = await Order.create({

        user: userId,

        items: orderItems,

        totalAmount

    });

    // Vider le panier

    cart.items = [];

    await cart.save();


    return order;

};

// Récupérer les commandes d'un utilisateur

export const getMyOrders = async (
    userId: string
) => {

    return await Order.find({

        user: userId
    })

    .populate("items.product")

    .sort({
        createdAt: -1
    });

};


// Voir une commande

export const getOrderById = async (
    orderId: string,
    userId: string
) => {

    const order = await Order.findOne({

        _id: orderId,
        user: userId

    }).populate("items.product");

    if (!order) {

        throw new Error(
            "Commande introuvable"
        );

    }
    return order;
};