"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.updateOrderStatus = exports.getOrder = exports.getOrders = exports.getProducts = exports.getDashboard = void 0;
const admin_services_1 = require("../services/admin.services");
const getDashboard = async (req, res) => {
    try {
        const dashboard = await (0, admin_services_1.getAdminDashboard)();
        res.status(200).json({
            success: true,
            data: dashboard,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ||
                "Erreur lors du chargement du dashboard administrateur",
        });
    }
};
exports.getDashboard = getDashboard;
const getProducts = async (req, res) => {
    try {
        const products = await (0, admin_services_1.getAdminProducts)();
        res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Erreur lors du chargement des produits",
        });
    }
};
exports.getProducts = getProducts;
const getOrders = async (req, res) => {
    try {
        const orders = await (0, admin_services_1.getAdminOrders)();
        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ||
                "Erreur lors du chargement des commandes",
        });
    }
};
exports.getOrders = getOrders;
const getOrder = async (req, res) => {
    try {
        const order = await (0, admin_services_1.getAdminOrderById)(String(req.params.id));
        res.status(200).json({
            success: true,
            data: order,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getOrder = getOrder;
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await (0, admin_services_1.updateAdminOrderStatus)(String(req.params.id), status);
        res.status(200).json({
            success: true,
            message: "Statut de la commande mis à jour",
            data: order,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.updateOrderStatus = updateOrderStatus;
const getUsers = async (req, res) => {
    try {
        const users = await (0, admin_services_1.getAdminUsers)();
        res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ||
                "Erreur lors du chargement des utilisateurs",
        });
    }
};
exports.getUsers = getUsers;
