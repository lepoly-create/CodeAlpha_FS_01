import {
    Schema,
    model,
    Types,
    Document
} from "mongoose";

interface IEmailVerificationToken
    extends Document {
    user: Types.ObjectId;
    tokenHash: string;
    expiresAt: Date;
    createdAt: Date;
}

const emailVerificationTokenSchema =
    new Schema<IEmailVerificationToken>(
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

emailVerificationTokenSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
);

export default model<IEmailVerificationToken>(
    "EmailVerificationToken",
    emailVerificationTokenSchema
);