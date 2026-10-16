import { ArrowRight, ShieldCheck, Star, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/image.png";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#f9f9ff] py-14 sm:py-20 lg:py-28 border-b border-[#e5e7eb]"
    >
      {/* 1. LAYER IMAGE PLEIN ÉCRAN FULL-BLEED */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden">
        <img
          src={heroImage}
          alt="Sélection d'équipements technologiques de pointe"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[75%_center] sm:object-right lg:object-[82%_center] opacity-90 transition-transform duration-1000 ease-out hover:scale-105"
        />

        {/* 2. MASQUES DE DÉGRADÉ MULTI-ÉCRANS (Lisibilité 100% garantie selon Emetix) */}
        {/* Mobile / Petite tablette (< 1024px) : Dégradé vertical protecteur */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f9f9ff] via-[#f9f9ff]/95 via-60% to-[#f9f9ff]/70 lg:hidden" />

        {/* Desktop (1024px+) : Dégradé horizontal gauche -> droite pour laisser respirer le hardware */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#f9f9ff] via-[#f9f9ff] via-50% to-[#f9f9ff]/10" />

        {/* Voile ambré subtil pour ambiance tech */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(229,155,34,0.08),transparent_55%)]" />
      </div>

      {/* 3. CONTENU TEXTE & ACTIONS (Au-dessus avec z-10) */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl lg:max-w-3xl">

          {/* Badge Label */}
          <div className="inline-flex items-center gap-2 rounded  border-[#835500]/25 bg-[#ffddb5]/60 px-3.5 py-1 text-xs font-semibold text-[#835500] backdrop-blur-xs">
            HIGH-PERFORMANCE TECH RETAIL
          </div>

          {/* Titre Principal Headline-XL */}
          <h1 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-[#141b2b] sm:text-5xl lg:text-6xl lg:leading-[1.12]">
            L'excellence tech. <br />
            <span className="text-[#835500]">
              Conçue pour votre quotidien.
            </span>
          </h1>

          {/* Description Body-LG */}
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#524535] sm:text-base lg:text-lg">
            Accédez à une sélection exclusive d'équipements électroniques, ordinateurs, audio et smartphones certifiés avec garantie constructeur et livraison express.
          </p>

          {/* Boutons d'Action Responsives (w-full sm:w-auto, min-h 48px pour mobile) */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/products"
              className="group inline-flex min-h-[48px] w-full items-center justify-center gap-3 rounded-[0.25rem] bg-[#e59b22] px-7 text-sm font-semibold text-white shadow-[0_4px_14px_0_rgba(229,155,34,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#d97706] hover:shadow-[0_6px_20px_0_rgba(229,155,34,0.45)] active:scale-[0.98] sm:w-auto"
            >
              <span>Découvrir le catalogue</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <Link
              to="/register"
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-[0.25rem] border border-[#e5e7eb] bg-white/90 backdrop-blur-xs px-7 text-sm font-semibold text-[#141b2b] shadow-xs transition-all duration-200 hover:border-[#e59b22] hover:bg-[#f1f3ff] active:scale-[0.98] sm:w-auto"
            >
              Créer un compte client
            </Link>
          </div>

          {/* Badges de Réassurance Responsive */}
          <div className="mt-10 grid grid-cols-1 gap-3.5 border-t border-[#e5e7eb]/80 pt-6 sm:grid-cols-3 sm:gap-4 sm:pt-8">
            <div className="flex items-center gap-3 rounded-lg border border-[#e5e7eb]/60 bg-white/70 p-2.5 backdrop-blur-xs sm:border sm:bg-transparent sm:p-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.25rem] bg-[#e9edff] text-[#0053db]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#141b2b]">Produits Garantis</p>
                <p className="truncate text-[11px] text-[#524535]">100% Authentiques</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-[#e5e7eb]/60 bg-white/70 p-2.5 backdrop-blur-xs sm:border sm:bg-transparent sm:p-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.25rem] bg-emerald-50 text-emerald-700">
                <Truck className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#141b2b]">Livraison Express</p>
                <p className="truncate text-[11px] text-[#524535]">Suivi en temps réel</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-[#e5e7eb]/60 bg-white/70 p-2.5 backdrop-blur-xs sm:border sm:bg-transparent sm:p-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.25rem] bg-[#ffddb5]/60 text-[#835500]">
                <Star className="h-5 w-5 fill-[#e59b22] text-[#e59b22]" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#141b2b]">4.9/5 Satisfaits</p>
                <p className="truncate text-[11px] text-[#524535]">+12 000 avis clients</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}