import {
    Schema,
    model,
    Types,
    Document
} from "mongoose";

interface IPasswordResetToken
    extends Document {
    user: Types.ObjectId;
    tokenHash: string;
    expiresAt: Date;
    createdAt: Date;
}

const passwordResetTokenSchema =
    new Schema<IPasswordResetToken>(
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
                index: true,
            },

            tokenHash: {
                type: String,
                required: true,
                unique: true,
                index: true,
            },

            expiresAt: {
                type: Date,
                required: true,
            },
        },
        {
            timestamps: {
                createdAt: true,
                updatedAt: false,
            },
        }
    );

passwordResetTokenSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
);

export default model<IPasswordResetToken>(
    "PasswordResetToken",
    passwordResetTokenSchema
);