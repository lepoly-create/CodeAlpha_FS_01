"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCartItemSchema = exports.addCartItemSchema = void 0;
const zod_1 = require("zod");
const objectId = zod_1.z
    .string()
    .regex(/^[a-f\d]{24}$/i, "Identifiant produit invalide");
const quantity = zod_1.z
    .number({ message: "La quantité doit être un nombre" })
    .int("La quantité doit être un entier")
    .min(1, "La quantité doit être supérieure ou égale à 1")
    .max(1000, "La quantité maximale est de 1000");
exports.addCartItemSchema = zod_1.z.object({
    body: zod_1.z.object({
        productId: objectId,
        quantity,
    }),
});
exports.updateCartItemSchema = zod_1.z.object({
    params: zod_1.z.object({
        productId: objectId,
    }),
    body: zod_1.z.object({
        quantity,
    }),
});
