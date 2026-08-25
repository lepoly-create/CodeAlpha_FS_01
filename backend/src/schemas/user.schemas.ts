import { z } from "zod";

export const updateProfileSchema = z.object({
  body: z.object({
    fullName: z
      .string()
      .min(2, "Le nom complet doit contenir au moins 2 caractères")
      .max(50, "Le nom complet ne peut pas dépasser 50 caractères")
      .trim()
      .optional(),
    email: z
      .string()
      .email("Adresse email invalide")
      .trim()
      .toLowerCase()
      .optional(),
  }),
});

export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z
      .string({ message: "Le mot de passe actuel est requis" })
      .min(1, "Le mot de passe actuel est requis"),
    newPassword: z
      .string({ message: "Le nouveau mot de passe est requis" })
      .min(6, "Le nouveau mot de passe doit contenir au moins 6 caractères")
      .max(100, "Le nouveau mot de passe est trop long"),
  }),
});
