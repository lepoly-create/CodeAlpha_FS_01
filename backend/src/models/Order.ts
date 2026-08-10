import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
    user: mongoose.Types.ObjectId;

    items: {
        product: mongoose.Types.ObjectId;
        quantity: number;
        price: number;
    }[];

    totalAmount: number;

    status:
        | "pending"
        | "confirmed"
        | "cancelled";

    createdAt: Date;
    updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        items: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },

                quantity: {
                    type: Number,
                    required: true,
                },

                price: {
                    type: Number,
                    required: true,
                },
            },
        ],

        totalAmount: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IOrder>("Order", orderSchema);