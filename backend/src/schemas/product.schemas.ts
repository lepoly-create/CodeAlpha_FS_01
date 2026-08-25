import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z
      .string({ message: "Le nom du produit est requis" })
      .min(2, "Le nom doit contenir au moins 2 caractères")
      .max(100, "Le nom ne peut pas dépasser 100 caractères")
      .trim(),
    description: z
      .string({ message: "La description du produit est requise" })
      .min(5, "La description doit contenir au moins 5 caractères")
      .trim(),
    price: z
      .number({ message: "Le prix est requis" })
      .min(0, "Le prix ne peut pas être négatif"),
    image: z
      .string({ message: "L'image du produit est requise" })
      .url("L'image doit être une URL valide")
      .or(z.string().min(1, "L'image ne peut pas être vide")),
    category: z
      .string({ message: "La catégorie est requise" })
      .min(2, "La catégorie doit contenir au moins 2 caractères")
      .trim(),
    stock: z
      .number({ message: "La quantité en stock est requise" })
      .int("Le stock doit être un nombre entier")
      .min(0, "Le stock ne peut pas être négatif"),
  }),
});

export const updateProductSchema = z.object({
  body: createProductSchema.shape.body.partial(),
});
