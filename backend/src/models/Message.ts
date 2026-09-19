import mongoose, { Schema, model, Document } from "mongoose";

export interface IMessage extends Document {
  conversation: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  senderRole: "customer" | "admin";
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    conversation: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true,
    },

    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    senderRole: {
      type: String,
      enum: ["customer", "admin"],
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IMessage>("Message", messageSchema);