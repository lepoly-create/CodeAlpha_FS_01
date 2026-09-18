import { createContext } from "react";

import type { AuthUser } from "@/services/auth.service";

export interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  logout: () => void;
  updateUser: (user: AuthUser) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
