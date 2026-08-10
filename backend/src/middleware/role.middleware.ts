import { Request, Response, NextFunction } from "express";

export const authorizeRoles = (...roles: string[]) => {

    return (

        req: Request,
        res: Response,
        next: NextFunction

    ) => {

        if (!req.user) {

            return res.status(401).json({

                success: false,

                message: "Utilisateur non authentifié"

            });

        }

        if (!roles.includes(req.user.role)) {

            return res.status(403).json({

                success: false,

                message: "Accès refusé"

            });

        }

        next();

    };

};