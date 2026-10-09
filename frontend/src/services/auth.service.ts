import api from "@/api/axios";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

export type AuthProvider =
  | "local"
  | "google"
  | "both";

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: "customer" | "admin";
  profileImage?: string | null;
  emailVerified: boolean;
  authProvider: AuthProvider;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: AuthUser;
  };
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    fullName: string;
    email: string;
    emailVerificationRequired: boolean;
    emailSent: boolean;
  };
}

export interface VerifyEmailResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: AuthUser;
  };
}

export const login = async (
  data: LoginData,
): Promise<AuthResponse> => {
  const response =
    await api.post<AuthResponse>(
      "/auth/login",
      data,
    );

  return response.data;
};

export const loginWithGoogle =
  async (
    credential: string,
  ): Promise<AuthResponse> => {
    const response =
      await api.post<AuthResponse>(
        "/auth/google",
        {
          credential,
        },
      );

    return response.data;
  };

export const register = async (
  data: RegisterData,
): Promise<RegisterResponse> => {
  const response =
    await api.post<RegisterResponse>(
      "/auth/register",
      data,
    );

  return response.data;
};

export const verifyEmail = async (
  token: string,
): Promise<VerifyEmailResponse> => {
  const response =
    await api.post<VerifyEmailResponse>(
      "/auth/verify-email",
      {
        token,
      },
    );

  return response.data;
};

export const resendVerification =
  async (
    email: string,
  ) => {
    const response =
      await api.post(
        "/auth/resend-verification",
        {
          email,
        },
      );

    return response.data;
  };

export const requestPasswordReset =
  async (
    email: string,
  ) => {
    const response =
      await api.post(
        "/auth/forgot-password",
        {
          email,
        },
      );

    return response.data;
  };

export const resetPassword =
  async (
    token: string,
    newPassword: string,
  ) => {
    const response =
      await api.post(
        "/auth/reset-password",
        {
          token,
          newPassword,
        },
      );

    return response.data;
  };

export const verifyEmailChange =
  async (
    token: string,
  ) => {
    const response =
      await api.post(
        "/auth/verify-email-change",
        {
          token,
        },
      );

    return response.data;
  };