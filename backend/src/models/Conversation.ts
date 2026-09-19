import mongoose, { Schema, model, Document } from "mongoose";

export interface IConversation extends Document {
  user: mongoose.Types.ObjectId;
  subject: string;
  status: "open" | "closed";
  createdAt: Date;
  updatedAt: Date;
}

const conversationSchema = new Schema<IConversation>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IConversation>(
  "Conversation",
  conversationSchema
);