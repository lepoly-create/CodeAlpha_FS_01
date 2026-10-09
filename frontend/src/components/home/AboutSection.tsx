import { CheckCircle2, ShieldAlert, ShoppingBag, UserCheck} from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="relative border-y border-slate-200/80 bg-gradient-to-b from-slate-900 to-slate-950 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400">
              Plateforme Nouvelle Génération
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Une expérience d'achat repensée de A à Z.
            </h2>

            <p className="mt-6 text-base leading-relaxed text-slate-300">
              MarketElectro combine technologie moderne, simplicité de navigation et sécurité absolue pour vous offrir le meilleur de l'électronique grand public.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                <p className="text-sm text-slate-300"><strong className="text-white">Transparence totale :</strong> Tarifs clairs, aucun frais caché au panier.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                <p className="text-sm text-slate-300"><strong className="text-white">Support Réactif :</strong> Notre équipe vous accompagne 6j/7 dans vos choix.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/50  hover:shadow-xl hover:shadow-indigo-500/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600/20 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">Catalogue Sélectionné</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Seuls les produits répondant à nos critères stricts de fiabilité et de performance sont intégrés.
              </p>
            </div>

            <div className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-violet-500/50  hover:shadow-xl hover:shadow-violet-500/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600/20 text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                <UserCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">Espace Client Dédié</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Suivez la livraison de vos colis en temps réel et accédez à vos factures en un clic.
              </p>
            </div>

            <div className="group sm:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/50">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600/20 text-emerald-400">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Paiement 100% Sécurisé</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Protocoles de chiffrement SSL/TLS bancaires de pointe pour des transactions sans risque.
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