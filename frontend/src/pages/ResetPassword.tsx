import {
  useState,
} from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {
  Card,
} from "@/components/ui/card";

import {
  Input,
} from "@/components/ui/input";

import {
  Button,
} from "@/components/ui/button";

import {
  resetPassword,
} from "@/services/auth.service";

export default function ResetPassword() {
  const [
    searchParams,
  ] = useSearchParams();

  const navigate =
    useNavigate();

  const token =
    searchParams.get(
      "token",
    );

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const handleSubmit =
    async (
      event: React.SyntheticEvent<HTMLFormElement>,
    ) => {
      event.preventDefault();

      setError("");

      if (!token) {
        setError(
          "Lien de réinitialisation invalide.",
        );

        return;
      }

      if (
        password.length < 6
      ) {
        setError(
          "Le mot de passe doit contenir au moins 6 caractères.",
        );

        return;
      }

      if (
        password !==
        confirmPassword
      ) {
        setError(
          "Les mots de passe ne correspondent pas.",
        );

        return;
      }

      try {
        setLoading(true);

        await resetPassword(
          token,
          password,
        );

        navigate(
          "/login",
        );
      } catch (
        error: unknown
      ) {
        const responseMessage =
          typeof error === "object" &&
          error !== null &&
          "response" in error &&
          typeof error.response === "object" &&
          error.response !== null &&
          "data" in error.response &&
          typeof error.response.data === "object" &&
          error.response.data !== null &&
          "message" in error.response.data &&
          typeof error.response.data.message === "string"
            ? error.response.data.message
            : undefined;

        setError(
          responseMessage ||
            "Impossible de réinitialiser le mot de passe.",
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
      <Card className="w-full max-w-md rounded-2xl p-8">

        <h1 className="text-2xl font-bold">
          Nouveau mot de passe
        </h1>

        <p className="mt-3 text-sm text-neutral-500">
          Choisissez un nouveau mot de passe
          pour votre compte.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <Input
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(
                event.target.value,
              )
            }
            placeholder="Nouveau mot de passe"
            required
          />

          <Input
            type="password"
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(
                event.target.value,
              )
            }
            placeholder="Confirmer le mot de passe"
            required
          />

          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading
              ? "Modification..."
              : "Modifier le mot de passe"}
          </Button>
        </form>
      </Card>
    </main>
  );
}