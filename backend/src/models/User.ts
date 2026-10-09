import {
    Schema,
    model,
    Document,
    Types
} from "mongoose";

export interface IUser extends Document {
    fullName: string;
    email: string;
    password?: string;
    role: "customer" | "admin";

    profileImage?: string | null;
    profileImagePublicId: string | null;

    favoriteProducts: Types.ObjectId[];

    emailVerified: boolean;
    emailVerifiedAt: Date | null;

    googleId?: string | null;
    authProvider: "local" | "google" | "both";
}

const userSchema = new Schema<IUser>(
    {
        fullName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: false,
            select: false,
        },

        role: {
            type: String,
            enum: ["customer", "admin"],
            default: "customer"
        },

        profileImage: {
            type: String,
            default: null
        },

        profileImagePublicId: {
            type: String,
            default: null
        },

        favoriteProducts: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "Product"
                }
            ],
            default: []
        },

        emailVerified: {
            type: Boolean,
            default: false
        },

        emailVerifiedAt: {
            type: Date,
            default: null
        },

        googleId: {
            type: String,
            default: null,
            unique: true,
            sparse: true,
        },

        authProvider: {
            type: String,
            enum: ["local", "google", "both"],
            default: "local"
        }
    },
    {
        timestamps: true
    }
);

export default model<IUser>(
    "User",
    userSchema
);