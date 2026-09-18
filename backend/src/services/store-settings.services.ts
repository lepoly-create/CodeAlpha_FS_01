import StoreSettings from "../models/StoreSettings";

export const getStoreSettings = async () => {
  let settings = await StoreSettings.findOne();

  if (!settings) {
    settings = await StoreSettings.create({
      storeName: "MarketElectro",
      contactEmail: "contact@marketelectro.com",
      phone: "",
      currency: "FCFA",
    });
  }

  return settings;
};

interface UpdateStoreSettingsData {
  storeName?: string;
  contactEmail?: string;
  phone?: string;
  currency?: string;
}

export const updateStoreSettings = async (
  data: UpdateStoreSettingsData
) => {
  let settings = await StoreSettings.findOne();

  if (!settings) {
    settings = await StoreSettings.create({
      storeName: data.storeName || "MarketElectro",
      contactEmail:
        data.contactEmail || "contact@marketelectro.com",
      phone: data.phone || "",
      currency: data.currency || "FCFA",
    });

    return settings;
  }

  if (data.storeName !== undefined) {
    settings.storeName = data.storeName;
  }

  if (data.contactEmail !== undefined) {
    settings.contactEmail = data.contactEmail;
  }

  if (data.phone !== undefined) {
    settings.phone = data.phone;
  }

  if (data.currency !== undefined) {
    settings.currency = data.currency;
  }

  await settings.save();

  return settings;
};