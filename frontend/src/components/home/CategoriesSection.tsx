import { ArrowRight, Headphones, Laptop, Mouse, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Ordinateurs & Laptops",
    count: "48 Modèles",
    description: "Workstations, Ultra-portables & Ordinateurs Gaming de pointe.",
    icon: Laptop,
    gradient: "from-[#1a1c20] to-[#293040]",
    badgeBg: "bg-[#e9edff] text-[#0053db]",
  },
  {
    name: "Smartphones & Tablettes",
    count: "32 Modèles",
    description: "Dernières générations iOS & Android débloquées tout opérateur.",
    icon: Smartphone,
    gradient: "from-[#835500] to-[#e59b22]",
    badgeBg: "bg-[#ffddb5] text-[#835500]",
  },
  {
    name: "Audio & Casques",
    count: "24 Modèles",
    description: "Casques réducteurs de bruit, écouteurs sans fil & enceintes Hi-Fi.",
    icon: Headphones,
    gradient: "from-[#1a1c20] to-[#5d5e63]",
    badgeBg: "bg-[#f1f3ff] text-[#141b2b]",
  },
  {
    name: "Accessoires & Périphériques",
    count: "60+ Objets",
    description: "Souris de précision, claviers mécaniques, hubs USB-C & écrans 4K.",
    icon: Mouse,
    gradient: "from-[#003ea8] to-[#0053db]",
    badgeBg: "bg-[#e9edff] text-[#0053db]",
  },
];

export default function CategoriesSection() {
  return (
    <section id="categories" className="bg-[#f9f9ff] py-16 sm:py-20 border-b border-[#e5e7eb]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#835500]">
              Univers Produits
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#141b2b] sm:text-4xl">
              Explorez nos univers technologiques.
            </h2>
          </div>

          <Link
            to="/products"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#835500] transition-colors hover:text-[#e59b22]"
          >
            <span>Tout le catalogue</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.name}
                className="group relative flex flex-col justify-between rounded-lg border border-[#e5e7eb] bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#e59b22]/50 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-[0.25rem] bg-gradient-to-br ${category.gradient} text-white transition-transform duration-300 group-hover:scale-105`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${category.badgeBg}`}>
                      {category.count}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-bold text-[#141b2b] transition-colors group-hover:text-[#835500]">
                    {category.name}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-[#524535]">
                    {category.description}
                  </p>
                </div>

                <Link
                  to="/products"
                  className="mt-6 flex items-center gap-2 border-t border-[#f1f3ff] pt-4 text-xs font-bold text-[#141b2b] transition-colors group-hover:text-[#e59b22]"
                >
                  <span>Parcourir les produits</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}