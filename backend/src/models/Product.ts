import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        image: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        stock: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IProduct>("Product", productSchema);