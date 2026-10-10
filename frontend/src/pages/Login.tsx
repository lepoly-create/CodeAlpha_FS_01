import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
  MonitorSmartphone,
} from "lucide-react";
import axios from "axios";

import { useAuth } from "@/contexts/useAuth";
import { Button } from "@/components/ui/button";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";

// Helper pour extraire proprement les messages d'erreur API
const parseAuthError = (error: unknown): string => {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return (
      error.response?.data?.message ||
      "Une erreur serveur est survenue. Veuillez réessayer."
    );
  }
  if (error instanceof Error) return error.message;
  return "Email ou mot de passe incorrect.";
};

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // États du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;

    setError("");
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    try {
      const user = await login(cleanEmail, password);

      // Si "Se souvenir de moi" est coché, vous pouvez gérer un token local persistant ici si besoin
      if (rememberMe) {
        localStorage.setItem("remember_email", cleanEmail);
      } else {
        localStorage.removeItem("remember_email");
      }

      // Redirection selon le rôle
      const targetPath = user?.role === "admin" ? "/admin" : "/dashboard";
      navigate(targetPath, { replace: true });
    } catch (err) {
      console.error("[LoginError]:", err);
      setError(parseAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-zinc-950 px-4 py-6 sm:px-6 lg:p-8">
      {/* 1. Image de fond principale avec superposition sombre */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{ backgroundImage: "url('/images/image.png')" }}
      >
        {/* Overlay sombre dégradé pour garantir un contraste parfait (A11y) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/60 to-black/40 backdrop-blur-[2px]" />
      </div>

      {/* 2. Container principal (Split-screen sur Desktop, Carte centrale sur Mobile) */}
      <div className="relative z-10 flex w-full max-w-[1100px] min-h-[640px] overflow-hidden rounded-3xl border border-white/15 bg-black/40 shadow-2xl backdrop-blur-2xl transition-all">
        
        {/* --- PANNEAU GAUCHE : Branding & Ambiance (Masqué sur mobile, visible dès lg:) --- */}
        <div className="relative hidden w-1/2 flex-col justify-between p-12 text-white lg:flex">
          {/* Subtle gradient overlay interne */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cyan-500/10 via-transparent to-black/60" />
          <Link
            to="/"
            onClick={(e) => handleNavClick(e, "/")}
                      className="group flex items-center gap-3"

            aria-label="MarketElectro - Accueil"
            >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl  bg-cyan-500/20 border border-cyan-400/30 text-cyan-400 backdrop-blur-md">
              <MonitorSmartphone className="h-5 w-5 transition-transform duration-300 group-hover:rotate-6" />
            </div>
            <span className="text-xl font-bold tracking-wider uppercase text-white">
              Market
              <span className="bg-gradient-to-r from-cyan-400 to-teal-200 bg-clip-text text-transparent">
                Electro
              </span>
            </span>
          </Link>

          {/* Message de bienvenue inspirant */}
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-white drop-shadow-md">
              Propulsez votre expérience <br />
              <span className="bg-gradient-to-r from-cyan-400 to-teal-200 bg-clip-text text-transparent">
                e-commerce.
              </span>
            </h2>
            <p className="max-w-md text-base text-zinc-300 leading-relaxed font-light">
              Connectez-vous pour gérer vos commandes, découvrir nos nouveautés high-tech et profiter d'offres exclusives.
            </p>
          </div>

          {/* Footer Branding */}
          <div className="text-xs text-zinc-400 font-medium">
            © {new Date().getFullYear()} MarketElectro Inc. Tous droits réservés.
          </div>
        </div>

        {/* --- PANNEAU DROIT : Formulaire de Connexion --- */}
        <div className="flex w-full flex-col justify-center p-6 sm:p-10 lg:w-1/2 lg:p-12 lg:border-l lg:border-white/10">
          <div className="mx-auto w-full max-w-md">
            
            {/* Header du formulaire */}
            <header className="mb-8 text-left">
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Bienvenue !
              </h1>
              <p className="mt-2 text-sm text-zinc-300 font-normal">
                Veuillez saisir vos identifiants pour continuer.
              </p>
            </header>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              
              {/* CHAMP EMAIL */}
              <div className="group relative">
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5"
                >
                  E-mail
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
                    className="w-full border-b-2 border-white/30 bg-white/5 px-3 py-3 pr-10 text-base text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:border-cyan-400 focus:bg-white/10 focus:ring-0 rounded-t-lg"
                  />
                  <Mail className="pointer-events-none absolute right-3 h-5 w-5 text-zinc-400 group-focus-within:text-cyan-400 transition-colors" />
                </div>
              </div>

              {/* CHAMP MOT DE PASSE */}
              <div className="group relative">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5"
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
                    autoComplete="current-password"
                    className="w-full border-b-2 border-white/30 bg-white/5 px-3 py-3 pr-10 text-base text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:border-cyan-400 focus:bg-white/10 focus:ring-0 rounded-t-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 rounded-md p-1 text-zinc-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* OPTIONS : Remember Me + Forgot Password */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-white/30 bg-white/10 text-cyan-500 focus:ring-cyan-400 focus:ring-offset-0 cursor-pointer accent-cyan-500"
                  />
                  <span className="text-xs font-medium text-zinc-300 hover:text-white transition-colors">
                    Se souvenir de moi
                  </span>
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-cyan-400 transition-colors hover:text-cyan-300 hover:underline focus:outline-none focus:ring-1 focus:ring-cyan-400"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              {/* MESSAGE D'ERREUR */}
              {error && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/15 p-3.5 text-xs font-medium text-red-200 backdrop-blur-md"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              {/* BOUTON SE CONNECTER */}
              <Button
                type="submit"
                disabled={loading}
                className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 text-base font-bold text-black transition-all duration-200 hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin text-black" />
                    <span>Connexion...</span>
                  </>
                ) : (
                  "Se connecter"
                )}
              </Button>

              {/* SÉPARATEUR OU */}
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <span className="relative bg-transparent px-3 text-xs uppercase tracking-widest text-zinc-400 font-semibold">
                  ou
                </span>
              </div>

              {/* GOOGLE SSO */}
              <div className="flex justify-center">
                <GoogleLoginButton text="continue_with" onError={setError} />
              </div>
            </form>

            {/* FOOTER : Créer un compte */}
            <footer className="mt-8 text-center text-xs font-medium text-zinc-300">
              <span>Vous n'avez pas de compte ? </span>
              <Link
                to="/register"
                className="font-bold text-cyan-400 transition-colors hover:text-cyan-300 hover:underline focus:outline-none focus:ring-1 focus:ring-cyan-400"
              >
                Inscrivez-vous ici
              </Link>
            </footer>

          </div>
        </div>

      </div>
    </main>
  );
}