import { z } from "zod";

const orderIdParams = z.object({
  id: z.string().regex(/^[a-f\d]{24}$/i, "Identifiant commande invalide"),
});

export const orderIdSchema = z.object({
  params: orderIdParams,
});

export const updateOrderStatusSchema = z.object({
  params: orderIdParams,
  body: z.object({
    status: z.enum(["pending", "confirmed", "cancelled"], {
      message: "Statut de commande invalide",
    }),
  }),
});
