import api from "@/api/axios";

export interface AdminAccount {
  _id: string;
  fullName: string;
  email: string;
  role: "admin";
  profileImage?: string | null;
}

export interface StoreSettings {
  _id: string;
  storeName: string;
  contactEmail: string;
  phone: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

interface ProfileResponse {
  success: boolean;
  data: AdminAccount;
}

interface StoreSettingsResponse {
  success: boolean;
  data: StoreSettings;
}

interface MessageResponse {
  success: boolean;
  message: string;
  data?: AdminAccount | StoreSettings;
}

/* =========================
   ADMIN ACCOUNT
========================= */

export const getAdminProfile = async (): Promise<AdminAccount> => {
  const response =
    await api.get<ProfileResponse>("/users/me");

  return response.data.data;
};

export const updateAdminProfile = async (
  data: {
    fullName?: string;
    email?: string;
  }
): Promise<AdminAccount> => {
  const response =
    await api.put<ProfileResponse>("/users/me", data);

  return response.data.data;
};

export const changeAdminPassword = async (
  data: {
    currentPassword: string;
    newPassword: string;
  }
): Promise<void> => {
  await api.put<MessageResponse>(
    "/users/me/password",
    data
  );
};

/* =========================
   STORE SETTINGS
========================= */

export const getStoreSettings = async (): Promise<StoreSettings> => {
  const response =
    await api.get<StoreSettingsResponse>(
      "/admin/settings/store"
    );

  return response.data.data;
};

export const updateStoreSettings = async (
  data: Partial<
    Pick<
      StoreSettings,
      "storeName" | "contactEmail" | "phone" | "currency"
    >
  >
): Promise<StoreSettings> => {
  const response =
    await api.put<StoreSettingsResponse>(
      "/admin/settings/store",
      data
    );

  return response.data.data;
};