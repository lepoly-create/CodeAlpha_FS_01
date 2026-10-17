import {
  Award,
  CheckCircle2,
  Headphones,
  Lock,
  ShieldCheck,
  Truck,
} from "lucide-react";

const comparativePoints = [
  {
    icon: ShieldCheck,
    tag: "Authenticité 100% Garantie",
    title: "Matériel d'origine constructeur scellé",
    description:
      "Chaque appareil provient exclusivement des circuits de distribution officiels. Aucun produit reconditionné masqué ni contrefaçon : nous ne livrons que du matériel neuf sous emballage d'usine avec numéro de série traçable.",
  },
  {
    icon: Award,
    tag: "Sérénité Constructeur",
    title: "Garantie complète de 6 à 12 mois",
    description:
      "Tous nos ordinateurs, smartphones et accessoires bénéficient de la garantie constructeur intégrale. En cas de panne matérielle, nous prenons en charge la relation avec les centres techniques certifiés.",
  },
  {
    icon: CheckCircle2,
    tag: "Zéro Fausse Disponibilité",
    title: "Stocks réels synchronisés en direct",
    description:
      "Contrairement à de nombreuses plateformes qui vendent à flux tendu, notre catalogue est connecté à notre stock en temps réel. Si vous validez un produit, il vous est immédiatement réservé.",
  },
  {
    icon: Lock,
    tag: "Sécurité Bancaire Maximale",
    title: "Transactions et sessions chiffrées",
    description:
      "Toutes les transactions sont protégées par les protocoles de chiffrement SSL/TLS 256 bits et une architecture JWT avec révocation immédiate. Vos données personnelles restent strictement confidentielles.",
  },
  {
    icon: Truck,
    tag: "Logistique Sécurisée",
    title: "Expédition soignée sous 24h à 48h",
    description:
      "Chaque commande fait l'objet d'un contrôle rigoureux avant emballage renforcé anti-chocs. Vous suivez chaque étape de l'acheminement en temps réel directement sur votre tableau de bord client.",
  },
  {
    icon: Headphones,
    tag: "Accompagnement Dédié",
    title: "Support technique réactif sous 24h",
    description:
      "Une question sur la compatibilité d'un accessoire ou le suivi de votre colis ? Notre service client interne vous répond par message direct ou email sous 24h ouvrées.",
  },
];

const keyMetrics = [
  { label: "Matériel certifié", value: "100% Neuf" },
  { label: "Garantie matérielle", value: "6 à 12 mois" },
  { label: "Préparation de commande", value: "< 24h ouvrées" },
  { label: "Délai de réponse support", value: "< 24h garanties" },
];

export default function WhyMarketElectroSection() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-[#121316] py-16 sm:py-20 lg:py-24 text-white border-b border-[#22252a]">
      {/* Halos lumineux ambrés subtils en arrière-plan */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#e59b22]/10 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-32 right-10 h-80 w-80 rounded-full bg-[#e59b22]/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Entête de section */}
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-2 rounded border-0 border-[#835500]/30 bg-[#ffddb5]/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#ffb955]">
            Pourquoi choisir MarketElectro ?
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            La rigueur et l'authenticité qui font la différence.
          </h2>

          <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed">
            Sur un marché saturé de produits reconditionnés sans traçabilité et de délais incertains, MarketElectro s'engage sur des critères vérifiables pour sécuriser chacun de vos investissements technologiques.
          </p>
        </div>

        {/* Grille responsive des 6 atouts majeurs */}
        <div className="mt-10 sm:mt-12 grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {comparativePoints.map((point) => {
            const Icon = point.icon;

            return (
              <article
                key={point.title}
                className="group relative flex flex-col justify-between rounded border-0 border-[#22252a] bg-[#16171a] p-6 sm:p-7 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-[0.25rem] border-0 border-[#835500]/30 bg-[#ffddb5]/10 text-[#e59b22]">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#ffb955]/90 border-0 border-[#835500]/30 px-2.5 py-0.5 rounded-full bg-[#835500]/10">
                      {point.tag}
                    </span>
                  </div>

                  <h3 className="mt-5 text-base sm:text-lg font-bold text-white transition-colors duration-200 group-hover:text-[#ffb955]">
                    {point.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#9ca3af]">
                    {point.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bandeau d'engagements chiffrés (Indicateurs clés) */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 gap-4 rounded-lg border border-[#293040] bg-[#16171a]/90 p-5 sm:p-6 backdrop-blur-xs md:grid-cols-4">
          {keyMetrics.map((metric) => (
            <div key={metric.label} className="text-center sm:text-left border-[#e59b22] pl-3 sm:pl-4">
              <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {metric.value}
              </span>
              <p className="mt-1 text-xs font-medium text-[#9ca3af]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}