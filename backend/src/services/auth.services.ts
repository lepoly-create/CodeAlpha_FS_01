import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User, { type IUser } from "../models/User";
import { generateToken } from "../utils/jwt";
import Cart from "../models/Cart";



interface LoginData {
    email: string;
    password: string;
}

export const loginUser = async (data: LoginData) => {

    const { email, password } = data;

    // Vérifier que l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Email ou mot de passe incorrect");
    }

    // Comparer le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error("Email ou mot de passe incorrect");
    }

    // Générer le JWT
    const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
    });

    return {
        token,
        user: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
        },
    };
};
interface RegisterData {
    fullName: string;
    email: string;
    password: string;
}
export const registerUser = async (data: RegisterData) => {

    const { fullName, email, password } = data;


    // Hachage du mot de passe

    const hashedPassword = await bcrypt.hash(password, 10);

    const session = await mongoose.startSession();

    try {
        let user: IUser | undefined;

        await session.withTransaction(async () => {
            [user] = await User.create(
                [{
                    fullName,
                    email,
                    password: hashedPassword,
                }],
                { session },
            );

            await Cart.create(
                [{
                    user: user._id,
                    items: [],
                }],
                { session },
            );
        });

        if (!user) {
            throw new Error("Utilisateur non créé");
        }

        return user;
    } catch (error: any) {
        if (error?.code === 11000) {
            throw new Error("Cet email est déjà utilisé");
        }

        throw error;
    } finally {
        await session.endSession();
    }

};