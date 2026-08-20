import { Request, Response } from "express";

import {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart
} from "../services/cart.services";

// Voir le panier

export const getMyCart = async (
    req: Request,
    res: Response
) => {

    try {

        const cart = await getCart(
            req.user.id
        );


        res.status(200).json({

            success: true,

            data: cart

        });
    } catch (error: any) {


        res.status(404).json({

            success: false,

            message: error.message

        });
    }

};


// Ajouter un produit

export const addProductToCart = async (
    req: Request,
    res: Response
) => {

    try {
        const {
            productId,
            quantity
        } = req.body;

        const cart = await addToCart(

            req.user.id,

            productId,

            quantity

        );

        res.status(200).json({

            success: true,

            message: "Produit ajouté au panier",

            data: cart

        });

    } catch(error:any) {


        res.status(400).json({

            success:false,

            message:error.message

        });
    }

};


// Modifier quantité

export const updateQuantity = async (
    req: Request,
    res: Response
) => {

    try {
        const cart = await updateCartItem(

            req.user.id,

            req.params.productId as string,

            req.body.quantity
        );

        res.status(200).json({

            success:true,

            message:"Quantité modifiée",

            data:cart

        });

    } catch(error:any) {

        res.status(400).json({

            success:false,

            message:error.message

        });
    }

};


// Supprimer un produit

export const removeProductFromCart = async (
    req: Request,
    res: Response
) => {
    try {

        const cart = await removeFromCart(

            req.user.id,

            req.params.productId as string

        );

        res.status(200).json({

            success:true,

            message:"Produit retiré du panier",

            data:cart

        });

    } catch(error:any) {


        res.status(400).json({

            success:false,

            message:error.message

        });
    }

};