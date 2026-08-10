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

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    token: string;
    user: AuthUser;
  };
}

export const login = async (
  data: LoginData,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/auth/login",
    data,
  );

  return response.data;
};

export const register = async (
  data: RegisterData,
) => {
  const response = await api.post(
    "/auth/register",
    data,
  );

  return response.data;
};