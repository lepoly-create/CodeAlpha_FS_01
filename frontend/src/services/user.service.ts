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