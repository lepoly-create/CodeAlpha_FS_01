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
    <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
      <Card className="w-full max-w-md rounded-2xl p-8">

        <div className="text-center">
          <Mail className="mx-auto h-12 w-12" />

          <h1 className="mt-5 text-2xl font-bold">
            Mot de passe oublié
          </h1>

          <p className="mt-3 text-sm text-neutral-500">
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
            required
          />

          {success && (
            <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
              {success}
            </p>
          )}

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
              ? "Envoi..."
              : "Envoyer le lien"}
          </Button>
        </form>

        <Link
          to="/login"
          className="mt-6 block text-center text-sm font-semibold hover:underline"
        >
          Retour à la connexion
        </Link>
      </Card>
    </main>
  );
}