import { ArrowRight} from "lucide-react";
import { Link } from "react-router-dom";

export default function FinalCtaSection() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 px-6 py-16 text-center text-white shadow-2xl sm:px-12 sm:py-20">
        
        {/* Glow ambient */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/15 blur-3xl" />

        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300">
            Rejoignez la communauté MarketElectro
          </span>

          <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Prêt à commander votre prochain équipement ?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Inscrivez-vous gratuitement dès maintenant pour profiter du suivi de commande en direct et d'offres exclusives.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 px-8 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-indigo-500/40 active:scale-[0.98]"
            >
              <span>Créer mon compte client</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/products"
              className="inline-flex h-13 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-8 text-sm font-bold text-white shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-white/20 active:scale-[0.98]"
            >
              Explorer les produits
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}