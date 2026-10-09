import api from "@/api/axios";

import type {
  AuthProvider,
} from "@/services/auth.service";

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role: "customer" | "admin";
  profileImage?: string | null;
  emailVerified: boolean;
  authProvider: AuthProvider;
}

export const getMyProfile =
  async (): Promise<UserProfile> => {
    const response =
      await api.get(
        "/users/me",
      );

    return response.data.data;
  };

export interface UpdateProfileData {
  fullName: string;
}

export const updateMyProfile =
  async (
    data: UpdateProfileData,
  ): Promise<UserProfile> => {
    const response =
      await api.put(
        "/users/me",
        data,
      );

    return response.data.data;
  };

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const changeMyPassword =
  async (
    data: ChangePasswordData,
  ) => {
    await api.put(
      "/users/me/password",
      data,
    );
  };

export const uploadProfileImage =
  async (
    file: File,
  ): Promise<UserProfile> => {
    const formData =
      new FormData();

    formData.append(
      "profileImage",
      file,
    );

    const response =
      await api.put(
        "/users/me/avatar",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        },
      );

    return response.data.data;
  };

export const requestEmailChange =
  async (
    newEmail: string,
    currentPassword: string,
  ) => {
    const response =
      await api.post(
        "/users/me/email-change",
        {
          newEmail,
          currentPassword,
        },
      );

    return response.data;
  };

export const linkGoogleAccount =
  async (
    credential: string,
  ): Promise<UserProfile> => {
    const response =
      await api.post(
        "/users/me/google-link",
        {
          credential,
        },
      );

    return response.data.data;
  };