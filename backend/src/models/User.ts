import { Schema, model, Document, Types } from "mongoose";

export interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
    role: "customer" | "admin";

    favoriteProducts: Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
    {
        fullName: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["customer", "admin"],
            default: "customer"
        },

        favoriteProducts: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "Product"
                }
            ],
            default: []
        }
    },
    {
        timestamps: true
    }
);

export default model<IUser>("User", userSchema);