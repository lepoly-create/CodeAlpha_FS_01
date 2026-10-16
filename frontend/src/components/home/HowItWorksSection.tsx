import {
  CreditCard,
  PackageCheck,
  Search,
  UserCheck,
} from "lucide-react";

const steps = [
  {
    number: "01",
    badge: "Consultation Libre",
    title: "Explorez le catalogue en accès direct",
    description:
      "Parcourez notre gamme d'équipements technologiques sans aucune obligation d'inscription préalable. Consultez les fiches techniques complètes, les avis clients et la disponibilité réelle des stocks.",
    tip: "Filtres par catégories & recherche instantanée",
    icon: Search,
    iconColor: "text-[#e59b22]",
    bgColor: "bg-[#ffddb5]/20 border-0 border-[#835500]/20",
  },
  {
    number: "02",
    badge: "Accès Instantané",
    title: "Créez votre compte en 1 clic",
    description:
      "Activez votre espace client en 30 secondes par email ou via Google en un clic. Votre profil sécurisé sauvegarde automatiquement votre panier et vos articles favoris sur l'ensemble de vos appareils.",
    tip: "Connexion Google en 1 clic & sécurité renforcée",
    icon: UserCheck,
    iconColor: "text-[#0053db]",
    bgColor: "bg-[#e9edff] border-0 border-[#0053db]/20",
  },
  {
    number: "03",
    badge: "Commande Sécurisée",
    title: "Validez votre panier & vos coordonnées",
    description:
      "Vérifiez vos articles, ajustez les quantités souhaitées et renseignez vos informations de livraison. Le tunnel de commande transparent affiche le détail exact des coûts, sans frais cachés.",
    tip: "Calcul précis & validation en toute transparence",
    icon: CreditCard,
    iconColor: "text-[#835500]",
    bgColor: "bg-[#ffddb5]/30 border-0 border-[#835500]/30",
  },
  {
    number: "04",
    badge: "Suivi & Garantie",
    title: "Suivez votre commande en direct",
    description:
      "Votre commande est prise en charge sous 24h ouvrées. Accédez à votre tableau de bord client pour suivre son statut en temps réel (En attente, Confirmée, Expédiée) et gérer vos garanties.",
    tip: "Suivi en direct depuis votre espace client",
    icon: PackageCheck,
    iconColor: "text-emerald-700",
    bgColor: "bg-emerald-50 border-0 border-emerald-200",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-[#f9f9ff] py-16 sm:py-20 lg:py-24 border-b border-[#e5e7eb]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded border-0 border-[#835500]/20 bg-[#ffddb5]/50 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.08em] text-[#835500]">
            Guide d'utilisation & Commande
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#141b2b]">
            Comment commander et utiliser MarketElectro ?
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-[#524535]">
            Que vous soyez visiteur curieux ou acheteur régulier, notre plateforme a été conçue pour offrir un parcours d'achat limpide, sécurisé et sans friction en 4 étapes simples.
          </p>
        </div>

        {/* Grille des 4 étapes */}
        <div className="mt-12 sm:mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative flex flex-col justify-between rounded-lg border-0 border-[#e5e7eb] bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#e59b22]/50 hover:shadow-md"
              >
                <div>
                  {/* Ligne d'en-tête de la carte */}
                  <div className="flex items-center justify-between">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-[0.25rem] ${step.bgColor}`}>
                      <Icon className={`h-5 w-5 ${step.iconColor}`} />
                    </div>

                    <span className="text-3xl font-black text-[#dce2f7] select-none">
                      {step.number}
                    </span>
                  </div>

                  <span className="mt-4 inline-block text-[10px] font-bold uppercase tracking-wider text-[#835500] bg-[#f1f3ff] px-2.5 py-0.5 rounded-full border-0 border-[#e5e7eb]">
                    {step.badge}
                  </span>

                  <h3 className="mt-2 text-base font-bold text-[#141b2b] leading-snug">
                    {step.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#524535]">
                    {step.description}
                  </p>
                </div>

                {/* Info-bulle récapitulative au bas de chaque étape */}
                <div className="mt-5 border-t border-[#f1f3ff] pt-3">
                  <p className="text-[11px] font-semibold text-[#141b2b] flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#e59b22] shrink-0" />
                    {step.tip}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}