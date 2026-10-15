import { z } from "zod";

export const contactSchema = z.object({
  body: z.object({
    firstName: z
      .string({ message: "Le prénom est requis" })
      .min(2, "Le prénom doit contenir au moins 2 caractères")
      .max(50, "Le prénom ne peut pas dépasser 50 caractères")
      .trim(),
    lastName: z
      .string({ message: "Le nom est requis" })
      .min(2, "Le nom doit contenir au moins 2 caractères")
      .max(50, "Le nom ne peut pas dépasser 50 caractères")
      .trim(),
    email: z
      .string({ message: "L'adresse email est requise" })
      .trim()
      .toLowerCase()
      .email("Adresse email invalide"),
    message: z
      .string({ message: "Le message est requis" })
      .min(10, "Le message doit contenir au moins 10 caractères")
      .max(2000, "Le message ne peut pas dépasser 2000 caractères")
      .trim(),
  }),
});
