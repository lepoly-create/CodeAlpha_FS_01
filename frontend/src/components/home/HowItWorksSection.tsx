import { Check, CreditCard, Search, Truck } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Sélectionnez",
    description: "Explorez nos catégories et trouvez l'équipement adapté à vos besoins.",
    icon: Search,
    color: "bg-blue-500",
  },
  {
    number: "02",
    title: "Commandez en ligne",
    description: "Ajoutez à votre panier et réglez en toute sécurité via nos moyens de paiement.",
    icon: CreditCard,
    color: "bg-indigo-500",
  },
  {
    number: "03",
    title: "Expédition Rapide",
    description: "Votre commande est préparée sous 24h et expédiée avec suivi sécurisé.",
    icon: Truck,
    color: "bg-violet-500",
  },
  {
    number: "04",
    title: "Profitez & Suivez",
    description: "Recevez votre produit prêt à l'emploi et accédez à votre garantie en ligne.",
    icon: Check,
    color: "bg-emerald-500",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-0 border-slate-200/80 bg-slate-50/50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">
            Parcours Simple
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Comment commander sur MarketElectro ?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-500">
            Un processus d'achat transparent et fluide en 4 étapes simples.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative flex flex-col justify-between rounded-2xl border-0 border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${step.color} text-white shadow-md`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-2xl font-extrabold text-slate-300">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-base font-bold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    {step.description}
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