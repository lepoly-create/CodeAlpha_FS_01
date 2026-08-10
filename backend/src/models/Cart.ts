import mongoose, { Document, Schema } from "mongoose";


export interface ICart extends Document {

    user: mongoose.Types.ObjectId;

    items: {
        product: mongoose.Types.ObjectId;
        quantity: number;
    }[];

    createdAt: Date;
    updatedAt: Date;
}


const cartSchema = new Schema<ICart>(
    {

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },


        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },

                quantity: {
                    type: Number,
                    required: true,
                    default: 1,
                    min: 1
                }
            }
        ]

    },
    {
        timestamps: true
    }
);


export default mongoose.model<ICart>("Cart", cartSchema);