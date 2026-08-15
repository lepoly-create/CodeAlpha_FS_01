"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.loginUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const jwt_1 = require("../utils/jwt");
const Cart_1 = __importDefault(require("../models/Cart"));
const loginUser = async (data) => {
    const { email, password } = data;
    // Vérifier que l'utilisateur existe
    const user = await User_1.default.findOne({ email });
    if (!user) {
        throw new Error("Email ou mot de passe incorrect");
    }
    // Comparer le mot de passe
    const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Email ou mot de passe incorrect");
    }
    // Générer le JWT
    const token = (0, jwt_1.generateToken)({
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
exports.loginUser = loginUser;
const registerUser = async (data) => {
    const { fullName, email, password } = data;
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User_1.default.findOne({ email });
    if (existingUser) {
        throw new Error("Cet email est déjà utilisé");
    }
    // Hachage du mot de passe
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    // Création utilisateur
    const user = await User_1.default.create({
        fullName,
        email,
        password: hashedPassword
    });
    await Cart_1.default.create({
        user: user._id,
        items: []
    });
    return user;
};
exports.registerUser = registerUser;
