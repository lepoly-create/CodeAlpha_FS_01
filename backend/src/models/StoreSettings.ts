import { Schema, model, Document } from "mongoose";

export interface IStoreSettings extends Document {
  storeName: string;
  contactEmail: string;
  phone?: string;
  currency: string;
}

const storeSettingsSchema = new Schema<IStoreSettings>(
  {
    storeName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    contactEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
        type: String,
        required: false,
        default: "",
        trim: true,
        maxlength: 30,
    },

    currency: {
      type: String,
      required: true,
      default: "FCFA",
      trim: true,
      maxlength: 10,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IStoreSettings>(
  "StoreSettings",
  storeSettingsSchema
);