import {
  createContext,
} from "react";

import type {
  AuthUser,
} from "@/services/auth.service";

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;

  login: (
    email: string,
    password: string,
  ) => Promise<AuthUser>;

  loginWithGoogle: (
    credential: string,
  ) => Promise<AuthUser>;

  establishSession: (
    token: string,
    user: AuthUser,
  ) => void;

  logout: () => void;

  updateUser: (
    updatedUser: AuthUser,
  ) => void;
}

export const AuthContext =
  createContext<
    AuthContextValue | undefined
  >(undefined);