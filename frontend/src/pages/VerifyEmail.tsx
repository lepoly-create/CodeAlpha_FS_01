import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useSearchParams,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  MailCheck,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  Card,
} from "@/components/ui/card";

import {
  useAuth,
} from "@/contexts/useAuth";

import {
  verifyEmail,
  resendVerification,
} from "@/services/auth.service";

type Status =
  | "loading"
  | "success"
  | "error"
  | "pending";

export default function VerifyEmail() {
  const [
    searchParams,
  ] = useSearchParams();

  const navigate =
    useNavigate();

  const {
    establishSession,
  } = useAuth();

  const token =
    searchParams.get("token");

  const initialEmail =
    searchParams.get("email") || "";

  const [
    email,
    setEmail,
  ] = useState(
    initialEmail,
  );

  const [
    status,
    setStatus,
  ] = useState<Status>(
    token
      ? "loading"
      : "pending",
  );

  const [
    error,
    setError,
  ] = useState("");

  const [
    resending,
    setResending,
  ] = useState(false);

  /*
   * Empêche une double vérification
   * pendant les cycles de développement
   * de React StrictMode.
   */
  const verificationStarted =
    useRef(false);

  useEffect(() => {
    if (
      !token ||
      verificationStarted.current
    ) {
      return;
    }

    verificationStarted.current =
      true;

    const verify = async () => {
      try {
        /*
         * Le backend vérifie le token
         * et retourne également la session
         * MarketElectro.
         */
        const response =
          await verifyEmail(
            token,
          );

        /*
         * Sauvegarder immédiatement
         * le JWT et l'utilisateur.
         */
        establishSession(
          response.data.token,
          response.data.user,
        );

        /*
         * Le compte est maintenant
         * vérifié et connecté.
         */
        setStatus(
          "success",
        );

        /*
         * Supprimer le token de l'URL
         * et rediriger vers l'application.
         *
         * replace évite de conserver
         * l'ancienne URL dans l'historique.
         */
        navigate(
          response.data.user.role ===
            "admin"
            ? "/admin"
            : "/dashboard",
          {
            replace: true,
          },
        );
      } catch (
        error: unknown
      ) {
        console.error(
          "Erreur lors de la vérification email :",
          error,
        );

        const message =
          axios.isAxiosError<{
            message?: string;
          }>(error)
            ? error.response?.data
                ?.message
            : undefined;

        setError(
          message ||
            "Le lien de vérification est invalide ou expiré.",
        );

        setStatus(
          "error",
        );
      }
    };

    void verify();
  }, [
    token,
    establishSession,
    navigate,
  ]);

  const handleResend =
    async () => {
      if (
        !email.trim()
      ) {
        setError(
          "Veuillez saisir votre adresse email.",
        );

        return;
      }

      try {
        setResending(
          true,
        );

        setError("");

        const response =
          await resendVerification(
            email.trim(),
          );

        setError(
          response.message,
        );
      } catch (
        error: unknown
      ) {
        console.error(
          "Erreur lors du renvoi de l'email :",
          error,
        );

        setError(
          "Impossible d'effectuer la demande.",
        );
      } finally {
        setResending(
          false,
        );
      }
    };

  /*
   * Vérification en cours.
   */
  if (
    status ===
    "loading"
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
        <Card className="w-full max-w-lg rounded-2xl p-8 text-center">

          <Loader2 className="mx-auto h-12 w-12 animate-spin" />

          <h1 className="mt-6 text-2xl font-bold">
            Vérification en cours
          </h1>

          <p className="mt-3 text-neutral-500">
            Nous vérifions votre adresse email
            et préparons votre accès.
          </p>

        </Card>
      </main>
    );
  }

  /*
   * Succès.
   *
   * Cette vue peut être très brièvement
   * visible avant la navigation.
   */
  if (
    status ===
    "success"
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
        <Card className="w-full max-w-lg rounded-2xl p-8 text-center">

          <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" />

          <h1 className="mt-6 text-2xl font-bold">
            Compte vérifié
          </h1>

          <p className="mt-3 text-neutral-500">
            Votre adresse email a été confirmée.
            Vous allez accéder à votre espace.
          </p>

        </Card>
      </main>
    );
  }

  /*
   * Token invalide / expiré.
   */
  if (
    status ===
    "error"
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
        <Card className="w-full max-w-lg rounded-2xl p-8 text-center">

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
              onChange={(event) =>
                setEmail(
                  event.target.value,
                )
              }
              placeholder="Votre adresse email"
              className="h-11 w-full rounded-xl border border-neutral-200 px-4"
            />

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={
                handleResend
              }
              disabled={
                resending
              }
            >
              {resending
                ? "Envoi..."
                : "Renvoyer l'email"}
            </Button>

          </div>

          <Button
            type="button"
            variant="ghost"
            className="mt-4 w-full"
            onClick={() =>
              navigate(
                "/login",
                {
                  replace: true,
                },
              )
            }
          >
            Retour à la connexion
          </Button>

        </Card>
      </main>
    );
  }

  /*
   * Page affichée après l'inscription,
   * lorsqu'il n'y a pas encore de token.
   */
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
      <Card className="w-full max-w-lg rounded-2xl p-8 text-center">

        <MailCheck className="mx-auto h-14 w-14" />

        <h1 className="mt-6 text-2xl font-bold">
          Vérifiez votre adresse email
        </h1>

        <p className="mt-3 text-neutral-500">
          Un email de confirmation a été
          envoyé. Consultez votre boîte de
          réception et cliquez sur le lien reçu.
        </p>

        <div className="mt-8 space-y-3">

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(
                event.target.value,
              )
            }
            placeholder="Votre adresse email"
            className="h-11 w-full rounded-xl border border-neutral-200 px-4"
          />

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={
              handleResend
            }
            disabled={
              resending
            }
          >
            {resending
              ? "Envoi..."
              : "Renvoyer l'email"}
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
          onClick={() =>
            navigate(
              "/login",
            )
          }
        >
          Retour à la connexion
        </Button>

      </Card>
    </main>
  );
}