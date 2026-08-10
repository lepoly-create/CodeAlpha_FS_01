import { Request, Response } from "express";

import {
    createOrder,
    getMyOrders,
    getOrderById
} from "../services/order.services";



// Créer une commande

export const checkout = async (
    req: Request,
    res: Response
) => {

    try {

        const order = await createOrder(
            req.user.id
        );

        res.status(201).json({

            success: true,

            message: "Commande créée avec succès",

            data: order

        });

    } catch (error: any) {

        res.status(400).json({

            success: false,

            message: error.message

        });

    }

};




// Voir toutes mes commandes

export const getOrders = async (
    req: Request,
    res: Response
) => {

    try {

        const orders = await getMyOrders(
            req.user.id
        );

        res.status(200).json({

            success: true,

            data: orders

        });

    } catch (error: any) {

        res.status(400).json({

            success: false,

            message: error.message

        });

    }

};




// Voir une commande

export const getOrder = async (
    req: Request,
    res: Response
) => {

    try {

        const order = await getOrderById(

            Array.isArray(req.params.id) ? req.params.id[0] : req.params.id,

            req.user.id

        );

        res.status(200).json({

            success: true,

            data: order

        });

    } catch (error: any) {

        res.status(404).json({

            success: false,

            message: error.message

        });

    }

};