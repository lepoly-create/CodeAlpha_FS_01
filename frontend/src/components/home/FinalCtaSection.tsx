import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function FinalCtaSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 border-b border-[#e5e7eb]">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-lg bg-gradient-to-b from-[#22252a] to-[#16171a] px-6 py-14 text-center text-white shadow-xl sm:px-12 sm:py-16 border border-[#293040]">

        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded border-0 border-[#835500]/40 bg-[#835500]/20 px-3.5 py-1 text-xs font-semibold text-[#ffb955]">
            Rejoignez la communauté MarketElectro
          </span>

          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-extrabold tracking-[-0.015em] text-white sm:text-4xl lg:text-5xl">
            Prêt à commander votre prochain équipement ?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#dce2f7]/80 sm:text-base">
            Inscrivez-vous gratuitement dès maintenant pour profiter du suivi de commande en direct et d'offres exclusives.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3.5 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-[0.25rem] bg-[#e59b22] px-7 text-sm font-semibold text-white shadow-[0_4px_14px_0_rgba(229,155,34,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#d97706] hover:shadow-[0_6px_20px_0_rgba(229,155,34,0.45)] active:scale-[0.98]"
            >
              <span>Créer mon compte client</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/products"
              className="inline-flex h-11 items-center justify-center rounded-[0.25rem] border border-[#293040] bg-[#1a1c20] px-7 text-sm font-semibold text-white shadow-xs transition-all duration-200 hover:border-[#e59b22] hover:bg-[#22252a] active:scale-[0.98]"
            >
              Explorer les produits
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}