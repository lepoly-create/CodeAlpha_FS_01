import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import BrandLogo from "@/components/common/BrandLogo";
import { register } from "@/services/auth.service";

const parseRegisterError = (error: unknown): string => {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return (
      error.response?.data?.message ||
      "Une erreur est survenue lors de la création du compte."
    );
  }
  if (error instanceof Error) return error.message;
  return "Impossible de créer le compte. Veuillez réessayer.";
};
// 1. Gestion ultra-rapide du clic sur le logo / liens d'ancres
const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  // Si on est sur la page d'accueil et qu'il s'agit d'une ancre (ex: /#about ou /)
  if (location.pathname === "/" && (href.startsWith("/#") || href === "/")) {
    e.preventDefault();
    const targetId = href.replace("/#", "");

    if (href === "/" || targetId === "hero") {
      // Remontée instantanée en haut
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      window.history.pushState(null, "", "/");
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        // Saut instantané vers la section sans lag
        element.scrollIntoView({ behavior: "instant" as ScrollBehavior });
        window.history.pushState(null, "", href);
      }
    }
  }
};
export default function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;

    setError("");

    const cleanName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) {
      setError("Le nom complet est requis.");
      return;
    }

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!acceptTerms) {
      setError("Vous devez accepter les conditions d'utilisation.");
      return;
    }

    setLoading(true);

    try {
      const response = await register({
        fullName: cleanName,
        email: cleanEmail,
        password,
      });

      navigate("/verify-email", {
        state: { email: response.data.email },
      });
    } catch (err: unknown) {
      console.error("[RegisterError]:", err);
      setError(parseRegisterError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-y-auto bg-zinc-950 px-3 py-6 sm:px-6 lg:p-8">

      {/* Background avec overlay */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{ backgroundImage: "url('/images/image.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/75 to-black/50 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 my-auto flex w-full max-w-[1100px] min-h-fit lg:min-h-[720px] overflow-hidden rounded-lg border border-[#293040] bg-[#121316]/95 shadow-2xl backdrop-blur-md lg:backdrop-blur-2xl transition-all">

        {/* --- PANNEAU GAUCHE : Desktop uniquement (lg:flex) --- */}
        <div className="relative hidden w-1/2 flex-col justify-between p-12 text-white lg:flex">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#835500]/15 via-transparent to-black/60" />

          <BrandLogo
            to="/"
            onClick={(e) => handleNavClick(e, "/")}
            size="md"
            rounded="lg"
            variant="dark"
            priority
          />

          {/* Message d'accueil */}
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-white drop-shadow-md">
              Rejoignez l'univers <br />
              <span className="text-[#e59b22]">
                MarketElectro.
              </span>
            </h2>
            <p className="max-w-md text-base text-[#dce2f7]/80 leading-relaxed font-light">
              Créez votre compte en quelques secondes pour accéder à nos meilleures offres, suivre vos commandes et personnaliser votre expérience.
            </p>
          </div>

          <div className="text-xs text-[#dce2f7]/50 font-medium">
            © {new Date().getFullYear()} MarketElectro Inc. Tous droits réservés.
          </div>
        </div>

        {/* --- PANNEAU DROIT : Formulaire (Adaptatif) --- */}
        <div className="flex w-full flex-col justify-center p-5 sm:p-8 lg:w-1/2 lg:p-12 lg:border-l lg:border-[#293040]">
          <div className="mx-auto w-full max-w-md">

            {/* Header Mobile avec Logo */}
            <div className="mb-5 flex items-center justify-between lg:hidden">
              <BrandLogo
                to="/"
                onClick={(e) => handleNavClick(e, "/")}
                size="sm"
                rounded="md"
                variant="dark"
              />

              <Link
                to="/"
                className="text-xs font-semibold text-[#e59b22] hover:underline"
              >
                Accueil
              </Link>
            </div>

            {/* Header Mobile & Desktop */}
            <header className="mb-5 sm:mb-6 text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                Créer un compte
              </h1>
              <p className="mt-1.5 text-xs sm:text-sm text-[#dce2f7]/80 font-normal">
                Remplissez vos informations pour commencer.
              </p>
            </header>

            <form onSubmit={handleSubmit} noValidate className="space-y-3.5 sm:space-y-4">

              {/* NOM COMPLET */}
              <div className="group relative">
                <label
                  htmlFor="fullName"
                  className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#dce2f7] mb-1"
                >
                  Nom complet
                </label>
                <div className="relative flex items-center">
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jean Dupont"
                    autoComplete="name"
                    className="w-full border-b-2 border-white/20 bg-white/5 px-3 py-2 sm:py-2.5 pr-10 text-base text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:border-[#e59b22] focus:bg-white/10 rounded-t-[0.25rem]"
                  />
                  <User className="pointer-events-none absolute right-3 h-5 w-5 text-zinc-400 group-focus-within:text-[#e59b22] transition-colors" />
                </div>
              </div>

              {/* E-MAIL */}
              <div className="group relative">
                <label
                  htmlFor="email"
                  className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#dce2f7] mb-1"
                >
                  Adresse e-mail
                </label>
                <div className="relative flex items-center">
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nom@exemple.com"
                    autoComplete="email"
                    className="w-full border-b-2 border-white/20 bg-white/5 px-3 py-2 sm:py-2.5 pr-10 text-base text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:border-[#e59b22] focus:bg-white/10 rounded-t-[0.25rem]"
                  />
                  <Mail className="pointer-events-none absolute right-3 h-5 w-5 text-zinc-400 group-focus-within:text-[#e59b22] transition-colors" />
                </div>
              </div>

              {/* MOT DE PASSE */}
              <div className="group relative">
                <label
                  htmlFor="password"
                  className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#dce2f7] mb-1"
                >
                  Mot de passe
                </label>
                <div className="relative flex items-center">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="w-full border-b-2 border-white/20 bg-white/5 px-3 py-2 sm:py-2.5 pr-10 text-base text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:border-[#e59b22] focus:bg-white/10 rounded-t-[0.25rem]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 rounded-[0.25rem] p-1 text-zinc-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-[#e59b22] transition-colors"
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* CONFIRMATION MOT DE PASSE */}
              <div className="group relative">
                <label
                  htmlFor="confirmPassword"
                  className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#dce2f7] mb-1"
                >
                  Confirmer le mot de passe
                </label>
                <div className="relative flex items-center">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="w-full border-b-2 border-white/20 bg-white/5 px-3 py-2 sm:py-2.5 pr-10 text-base text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:border-[#e59b22] focus:bg-white/10 rounded-t-[0.25rem]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 rounded-[0.25rem] p-1 text-zinc-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-[#e59b22] transition-colors"
                    aria-label={
                      showConfirmPassword
                        ? "Masquer la confirmation du mot de passe"
                        : "Afficher la confirmation du mot de passe"
                    }
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* ACCEPTATION DES CONDITIONS */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  id="terms"
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded-[0.25rem] border-white/30 bg-white/10 text-[#e59b22] focus:ring-[#e59b22] focus:ring-offset-0 cursor-pointer accent-[#e59b22]"
                />
                <label
                  htmlFor="terms"
                  className="text-xs font-medium text-[#dce2f7]/80 cursor-pointer select-none leading-relaxed"
                >
                  J'accepte les{" "}
                  <Link
                    to="/terms"
                    className="font-semibold text-[#e59b22] transition-colors hover:text-[#ffb955] hover:underline"
                  >
                    Conditions
                  </Link>{" "}
                  et la{" "}
                  <Link
                    to="/privacy"
                    className="font-semibold text-[#e59b22] transition-colors hover:text-[#ffb955] hover:underline"
                  >
                    Confidentialité
                  </Link>
                  .
                </label>
              </div>

              {/* ERREUR */}
              {error && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="flex items-center gap-2 rounded-[0.25rem] border border-red-500/30 bg-red-500/15 p-3 text-xs font-medium text-red-200 backdrop-blur-md"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              {/* BOUTON D'ACTION */}
              <Button
                type="submit"
                disabled={loading}
                className="mt-2 flex h-11 sm:h-12 w-full items-center justify-center gap-2 rounded-[0.25rem] bg-[#e59b22] text-sm sm:text-base font-semibold text-white shadow-[0_4px_14px_0_rgba(229,155,34,0.35)] transition-all duration-200 hover:bg-[#d97706] hover:shadow-[0_6px_20px_0_rgba(229,155,34,0.45)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    <span>Création du compte...</span>
                  </>
                ) : (
                  "Créer mon compte"
                )}
              </Button>

              {/* SÉPARATEUR */}
              <div className="relative my-3 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#293040]" />
                </div>
                <span className="relative bg-[#121316] px-3 text-[11px] uppercase tracking-widest text-[#dce2f7]/50 font-semibold">
                  ou
                </span>
              </div>

              {/* GOOGLE LOGIN */}
              <div className="flex justify-center sm:w-115">
                <GoogleLoginButton text="signup_with" onError={setError} />
              </div>
            </form>

            {/* FOOTER */}
            <footer className="mt-5 text-center text-xs font-medium text-[#dce2f7]/80">
              <span>Vous avez déjà un compte ? </span>
              <Link
                to="/login"
                className="font-bold text-[#e59b22] transition-colors hover:text-[#ffb955] hover:underline focus:outline-none focus:ring-1 focus:ring-[#e59b22]"
              >
                Se connecter
              </Link>
            </footer>

          </div>
        </div>

      </div>
    </main>
  );
}