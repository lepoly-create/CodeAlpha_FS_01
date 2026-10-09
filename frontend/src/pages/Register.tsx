import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
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

      navigate(
        `/verify-email?email=${encodeURIComponent(response.data.email)}`
      );
    } catch (err: unknown) {
      console.error("[RegisterError]:", err);
      setError(parseRegisterError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    /* OPTIMISATION MOBILE : 
       - overflow-y-auto : permet de scroller sur petit écran si le clavier s'ouvre.
       - py-8 : laisse de la marge en haut et en bas sur mobile.
    */
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-y-auto bg-zinc-950 px-3 py-6 sm:px-6 lg:p-8">
      
      {/* Background avec overlay */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{ backgroundImage: "url('/images/image.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/75 to-black/50 backdrop-blur-[2px]" />
      </div>

      {/* 
        CONTAINER CARTE :
        - my-auto : centre la carte verticalement s'il y a de la place.
        - min-h-fit lg:min-h-[720px] : s'adapte au contenu sur mobile sans tout écraser.
      */}
      <div className="relative z-10 my-auto flex w-full max-w-[1100px] min-h-fit lg:min-h-[720px] overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-black/50 shadow-2xl backdrop-blur-md lg:backdrop-blur-2xl transition-all">
        
        {/* --- PANNEAU GAUCHE : Desktop uniquement (lg:flex) --- */}
        <div className="relative hidden w-1/2 flex-col justify-between p-12 text-white lg:flex">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cyan-500/10 via-transparent to-black/60" />

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 border border-cyan-400/30 text-cyan-400 backdrop-blur-md">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-wider uppercase text-white">
              MarketElectro
            </span>
          </div>

          {/* Message d'accueil */}
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-white drop-shadow-md">
              Rejoignez l'univers <br />
              <span className="bg-gradient-to-r from-cyan-400 to-teal-200 bg-clip-text text-transparent">
                MarketElectro.
              </span>
            </h2>
            <p className="max-w-md text-base text-zinc-300 leading-relaxed font-light">
              Créez votre compte en quelques secondes pour accéder à nos meilleures offres, suivre vos commandes et personnaliser votre expérience.
            </p>
          </div>

          <div className="text-xs text-zinc-400 font-medium">
            © {new Date().getFullYear()} MarketElectro Inc. Tous droits réservés.
          </div>
        </div>

        {/* --- PANNEAU DROIT : Formulaire (Adaptatif) --- */}
        <div className="flex w-full flex-col justify-center p-5 sm:p-8 lg:w-1/2 lg:p-12 lg:border-l lg:border-white/10">
          <div className="mx-auto w-full max-w-md">
            
            {/* Header Mobile & Desktop */}
            <header className="mb-5 sm:mb-6 text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                Créer un compte
              </h1>
              <p className="mt-1.5 text-xs sm:text-sm text-zinc-300 font-normal">
                Remplissez vos informations pour commencer.
              </p>
            </header>

            <form onSubmit={handleSubmit} noValidate className="space-y-3.5 sm:space-y-4">
              
              {/* NOM COMPLET */}
              <div className="group relative">
                <label
                  htmlFor="fullName"
                  className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1"
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
                    className="w-full border-b-2 border-white/30 bg-white/5 px-3 py-2 sm:py-2.5 pr-10 text-base text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:border-cyan-400 focus:bg-white/10 rounded-t-lg"
                  />
                  <User className="pointer-events-none absolute right-3 h-5 w-5 text-zinc-400 group-focus-within:text-cyan-400 transition-colors" />
                </div>
              </div>

              {/* E-MAIL */}
              <div className="group relative">
                <label
                  htmlFor="email"
                  className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1"
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
                    className="w-full border-b-2 border-white/30 bg-white/5 px-3 py-2 sm:py-2.5 pr-10 text-base text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:border-cyan-400 focus:bg-white/10 rounded-t-lg"
                  />
                  <Mail className="pointer-events-none absolute right-3 h-5 w-5 text-zinc-400 group-focus-within:text-cyan-400 transition-colors" />
                </div>
              </div>

              {/* MOT DE PASSE */}
              <div className="group relative">
                <label
                  htmlFor="password"
                  className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1"
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
                    className="w-full border-b-2 border-white/30 bg-white/5 px-3 py-2 sm:py-2.5 pr-10 text-base text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:border-cyan-400 focus:bg-white/10 rounded-t-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 rounded-md p-1 text-zinc-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
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
                  className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1"
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
                    className="w-full border-b-2 border-white/30 bg-white/5 px-3 py-2 sm:py-2.5 pr-10 text-base text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:border-cyan-400 focus:bg-white/10 rounded-t-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 rounded-md p-1 text-zinc-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
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
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/30 bg-white/10 text-cyan-500 focus:ring-cyan-400 focus:ring-offset-0 cursor-pointer accent-cyan-500"
                />
                <label
                  htmlFor="terms"
                  className="text-xs font-medium text-zinc-300 cursor-pointer select-none leading-relaxed"
                >
                  J'accepte les{" "}
                  <Link
                    to="/terms"
                    className="font-semibold text-cyan-400 transition-colors hover:text-cyan-300 hover:underline"
                  >
                    Conditions
                  </Link>{" "}
                  et la{" "}
                  <Link
                    to="/privacy"
                    className="font-semibold text-cyan-400 transition-colors hover:text-cyan-300 hover:underline"
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
                  className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/15 p-3 text-xs font-medium text-red-200 backdrop-blur-md"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              {/* BOUTON D'ACTION */}
              <Button
                type="submit"
                disabled={loading}
                className="mt-2 flex h-11 sm:h-12 w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 text-sm sm:text-base font-bold text-black transition-all duration-200 hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin text-black" />
                    <span>Création du compte...</span>
                  </>
                ) : (
                  "Créer mon compte"
                )}
              </Button>

              {/* SÉPARATEUR */}
              <div className="relative my-3 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <span className="relative bg-transparent px-3 text-[11px] uppercase tracking-widest text-zinc-400 font-semibold">
                  ou
                </span>
              </div>

              {/* GOOGLE LOGIN */}
              <div className="flex justify-center">
                <GoogleLoginButton text="signup_with" onError={setError} />
              </div>
            </form>

            {/* FOOTER */}
            <footer className="mt-5 text-center text-xs font-medium text-zinc-300">
              <span>Vous avez déjà un compte ? </span>
              <Link
                to="/login"
                className="font-bold text-cyan-400 transition-colors hover:text-cyan-300 hover:underline focus:outline-none focus:ring-1 focus:ring-cyan-400"
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