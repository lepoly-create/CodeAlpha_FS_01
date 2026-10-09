import { ArrowRight, ShieldCheck, Star, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/image.png";

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-indigo-50/60 via-slate-50/30 to-white py-16 sm:py-24 lg:py-28">
      {/* Effets lumineux d'arrière-plan */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-200/40 via-violet-200/30 to-blue-200/20 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        
        {/* Contenu Texte */}
        <div className="lg:col-span-7">

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-6xl lg:leading-[1.12]">
            L'excellence tech. <br />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-800 bg-clip-text text-transparent">
              Conçue pour votre quotidien.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Accédez à une sélection exclusive d'équipements électroniques, ordinateurs, audio et smartphones certifiés avec garantie constructeur et livraison rapide.
          </p>

          <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
            <Link
              to="/products"
              className="group inline-flex h-13 items-center justify-center gap-3 rounded-2xl bg-slate-900 px-8 text-sm font-semibold text-white shadow-xl shadow-slate-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-indigo-500/25 active:scale-[0.98]"
            >
              <span>Découvrir le catalogue</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              to="/register"
              className="inline-flex h-13 items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-300 hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-600 active:scale-[0.98]"
            >
              Créer un compte client
            </Link>
          </div>

          {/* Badges de Réassurance */}
          <div className="mt-12 grid grid-cols-2 gap-4 border-0 border-slate-200/80 pt-8 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100/80 text-indigo-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Produits Garantis</p>
                <p className="text-[11px] text-slate-500">100% Authentiques</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100/80 text-emerald-600">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Livraison Express</p>
                <p className="text-[11px] text-slate-500">Suivi en temps réel</p>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100/80 text-amber-600">
                <Star className="h-5 w-5 fill-amber-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">4.9/5 Satisfaits</p>
                <p className="text-[11px] text-slate-500">+12 000 clients</p>
              </div>
            </div>
          </div>
        </div>

        {/* Visuel Hero dynamique avec carte flottante */}
        <div className="relative lg:col-span-5">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Aura sous l'image */}
            <div className="absolute -inset-1.5 rounded-[2.5rem] bg-gradient-to-r from-indigo-500 to-violet-500 opacity-20 blur-xl transition duration-500 hover:opacity-30" />
            
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xl">
              <img
                src={heroImage}
                alt="Sélection d'équipements technologiques de pointe"
                className="h-[380px] w-full object-cover sm:h-[460px] transition-transform duration-700 hover:scale-105"
              />
                          
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}