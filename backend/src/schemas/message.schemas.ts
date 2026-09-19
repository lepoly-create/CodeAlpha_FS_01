import { z } from "zod";

export const createConversationSchema = z.object({
  body: z.object({
    subject: z
      .string()
      .min(3, "Le sujet doit contenir au moins 3 caractères")
      .max(150, "Le sujet est trop long")
      .trim(),

    content: z
      .string()
      .min(1, "Le message est requis")
      .max(5000, "Le message est trop long")
      .trim(),
  }),
});

export const createReplySchema = z.object({
  body: z.object({
    content: z
      .string()
      .min(1, "Le message est requis")
      .max(5000, "Le message est trop long")
      .trim(),
  }),
});