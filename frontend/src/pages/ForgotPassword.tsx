import {
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  Mail,
} from "lucide-react";

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
  requestPasswordReset,
} from "@/services/auth.service";

import BrandLogo from "@/components/common/BrandLogo";

export default function ForgotPassword() {
  const [
    email,
    setEmail,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    success,
    setSuccess,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState("");

  const handleSubmit =
    async (
      event: React.SyntheticEvent<HTMLFormElement>,
    ) => {
      event.preventDefault();

      setLoading(true);
      setSuccess("");
      setError("");

      try {
        const response =
          await requestPasswordReset(
            email.trim(),
          );

        setSuccess(
          response.message,
        );
      } catch {
        setError(
          "Impossible d'effectuer la demande.",
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f9f9ff] px-4">
      <Card className="w-full max-w-md rounded-lg border border-[#e5e7eb] bg-white p-8 shadow-xs">
        <div className="mb-6 flex justify-center">
          <BrandLogo to="/" size="md" rounded="lg" priority />
        </div>

        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[0.25rem] bg-[#ffddb5]/50 text-[#835500] border border-[#835500]/20">
            <Mail className="h-7 w-7 text-[#e59b22]" />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-[#141b2b]">
            Mot de passe oublié
          </h1>

          <p className="mt-2 text-sm text-[#524535]">
            Entrez votre adresse email pour
            recevoir un lien de récupération.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <Input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(
                event.target.value,
              )
            }
            placeholder="Votre adresse email"
            className="h-10 rounded-[0.25rem] border-[#e5e7eb] focus-visible:border-[#e59b22] focus-visible:ring-1 focus-visible:ring-[#e59b22]"
            required
          />

          {success && (
            <p className="rounded-[0.25rem] bg-emerald-50 border border-emerald-200 p-3 text-xs font-medium text-emerald-800">
              {success}
            </p>
          )}

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
              ? "Envoi..."
              : "Envoyer le lien"}
          </Button>
        </form>

        <Link
          to="/login"
          className="mt-6 block text-center text-sm font-semibold text-[#835500] hover:text-[#e59b22] hover:underline"
        >
          Retour à la connexion
        </Link>
      </Card>
    </main>
  );
}