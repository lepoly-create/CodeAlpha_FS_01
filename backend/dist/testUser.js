"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database_1 = require("./config/database");
const User_1 = __importDefault(require("./models/User"));
const testUser = async () => {
    try {
        await (0, database_1.connectDB)();
        const user = await User_1.default.create({
            fullName: "Test User",
            email: "test@example.com",
            password: "123456",
        });
        console.log("Utilisateur créé :");
        console.log(user);
        process.exit(0);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
testUser();
