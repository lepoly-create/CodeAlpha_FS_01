"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordSchema = exports.updateProfileSchema = void 0;
const zod_1 = require("zod");
exports.updateProfileSchema = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z
            .string()
            .min(2, "Le nom complet doit contenir au moins 2 caractères")
            .max(50, "Le nom complet ne peut pas dépasser 50 caractères")
            .trim()
            .optional(),
        email: zod_1.z
            .string()
            .email("Adresse email invalide")
            .trim()
            .toLowerCase()
            .optional(),
    }),
});
exports.changePasswordSchema = zod_1.z.object({
    body: zod_1.z.object({
        currentPassword: zod_1.z
            .string({ message: "Le mot de passe actuel est requis" })
            .min(1, "Le mot de passe actuel est requis"),
        newPassword: zod_1.z
            .string({ message: "Le nouveau mot de passe est requis" })
            .min(6, "Le nouveau mot de passe doit contenir au moins 6 caractères")
            .max(100, "Le nouveau mot de passe est trop long"),
    }),
});
