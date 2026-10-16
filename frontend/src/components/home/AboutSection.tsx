import { CheckCircle2, ShieldAlert, ShoppingBag, UserCheck } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="relative border-b border-[#22252a] bg-[#121316] py-16 sm:py-20 text-[#edf0ff]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">

          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#835500]/40 bg-[#835500]/15 px-3.5 py-1 text-xs font-semibold text-[#ffb955]">
              Plateforme Nouvelle Génération
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Une expérience d'achat repensée de A à Z.
            </h2>

            <p className="mt-6 text-base leading-relaxed text-[#dce2f7]/80">
              MarketElectro combine technologie moderne, simplicité de navigation et sécurité absolue pour vous offrir le meilleur de l'électronique grand public.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#e59b22]" />
                <p className="text-sm text-[#dce2f7]"><strong className="text-white">Transparence totale :</strong> Tarifs clairs, aucun frais caché au panier.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#e59b22]" />
                <p className="text-sm text-[#dce2f7]"><strong className="text-white">Support Réactif :</strong> Notre équipe vous accompagne 6j/7 dans vos choix.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">

            <div className="group rounded-lg border border-[#293040] bg-[#1a1c20] p-6 transition-all duration-300 hover:border-[#e59b22]/50 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5)]">
              <div className="flex h-11 w-11 items-center justify-center rounded-[0.25rem] bg-[#22252a] text-[#e59b22] border border-[#293040] transition-colors group-hover:bg-[#e59b22] group-hover:text-white">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">Catalogue Sélectionné</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#dce2f7]/70">
                Seuls les produits répondant à nos critères stricts de fiabilité et de performance sont intégrés.
              </p>
            </div>

            <div className="group rounded-lg border border-[#293040] bg-[#1a1c20] p-6 transition-all duration-300 hover:border-[#e59b22]/50 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5)]">
              <div className="flex h-11 w-11 items-center justify-center rounded-[0.25rem] bg-[#22252a] text-[#8aa7ff] border border-[#293040] transition-colors group-hover:bg-[#0053db] group-hover:text-white">
                <UserCheck className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">Espace Client Dédié</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#dce2f7]/70">
                Suivez la livraison de vos commandes en direct et gérez vos préférences en quelques clics.
              </p>
            </div>

            <div className="group sm:col-span-2 rounded-lg border border-[#293040] bg-[#1a1c20] p-6 transition-all duration-300 hover:border-[#e59b22]/50">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.25rem] bg-[#22252a] text-emerald-400 border border-[#293040]">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Paiement Sécurisé & Fiabilité</h3>
                  <p className="mt-1 text-xs text-[#dce2f7]/70">
                    Protocoles de vérification et transactions sans risque avec contrôle strict des stocks.
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