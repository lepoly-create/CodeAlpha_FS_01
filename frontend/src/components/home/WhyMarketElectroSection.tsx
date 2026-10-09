import {
  CheckCircle2,
  Headphones,
  ShieldCheck,
  Truck,
} from "lucide-react";

const advantages = [
  {
    icon: ShieldCheck,
    title: "Une expérience pensée pour la confiance",
    description:
      "Les informations essentielles sont présentées clairement pour faciliter chaque décision.",
  },
  {
    icon: Truck,
    title: "Un parcours de commande simple",
    description:
      "De la découverte du produit jusqu'au suivi de votre commande, les étapes sont structurées.",
  },
  {
    icon: Headphones,
    title: "Une expérience orientée client",
    description:
      "MarketElectro place la simplicité et la compréhension du parcours au centre de l'expérience.",
  },
  {
    icon: CheckCircle2,
    title: "Une boutique évolutive",
    description:
      "Le catalogue, les comptes clients et les commandes sont conçus pour évoluer avec la plateforme.",
  },
];

export default function WhyMarketElectroSection() {
  return (
    <section className="relative overflow-hidden bg-neutral-950 py-20 text-white">
      {/* Halos lumineux discrets en arrière-plan */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Entête de section */}
        <div className="max-w-2xl space-y-3">
          <span className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400">
            Pourquoi MarketElectro ?
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Une expérience conçue autour de vos besoins.
          </h2>

          <p className="text-sm sm:text-base text-neutral-400">
            Des garanties concrètes pour vous accompagner en toute sérénité à chaque étape.
          </p>
        </div>

        {/* Grille style Bento avec bordures fines et effets au survol */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-800/80 shadow-2xl sm:grid-cols-2 xl:grid-cols-4">
          {advantages.map((advantage) => {
            const Icon = advantage.icon;

            return (
              <article
                key={advantage.title}
                className="group relative bg-neutral-950 p-7 sm:p-8 transition-colors duration-300"
              >
                {/* Icône dans un conteneur style badge */}
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400 transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-500/20">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-6 text-base font-semibold text-white transition-colors duration-200 group-hover:text-blue-300">
                  {advantage.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-neutral-400">
                  {advantage.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}