import { z } from "zod";

// Schema d'email réutilisable conforme à Zod v4 (nettoyage + validation z.email)
const emailSchema = z
    .string({ error: "L'adresse email est requise" })
    .trim()
    .toLowerCase()
    .pipe(z.email({ error: "Adresse email invalide" }));

export const registerSchema = z.object({
    body: z.object({
        fullName: z
            .string({ error: "Le nom complet est requis" })
            .min(2, "Le nom complet doit contenir au moins 2 caractères")
            .max(50, "Le nom complet ne peut pas dépasser 50 caractères")
            .trim(),

        email: emailSchema,

        password: z
            .string({ error: "Le mot de passe est requis" })
            .min(6, "Le mot de passe doit contenir au moins 6 caractères")
            .max(100, "Le mot de passe est trop long"),
    }),
});

export const loginSchema = z.object({
    body: z.object({
        email: emailSchema,

        password: z
            .string({ error: "Le mot de passe est requis" })
            .min(1, "Le mot de passe est requis"),
    }),
});

export const verifyEmailSchema = z.object({
    body: z.object({
        token: z
            .string({ error: "Token de vérification requis" })
            .length(64, "Token de vérification invalide")
            .regex(/^[a-f0-9]+$/i, "Token de vérification invalide"),
    }),
});

export const resendVerificationSchema = z.object({
    body: z.object({
        email: emailSchema,
    }),
});

export const googleLoginSchema = z.object({
    body: z.object({
        credential: z
            .string({ error: "Identifiant Google requis" })
            .min(20, "Identifiant Google invalide"),
    }),
});

export const forgotPasswordSchema = z.object({
    body: z.object({
        email: emailSchema,
    }),
});

export const resetPasswordSchema = z.object({
    body: z.object({
        token: z
            .string({ error: "Token requis" })
            .length(64, "Token invalide")
            .regex(/^[a-f0-9]+$/i, "Token invalide"),

        newPassword: z
            .string({ error: "Le nouveau mot de passe est requis" })
            .min(6, "Le mot de passe doit contenir au moins 6 caractères")
            .max(100, "Le mot de passe est trop long"),
    }),
});

export const verifyEmailChangeSchema = z.object({
    body: z.object({
        token: z
            .string({ error: "Token requis" })
            .length(64, "Token invalide")
            .regex(/^[a-f0-9]+$/i, "Token invalide"),
    }),
});