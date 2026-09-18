import { z } from "zod";

export const updateStoreSettingsSchema = z.object({
  body: z.object({
    storeName: z
      .string()
      .min(
        2,
        "Le nom de la boutique doit contenir au moins 2 caractères"
      )
      .max(
        100,
        "Le nom de la boutique ne peut pas dépasser 100 caractères"
      )
      .trim()
      .optional(),

    contactEmail: z
      .string()
      .email("Adresse email invalide")
      .trim()
      .toLowerCase()
      .optional(),

    phone: z
      .string()
      .max(30, "Le numéro de téléphone est trop long")
       .refine(
         (value) => value === "" || value.length >= 8,
         "Le numéro de téléphone est invalide"
       )
      .trim()
      .optional(),

    currency: z
      .string()
      .min(2)
      .max(10)
      .trim()
      .optional(),
  }),
});