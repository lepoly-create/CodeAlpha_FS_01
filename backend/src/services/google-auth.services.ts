import mongoose from "mongoose";
import { OAuth2Client, type TokenPayload } from "google-auth-library";

import User, { type IUser } from "../models/User";
import Cart from "../models/Cart";
import { generateToken } from "../utils/jwt";

// Type personnalisé garantissant la présence des champs 'sub' et 'email' après vérification
type ValidatedGooglePayload = TokenPayload & {
    sub: string;
    email: string;
};

const googleClient = new OAuth2Client();

const verifyGoogleCredential = async (
    credential: string
): Promise<ValidatedGooglePayload> => {
    const clientId = process.env.GOOGLE_CLIENT_ID;

    if (!clientId) {
        throw new Error("GOOGLE_CLIENT_ID est introuvable");
    }

    const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: clientId,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.sub || !payload.email) {
        throw new Error("Identité Google invalide");
    }

    if (payload.email_verified !== true) {
        throw new Error("Cette adresse Google n'est pas vérifiée.");
    }

    // Assertion de type car nous avons vérifié que 'sub' et 'email' existent
    return payload as ValidatedGooglePayload;
};

const buildAuthResult = (user: IUser) => {
    const token = generateToken({
        id: user._id.toString(),
        email: user.email,
        role: user.role,
    });

    return {
        token,
        user: {
            id: user._id.toString(),
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage ?? null,
            emailVerified: user.emailVerified,
            authProvider: user.authProvider,
        },
    };
};

export const loginWithGoogle = async (credential: string) => {
    const payload = await verifyGoogleCredential(credential);

    const googleId = payload.sub;

    const email = payload.email.trim().toLowerCase();

    const existingGoogleUser = await User.findOne({
        googleId,
    });

    if (existingGoogleUser) {
        return buildAuthResult(existingGoogleUser);
    }

    const existingEmailUser = await User.findOne({
        email,
    });

    if (existingEmailUser) {
        const error = new Error(
            "Un compte MarketElectro existe déjà avec cette adresse. Connectez-vous avec votre mot de passe, puis liez Google depuis votre profil."
        );

        (error as any).code = "ACCOUNT_LINK_REQUIRED";

        throw error;
    }

    const session = await mongoose.startSession();

    try {
        let user: IUser | undefined;

        await session.withTransaction(async () => {
            [user] = await User.create(
                [
                    {
                        fullName: payload.name || email.split("@")[0],
                        email,
                        role: "customer",
                        profileImage: payload.picture ?? null,
                        emailVerified: true,
                        emailVerifiedAt: new Date(),
                        googleId,
                        authProvider: "google",
                    },
                ],
                { session }
            );

            await Cart.create(
                [
                    {
                        user: user!._id,
                        items: [],
                    },
                ],
                { session }
            );
        });

        if (!user) {
            throw new Error("Utilisateur Google non créé");
        }

        return buildAuthResult(user);
    } finally {
        await session.endSession();
    }
};

export const linkGoogleAccount = async (
    userId: string,
    credential: string
) => {
    const payload = await verifyGoogleCredential(credential);

    const googleId = payload.sub;

    const googleEmail = payload.email.trim().toLowerCase();

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("Utilisateur introuvable");
    }

    if (user.googleId) {
        throw new Error("Un compte Google est déjà lié à ce compte.");
    }

    if (user.email !== googleEmail) {
        throw new Error(
            "L'adresse Google doit correspondre à l'adresse email actuelle du compte."
        );
    }

    const existing = await User.findOne({
        googleId,
    });

    if (
        existing &&
        existing._id.toString() !== user._id.toString()
    ) {
        throw new Error(
            "Ce compte Google est déjà associé à un autre compte MarketElectro."
        );
    }

    user.googleId = googleId;
    user.authProvider = "both";

    await user.save();

    return {
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage ?? null,
        emailVerified: user.emailVerified,
        authProvider: user.authProvider,
    };
};