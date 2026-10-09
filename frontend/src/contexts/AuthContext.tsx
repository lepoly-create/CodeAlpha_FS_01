import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  login as loginService,
  loginWithGoogle as loginWithGoogleService,
  type AuthUser,
} from "@/services/auth.service";

import {
  AuthContext,
} from "@/contexts/auth-context";

interface AuthProviderProps {
  children: ReactNode;
}

const getStoredAuth = () => {
  const storedToken =
    localStorage.getItem("token");

  const storedUser =
    localStorage.getItem("user");

  if (
    !storedToken ||
    !storedUser
  ) {
    return {
      token: null,
      user: null,
    };
  }

  try {
    return {
      token: storedToken,
      user:
        JSON.parse(
          storedUser,
        ) as AuthUser,
    };
  } catch {
    localStorage.removeItem(
      "token",
    );

    localStorage.removeItem(
      "user",
    );

    return {
      token: null,
      user: null,
    };
  }
};

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const storedAuth =
    useMemo(
      () => getStoredAuth(),
      [],
    );

  const [user, setUser] =
    useState<AuthUser | null>(
      storedAuth.user,
    );

  const [token, setToken] =
    useState<string | null>(
      storedAuth.token,
    );

  const loading = false;

  const persistAuth =
    useCallback(
      (
        nextToken: string,
        nextUser: AuthUser,
      ) => {
        localStorage.setItem(
          "token",
          nextToken,
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            nextUser,
          ),
        );
      },
      [],
    );

  const login =
    useCallback(
      async (
        email: string,
        password: string,
      ) => {
        const response =
          await loginService({
            email,
            password,
          });

        const {
          token: newToken,
          user: newUser,
        } = response.data;

        persistAuth(
          newToken,
          newUser,
        );

        setToken(
          newToken,
        );

        setUser(
          newUser,
        );

        return newUser;
      },
      [persistAuth],
    );

  const loginWithGoogle =
    useCallback(
      async (
        credential: string,
      ) => {
        const response =
          await loginWithGoogleService(
            credential,
          );

        const {
          token: newToken,
          user: newUser,
        } = response.data;

        persistAuth(
          newToken,
          newUser,
        );

        setToken(
          newToken,
        );

        setUser(
          newUser,
        );

        return newUser;
      },
      [persistAuth],
    );

  const logout =
    useCallback(
      () => {
        localStorage.removeItem(
          "token",
        );

        localStorage.removeItem(
          "user",
        );

        setToken(null);
        setUser(null);
      },
      [],
    );

  const updateUser =
    useCallback(
      (
        updatedUser: AuthUser,
      ) => {
        setUser(
          updatedUser,
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            updatedUser,
          ),
        );
      },
      [],
    );

    const establishSession =
      useCallback(
        (
          newToken: string,
          newUser: AuthUser,
        ) => {
          localStorage.setItem(
            "token",
            newToken,
          );

          localStorage.setItem(
            "user",
            JSON.stringify(newUser),
          );

          setToken(
            newToken,
          );

          setUser(
            newUser,
          );
        },
        [],
      );

  const value =
    useMemo(
      () => ({
        user,
        token,
        isAuthenticated:
          !!token,
        loading,
        login,
        loginWithGoogle,
        establishSession,
        logout,
        updateUser,
      }),
      [
        user,
        token,
        loading,
        login,
        loginWithGoogle,
        establishSession,
        logout,
        updateUser,
      ],
    );

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}