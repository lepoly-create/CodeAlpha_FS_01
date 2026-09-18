import mongoose from "mongoose";
import Cart from "../models/Cart";
import Order from "../models/Order";
import Product from "../models/Product";

// Créer une commande à partir du panier

export const createOrder = async (
    userId: string
) => {
    const session = await mongoose.startSession();

    try {
        let createdOrder;

        await session.withTransaction(async () => {
            const cart = await Cart.findOne({ user: userId })
                .session(session)
                .populate("items.product");

            if (!cart) {
                throw new Error("Panier introuvable");
            }

            if (cart.items.length === 0) {
                throw new Error("Votre panier est vide");
            }

            let totalAmount = 0;
            const orderItems = [];

            for (const item of cart.items) {
                const product = item.product as unknown as {
                    _id: mongoose.Types.ObjectId;
                    name: string;
                    price: number;
                    stock: number;
                    isActive: boolean;
                };

                if (!product || !product.isActive) {
                    throw new Error("Produit introuvable");
                }

                if (product.stock < item.quantity) {
                    throw new Error(`Stock insuffisant pour ${product.name}`);
                }

                const stockUpdate = await Product.updateOne(
                    {
                        _id: product._id,
                        isActive: true,
                        stock: { $gte: item.quantity },
                    },
                    { $inc: { stock: -item.quantity } },
                    { session },
                );

                if (stockUpdate.modifiedCount !== 1) {
                    throw new Error(`Stock insuffisant pour ${product.name}`);
                }

                totalAmount += product.price * item.quantity;
                orderItems.push({
                    product: product._id,
                    quantity: item.quantity,
                    price: product.price,
                });
            }

            [createdOrder] = await Order.create(
                [{
                    user: userId,
                    items: orderItems,
                    totalAmount,
                }],
                { session },
            );

            cart.items = [];
            await cart.save({ session });
        });

        return createdOrder;
    } finally {
        await session.endSession();
    }

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