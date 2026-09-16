import { z } from "zod";

const objectId = z
  .string()
  .regex(/^[a-f\d]{24}$/i, "Identifiant produit invalide");

const quantity = z
  .number({ message: "La quantité doit être un nombre" })
  .int("La quantité doit être un entier")
  .min(1, "La quantité doit être supérieure ou égale à 1")
  .max(1000, "La quantité maximale est de 1000");

export const addCartItemSchema = z.object({
  body: z.object({
    productId: objectId,
    quantity,
  }),
});

export const updateCartItemSchema = z.object({
  params: z.object({
    productId: objectId,
  }),
  body: z.object({
    quantity,
  }),
});