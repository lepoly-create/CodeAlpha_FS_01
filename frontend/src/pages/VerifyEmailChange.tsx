import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useSearchParams,
  useNavigate,
} from "react-router-dom";

import {
  CheckCircle2,
  Loader2,
  AlertTriangle,
} from "lucide-react";

import {
  Card,
} from "@/components/ui/card";

import {
  Button,
} from "@/components/ui/button";

import {
  useAuth,
} from "@/contexts/useAuth";

import {
  verifyEmailChange,
} from "@/services/auth.service";

export default function VerifyEmailChange() {
  const [
    searchParams,
  ] = useSearchParams();

  const navigate =
    useNavigate();

  const {
    user,
    updateUser,
  } = useAuth();

  const token =
    searchParams.get(
      "token",
    );

  const [
    status,
    setStatus,
  ] = useState<
    "loading"
    | "success"
    | "error"
  >(
    token
      ? "loading"
      : "error",
  );

  const [
    error,
    setError,
  ] = useState("");

  const started =
    useRef(false);

  useEffect(() => {
    if (
      !token ||
      started.current
    ) {
      return;
    }

    started.current =
      true;

    const verify =
      async () => {
        try {
          const response =
            await verifyEmailChange(
              token,
            );

          if (user) {
            updateUser({
              ...user,
              email:
                response.data.newEmail,
              emailVerified:
                true,
            });
          }

          setStatus(
            "success",
          );
        } catch (
          error: any
        ) {
          setError(
            error?.response?.data
              ?.message ||
              "Lien invalide ou expiré.",
          );

          setStatus(
            "error",
          );
        }
      };

    verify();
  }, [
    token,
    user,
    updateUser,
  ]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
      <Card className="w-full max-w-lg rounded-2xl p-8 text-center">

        {status ===
          "loading" && (
          <>
            <Loader2 className="mx-auto h-12 w-12 animate-spin" />

            <h1 className="mt-6 text-2xl font-bold">
              Confirmation en cours
            </h1>
          </>
        )}

        {status ===
          "success" && (
          <>
            <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" />

            <h1 className="mt-6 text-2xl font-bold">
              Adresse email modifiée
            </h1>

            <p className="mt-3 text-neutral-500">
              Votre nouvelle adresse email a
              été confirmée.
            </p>

            <Button
              type="button"
              className="mt-8"
              onClick={() =>
                navigate(
                  user
                    ? "/profile"
                    : "/login",
                )
              }
            >
              Continuer
            </Button>
          </>
        )}

        {status ===
          "error" && (
          <>
            <AlertTriangle className="mx-auto h-14 w-14 text-red-600" />

            <h1 className="mt-6 text-2xl font-bold">
              Confirmation impossible
            </h1>

            <p className="mt-3 text-neutral-500">
              {error}
            </p>

            <Button
              type="button"
              className="mt-8"
              onClick={() =>
                navigate(
                  user
                    ? "/profile"
                    : "/login",
                )
              }
            >
              Continuer
            </Button>
          </>
        )}

      </Card>
    </main>
  );
}