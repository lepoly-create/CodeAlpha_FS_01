"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z
            .string({ message: "Le nom complet est requis" })
            .min(2, "Le nom complet doit contenir au moins 2 caractères")
            .max(50, "Le nom complet ne peut pas dépasser 50 caractères")
            .trim(),
        email: zod_1.z
            .string({ message: "L'adresse email est requise" })
            .email("Adresse email invalide")
            .trim()
            .toLowerCase(),
        password: zod_1.z
            .string({ message: "Le mot de passe est requis" })
            .min(6, "Le mot de passe doit contenir au moins 6 caractères")
            .max(100, "Le mot de passe est trop long"),
    }),
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ message: "L'adresse email est requise" })
            .email("Adresse email invalide")
            .trim()
            .toLowerCase(),
        password: zod_1.z
            .string({ message: "Le mot de passe est requis" })
            .min(1, "Le mot de passe est requis"),
    }),
});
