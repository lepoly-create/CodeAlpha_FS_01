"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const createProduct = async (data) => {
    const existingProduct = await Product_1.default.findOne({
        name: data.name
    });
    if (existingProduct) {
        throw new Error("Ce produit existe déjà");
    }
    const product = await Product_1.default.create(data);
    return product;
};
exports.createProduct = createProduct;
const getAllProducts = async () => {
    return await Product_1.default.find({
        isActive: true
    }).sort({
        createdAt: -1
    });
};
exports.getAllProducts = getAllProducts;
const getProductById = async (id) => {
    const product = await Product_1.default.findById(id);
    if (!product) {
        throw new Error("Produit introuvable");
    }
    return product;
};
exports.getProductById = getProductById;
const updateProduct = async (id, data) => {
    const product = await Product_1.default.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    });
    if (!product) {
        throw new Error("Produit introuvable");
    }
    return product;
};
exports.updateProduct = updateProduct;
const deleteProduct = async (id) => {
    const product = await Product_1.default.findByIdAndUpdate(id, {
        isActive: false
    }, {
        new: true
    });
    if (!product) {
        throw new Error("Produit introuvable");
    }
    return product;
};
exports.deleteProduct = deleteProduct;
