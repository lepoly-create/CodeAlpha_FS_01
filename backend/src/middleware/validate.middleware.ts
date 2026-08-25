import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validate = (schema: z.ZodType<any, any, any>) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // Remplacer les objets par les versions validées et nettoyées
      if (parsed.body) req.body = parsed.body;
      if (parsed.query) req.query = parsed.query;
      if (parsed.params) req.params = parsed.params;

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Erreur de validation des données",
          errors: error.issues.map((err: any) => ({
            field: err.path.slice(1).join("."), // retire 'body', 'query' ou 'params' du chemin
            message: err.message,
          })),
        });
        return;
      }
      next(error);
    }
  };
};
