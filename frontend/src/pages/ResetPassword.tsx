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
        password.length < 8
      ) {
        setError(
          "Le mot de passe doit contenir au moins 8 caractères.",
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
    <main className="flex min-h-screen items-center justify-center bg-[#f9f9ff] px-4">
      <Card className="w-full max-w-md rounded-lg border border-[#e5e7eb] bg-white p-8 shadow-xs">

        <h1 className="text-2xl font-bold text-[#141b2b]">
          Nouveau mot de passe
        </h1>

        <p className="mt-2 text-sm text-[#524535]">
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
            className="h-10 rounded-[0.25rem] border-[#e5e7eb] focus-visible:border-[#e59b22] focus-visible:ring-1 focus-visible:ring-[#e59b22]"
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
            className="h-10 rounded-[0.25rem] border-[#e5e7eb] focus-visible:border-[#e59b22] focus-visible:ring-1 focus-visible:ring-[#e59b22]"
            required
          />

          {error && (
            <p className="rounded-[0.25rem] bg-[#ffdad6]/60 border border-[#ba1a1a]/20 p-3 text-xs font-medium text-[#93000a]">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-10 rounded-[0.25rem] bg-[#e59b22] text-sm font-semibold text-white shadow-[0_4px_14px_0_rgba(229,155,34,0.35)] hover:bg-[#d97706]"
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