import { Request, Response } from "express";
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from "../services/product.services";

export const create = async (
    req: Request,
    res: Response
) => {

    try {

        const product = await createProduct(req.body);

        res.status(201).json({
            success: true,
            message: "Produit créé avec succès",
            data: product
        });

    } catch (error: any) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

export const getAll = async (
    req: Request,
    res: Response
) => {

    try {

        const products = await getAllProducts();

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });

    } catch (error: any) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const getOne = async (
    req: Request,
    res: Response
) => {

    try {

        const product = await getProductById(String(req.params.id));

        res.status(200).json({
            success: true,
            data: product
        });

    } catch (error: any) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }

};

export const update = async (
    req: Request,
    res: Response
) => {

    try {

        const product = await updateProduct(
            String(req.params.id),
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Produit modifié avec succès",
            data: product
        });

    } catch (error: any) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

export const remove = async (
    req: Request,
    res: Response
) => {

    try {

        await deleteProduct(String(req.params.id));

        res.status(200).json({
            success: true,
            message: "Produit supprimé avec succès"
        });

    } catch (error: any) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }

};