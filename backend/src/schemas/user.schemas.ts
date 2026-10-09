import { z } from "zod";
const emailSchema = z
    .string({ error: "L'adresse email est requise" })
    .trim()
    .toLowerCase()
    .pipe(z.email({ error: "Adresse email invalide" }));


export const updateProfileSchema = z.object({
    body: z.object({
        fullName: z
            .string({
                message:
                    "Le nom complet est requis"
            })
            .min(
                2,
                "Le nom complet doit contenir au moins 2 caractères"
            )
            .max(
                50,
                "Le nom complet ne peut pas dépasser 50 caractères"
            )
            .trim(),
    }),
});

export const changePasswordSchema =
    z.object({
        body: z.object({
            currentPassword: z
                .string()
                .min(
                    1,
                    "Le mot de passe actuel est requis"
                ),

            newPassword: z
                .string()
                .min(
                    6,
                    "Le nouveau mot de passe doit contenir au moins 6 caractères"
                )
                .max(
                    100,
                    "Le nouveau mot de passe est trop long"
                ),
        }),
    });

export const requestEmailChangeSchema =
    z.object({
        body: z.object({
            newEmail: emailSchema ,

            currentPassword: z
                .string()
                .min(
                    1,
                    "Le mot de passe actuel est requis"
                ),
        }),
    });