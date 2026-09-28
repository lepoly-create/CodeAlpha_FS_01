"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStoreSettingsSchema = void 0;
const zod_1 = require("zod");
exports.updateStoreSettingsSchema = zod_1.z.object({
    body: zod_1.z.object({
        storeName: zod_1.z
            .string()
            .min(2, "Le nom de la boutique doit contenir au moins 2 caractères")
            .max(100, "Le nom de la boutique ne peut pas dépasser 100 caractères")
            .trim()
            .optional(),
        contactEmail: zod_1.z
            .string()
            .email("Adresse email invalide")
            .trim()
            .toLowerCase()
            .optional(),
        phone: zod_1.z
            .string()
            .max(30, "Le numéro de téléphone est trop long")
            .refine((value) => value === "" || value.length >= 8, "Le numéro de téléphone est invalide")
            .trim()
            .optional(),
        currency: zod_1.z
            .string()
            .min(2)
            .max(10)
            .trim()
            .optional(),
    }),
});
