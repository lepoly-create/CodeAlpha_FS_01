import { z } from "zod";

const objectId = z
  .string({
    message: "L'identifiant du produit est requis",
  })
  .regex(/^[a-f\d]{24}$/i, "Identifiant produit invalide");

export const favoriteProductSchema = z.object({
  params: z.object({
    productId: objectId,
  }),
});
