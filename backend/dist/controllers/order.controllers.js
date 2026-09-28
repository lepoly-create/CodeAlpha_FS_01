"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrder = exports.getOrders = exports.checkout = void 0;
const order_services_1 = require("../services/order.services");
// Créer une commande
const checkout = async (req, res) => {
    try {
        const order = await (0, order_services_1.createOrder)(req.user.id);
        res.status(201).json({
            success: true,
            message: "Commande créée avec succès",
            data: order
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
exports.checkout = checkout;
// Voir toutes mes commandes
const getOrders = async (req, res) => {
    try {
        const orders = await (0, order_services_1.getMyOrders)(req.user.id);
        res.status(200).json({
            success: true,
            data: orders
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
exports.getOrders = getOrders;
// Voir une commande
const getOrder = async (req, res) => {
    try {
        const order = await (0, order_services_1.getOrderById)(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, req.user.id);
        res.status(200).json({
            success: true,
            data: order
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};
exports.getOrder = getOrder;
