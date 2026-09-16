import {
  useCallback,
  useState,
  type ReactNode,
} from "react";

import {
  login as loginService,
  type AuthUser,
} from "@/services/auth.service";
import { AuthContext } from "@/contexts/auth-context";

interface AuthProviderProps {
  children: ReactNode;
}

const getStoredAuth = () => {
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (!storedToken || !storedUser) {
    return { token: null, user: null };
  }

  try {
    return {
      token: storedToken,
      user: JSON.parse(storedUser) as AuthUser,
    };
  } catch {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return { token: null, user: null };
  }
};

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const storedAuth = getStoredAuth();
  const [user, setUser] = useState<AuthUser | null>(storedAuth.user);
  const [token, setToken] = useState<string | null>(storedAuth.token);
  const loading = false;

  const login = async (
    email: string,
    password: string,
  ) => {
    const response = await loginService({
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setUser(user);

    return user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  const updateUser = useCallback((updatedUser: AuthUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
