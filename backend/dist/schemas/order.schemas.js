"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatusSchema = exports.orderIdSchema = void 0;
const zod_1 = require("zod");
const orderIdParams = zod_1.z.object({
    id: zod_1.z.string().regex(/^[a-f\d]{24}$/i, "Identifiant commande invalide"),
});
exports.orderIdSchema = zod_1.z.object({
    params: orderIdParams,
});
exports.updateOrderStatusSchema = zod_1.z.object({
    params: orderIdParams,
    body: zod_1.z.object({
        status: zod_1.z.enum(["pending", "confirmed", "cancelled"], {
            message: "Statut de commande invalide",
        }),
    }),
});
