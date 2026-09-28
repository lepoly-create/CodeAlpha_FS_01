"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const validate = (schema) => {
    return async (req, res, next) => {
        try {
            const parsed = await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            // Remplacer les objets par les versions validées et nettoyées
            if (parsed.body)
                req.body = parsed.body;
            if (parsed.query)
                req.query = parsed.query;
            if (parsed.params)
                req.params = parsed.params;
            next();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                res.status(400).json({
                    success: false,
                    message: "Erreur de validation des données",
                    errors: error.issues.map((err) => ({
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
exports.validate = validate;
