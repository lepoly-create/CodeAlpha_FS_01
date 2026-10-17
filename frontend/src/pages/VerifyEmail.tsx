import { useState } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  MailCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/useAuth";
import {
  verifyEmail,
  resendVerification,
} from "@/services/auth.service";
import BrandLogo from "@/components/common/BrandLogo";

type Status =
  | "ready"
  | "loading"
  | "success"
  | "error"
  | "pending";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { establishSession } = useAuth();

  const token = searchParams.get("token");
  const stateEmail = (location.state as { email?: string } | null)?.email || "";

  const [email, setEmail] = useState(stateEmail);
  const [status, setStatus] = useState<Status>(
    token ? "ready" : "pending"
  );
  const [error, setError] = useState("");
  const [resending, setResending] = useState(false);

  /*
   * Déclenchement manuel de la confirmation par l'utilisateur.
   * Empêche les scanners antivirus / Safe Links d'invalider le lien à usage unique.
   */
  const handleConfirmVerification = async () => {
    if (!token) return;

    setStatus("loading");
    try {
      const response = await verifyEmail(token);

      establishSession(
        response.data.token,
        response.data.user
      );

      setStatus("success");

      navigate(
        response.data.user.role === "admin"
          ? "/admin"
          : "/dashboard",
        { replace: true }
      );
    } catch (err: unknown) {
      console.error("Erreur lors de la vérification email :", err);

      const message = axios.isAxiosError<{ message?: string }>(err)
        ? err.response?.data?.message
        : undefined;

      setError(
        message || "Le lien de vérification est invalide ou expiré."
      );
      setStatus("error");
    }
  };

  const handleResend = async () => {
    if (!email.trim()) {
      setError("Veuillez saisir votre adresse email.");
      return;
    }

    try {
      setResending(true);
      setError("");

      const response = await resendVerification(email.trim());
      setError(response.message);
    } catch (err: unknown) {
      console.error("Erreur lors du renvoi de l'email :", err);
      setError("Impossible d'effectuer la demande.");
    } finally {
      setResending(false);
    }
  };

  /*
   * Lien avec token présent : invitation à confirmer (anti-scanner Safe Links)
   */
  if (status === "ready") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
        <Card className="w-full max-w-lg rounded-2xl p-8 text-center">
          <div className="mb-6 flex justify-center">
            <BrandLogo to="/" size="md" rounded="lg" priority />
          </div>
          <MailCheck className="mx-auto h-14 w-14 text-neutral-800" />

          <h1 className="mt-6 text-2xl font-bold">
            Confirmer votre adresse email
          </h1>

          <p className="mt-3 text-neutral-500">
            Cliquez sur le bouton ci-dessous pour valider définitivement votre compte MarketElectro et finaliser votre inscription.
          </p>

          <div className="mt-8 space-y-3">
            <Button
              type="button"
              className="w-full"
              onClick={handleConfirmVerification}
            >
              Confirmer mon adresse email
            </Button>
          </div>
        </Card>
      </main>
    );
  }

  /*
   * Vérification en cours.
   */
  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
        <Card className="w-full max-w-lg rounded-2xl p-8 text-center">
          <div className="mb-6 flex justify-center">
            <BrandLogo to="/" size="md" rounded="lg" priority />
          </div>
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-[#e59b22]" />

          <h1 className="mt-6 text-2xl font-bold">
            Vérification en cours
          </h1>

          <p className="mt-3 text-neutral-500">
            Nous vérifions votre adresse email et préparons votre accès.
          </p>
        </Card>
      </main>
    );
  }

  /*
   * Succès.
   */
  if (status === "success") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
        <Card className="w-full max-w-lg rounded-2xl p-8 text-center">
          <div className="mb-6 flex justify-center">
            <BrandLogo to="/" size="md" rounded="lg" priority />
          </div>
          <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" />

          <h1 className="mt-6 text-2xl font-bold">
            Compte vérifié
          </h1>

          <p className="mt-3 text-neutral-500">
            Votre adresse email a été confirmée. Redirection vers votre espace...
          </p>
        </Card>
      </main>
    );
  }

  /*
   * Token invalide / expiré.
   */
  if (status === "error") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
        <Card className="w-full max-w-lg rounded-2xl p-8 text-center">
          <div className="mb-6 flex justify-center">
            <BrandLogo to="/" size="md" rounded="lg" priority />
          </div>
          <AlertTriangle className="mx-auto h-14 w-14 text-red-600" />

          <h1 className="mt-6 text-2xl font-bold">
            Vérification impossible
          </h1>

          <p className="mt-3 text-neutral-500">
            {error}
          </p>

          <div className="mt-8 space-y-3">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Votre adresse email"
              className="h-11 w-full rounded-xl border border-neutral-200 px-4"
            />

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleResend}
              disabled={resending}
            >
              {resending ? "Envoi..." : "Renvoyer l'email"}
            </Button>
          </div>

          <Button
            type="button"
            variant="ghost"
            className="mt-4 w-full"
            onClick={() => navigate("/login", { replace: true })}
          >
            Retour à la connexion
          </Button>
        </Card>
      </main>
    );
  }

  /*
   * Page affichée après l'inscription, lorsqu'il n'y a pas encore de token.
   */
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
      <Card className="w-full max-w-lg rounded-2xl p-8 text-center">
        <div className="mb-6 flex justify-center">
          <BrandLogo to="/" size="md" rounded="lg" priority />
        </div>
        <MailCheck className="mx-auto h-14 w-14 text-[#e59b22]" />

        <h1 className="mt-6 text-2xl font-bold">
          Vérifiez votre adresse email
        </h1>

        <p className="mt-3 text-neutral-500">
          Un email de confirmation a été envoyé. Consultez votre boîte de réception et cliquez sur le lien reçu.
        </p>

        <div className="mt-8 space-y-3">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Votre adresse email"
            className="h-11 w-full rounded-xl border border-neutral-200 px-4"
          />

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleResend}
            disabled={resending}
          >
            {resending ? "Envoi..." : "Renvoyer l'email"}
          </Button>

          {error && (
            <p className="text-sm text-neutral-500">
              {error}
            </p>
          )}
        </div>

        <Button
          type="button"
          variant="ghost"
          className="mt-4 w-full"
          onClick={() => navigate("/login")}
        >
          Retour à la connexion
        </Button>
      </Card>
    </main>
  );
}