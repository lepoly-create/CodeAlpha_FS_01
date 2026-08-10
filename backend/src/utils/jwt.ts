import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";

interface JwtPayload {
    id: string;
    email: string;
    role: string;
}

export const generateToken = (payload: JwtPayload): string => {

    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET est introuvable dans le fichier .env");
    }

    const expiresIn = process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"];

    return jwt.sign(payload, secret, {
        expiresIn,
    });
};