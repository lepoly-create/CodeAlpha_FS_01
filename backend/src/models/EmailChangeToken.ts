import {
    Schema,
    model,
    Types,
    Document
} from "mongoose";

interface IEmailChangeToken
    extends Document {
    user: Types.ObjectId;
    newEmail: string;
    tokenHash: string;
    expiresAt: Date;
    createdAt: Date;
}

const emailChangeTokenSchema =
    new Schema<IEmailChangeToken>(
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
                index: true,
            },

            newEmail: {
                type: String,
                required: true,
                trim: true,
                lowercase: true,
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

emailChangeTokenSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
);

export default model<IEmailChangeToken>(
    "EmailChangeToken",
    emailChangeTokenSchema
);