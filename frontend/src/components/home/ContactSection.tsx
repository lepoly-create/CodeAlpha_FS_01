import {
  ArrowRight,
  HelpCircle,
  Mail,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="border-0 border-slate-200/80 bg-slate-50/50 py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Texte d'introduction */}
          <div>
            <span className="inline-flex items-center rounded-full border border-indigo-200/80 bg-indigo-50 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-indigo-600">
              Contact & Support
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Une question avant de commander ?
            </h2>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
              Nous voulons rendre votre expérience aussi simple que possible.
              Pour les questions liées à votre compte, vos commandes ou votre
              parcours d'achat, votre espace client constitue le point
              d'entrée naturel.
            </p>

            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
              <Link
                to="/login"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-900 px-7 text-sm font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-indigo-500/25 active:scale-[0.98]"
              >
                Accéder à mon espace
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/register"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-7 text-sm font-bold text-slate-800 shadow-sm transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-600 active:scale-[0.98]"
              >
                Créer un compte
              </Link>
            </div>
          </div>

          {/* Cartes d'aide & informations */}
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="group rounded-2xl border-0 border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Questions générales
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    Informations sur MarketElectro et son catalogue.
                  </p>
                </div>
              </div>
            </div>

            <div className="group rounded-2xl border-0 border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-500/5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 transition-colors group-hover:bg-violet-600 group-hover:text-white">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Commandes & Suivi
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    Retrouvez vos commandes directement depuis votre espace client.
                  </p>
                </div>
              </div>
            </div>

            <div className="group rounded-2xl border-0 border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition-colors group-hover:bg-slate-900 group-hover:text-white">
                  <HelpCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Besoin d'aide ?
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    Connectez-vous pour accéder aux fonctionnalités réservées.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}