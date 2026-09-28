"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productIdSchema = exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
const productIdParams = zod_1.z.object({
    id: zod_1.z.string().regex(/^[a-f\d]{24}$/i, "Identifiant produit invalide"),
});
exports.createProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({ message: "Le nom du produit est requis" })
            .min(2, "Le nom doit contenir au moins 2 caractères")
            .max(100, "Le nom ne peut pas dépasser 100 caractères")
            .trim(),
        description: zod_1.z
            .string({ message: "La description du produit est requise" })
            .min(5, "La description doit contenir au moins 5 caractères")
            .trim(),
        price: zod_1.z
            .number({ message: "Le prix est requis" })
            .min(0, "Le prix ne peut pas être négatif"),
        image: zod_1.z
            .string({ message: "L'image du produit est requise" })
            .url("L'image doit être une URL valide")
            .or(zod_1.z.string().min(1, "L'image ne peut pas être vide")),
        category: zod_1.z
            .string({ message: "La catégorie est requise" })
            .min(2, "La catégorie doit contenir au moins 2 caractères")
            .trim(),
        stock: zod_1.z
            .number({ message: "La quantité en stock est requise" })
            .int("Le stock doit être un nombre entier")
            .min(0, "Le stock ne peut pas être négatif"),
    }),
});
exports.updateProductSchema = zod_1.z.object({
    params: productIdParams,
    body: exports.createProductSchema.shape.body.partial(),
});
exports.productIdSchema = zod_1.z.object({
    params: productIdParams,
});
