import { z } from "zod";


const emailSchema = z
    .string({ error: "L'adresse email est requise" })
    .trim()
    .toLowerCase()
    .pipe(z.email({ error: "Adresse email invalide" }));

export const requestEmailChangeSchema =
  z.object({
    body: z.object({
      newEmail: emailSchema ,

      currentPassword: z
        .string()
        .min(
          1,
          "Le mot de passe actuel est requis",
        ),
    }),
  });

export const verifyEmailChangeSchema =
  z.object({
    body: z.object({
      token: z
        .string()
        .min(
          64,
          "Token invalide",
        )
        .max(
          128,
          "Token invalide",
        ),
    }),
  });