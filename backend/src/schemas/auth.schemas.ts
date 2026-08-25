import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    fullName: z
      .string({ message: "Le nom complet est requis" })
      .min(2, "Le nom complet doit contenir au moins 2 caractères")
      .max(50, "Le nom complet ne peut pas dépasser 50 caractères")
      .trim(),
    email: z
      .string({ message: "L'adresse email est requise" })
      .email("Adresse email invalide")
      .trim()
      .toLowerCase(),
    password: z
      .string({ message: "Le mot de passe est requis" })
      .min(6, "Le mot de passe doit contenir au moins 6 caractères")
      .max(100, "Le mot de passe est trop long"),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({ message: "L'adresse email est requise" })
      .email("Adresse email invalide")
      .trim()
      .toLowerCase(),
    password: z
      .string({ message: "Le mot de passe est requis" })
      .min(1, "Le mot de passe est requis"),
  }),
});
