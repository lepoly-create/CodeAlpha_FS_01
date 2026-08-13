"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getOne = exports.getAll = exports.create = void 0;
const product_services_1 = require("../services/product.services");
const create = async (req, res) => {
    try {
        const product = await (0, product_services_1.createProduct)(req.body);
        res.status(201).json({
            success: true,
            message: "Produit créé avec succès",
            data: product
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
exports.create = create;
const getAll = async (req, res) => {
    try {
        const products = await (0, product_services_1.getAllProducts)();
        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.getAll = getAll;
const getOne = async (req, res) => {
    try {
        const product = await (0, product_services_1.getProductById)(String(req.params.id));
        res.status(200).json({
            success: true,
            data: product
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};
exports.getOne = getOne;
const update = async (req, res) => {
    try {
        const product = await (0, product_services_1.updateProduct)(String(req.params.id), req.body);
        res.status(200).json({
            success: true,
            message: "Produit modifié avec succès",
            data: product
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
exports.update = update;
const remove = async (req, res) => {
    try {
        await (0, product_services_1.deleteProduct)(String(req.params.id));
        res.status(200).json({
            success: true,
            message: "Produit supprimé avec succès"
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};
exports.remove = remove;
