import api from "@/api/axios";

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role: "customer" | "admin";
  profileImage?: string | null;
}

export const getMyProfile = async (): Promise<UserProfile> => {
  const response = await api.get("/users/me");

  return response.data.data;
};

export interface UpdateProfileData {
  fullName?: string;
  email?: string;
}



export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const updateMyProfile = async (data: UpdateProfileData): Promise<UserProfile> => {
  const response = await api.put("/users/me", data);
  return response.data.data;
};

export const changeMyPassword = async (data: ChangePasswordData): Promise<void> => {
  await api.put("/users/me/password", data);
};

export const uploadProfileImage = async (file: File): Promise<UserProfile> => {
  const formData = new FormData();
  formData.append("profileImage", file);
  const response = await api.put("/users/me/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data;
};