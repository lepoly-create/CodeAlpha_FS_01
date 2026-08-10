import bcrypt from "bcryptjs";
import User from "../models/User";
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


    // Vérifier si l'utilisateur existe déjà

    const existingUser = await User.findOne({ email });


    if (existingUser) {
        throw new Error("Cet email est déjà utilisé");
    }


    // Hachage du mot de passe

    const hashedPassword = await bcrypt.hash(password, 10);


    // Création utilisateur

    const user = await User.create({

        fullName,

        email,

        password: hashedPassword

    });

    await Cart.create({
        user: user._id,
        items: []
    });


    return user;

};