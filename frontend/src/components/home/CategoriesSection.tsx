import { ArrowRight, Headphones, Laptop, Mouse, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Ordinateurs & Laptops",
    count: "48 Modèles",
    description: "Workstations, Ultra-portables & Ordinateurs Gaming de pointe.",
    icon: Laptop,
    gradient: "from-blue-500 to-indigo-600",
    badgeBg: "bg-blue-50 text-blue-700",
  },
  {
    name: "Smartphones & Tablettes",
    count: "32 Modèles",
    description: "Dernières générations iOS & Android débloquées tout opérateur.",
    icon: Smartphone,
    gradient: "from-violet-500 to-purple-600",
    badgeBg: "bg-violet-50 text-violet-700",
  },
  {
    name: "Audio & Casques",
    count: "24 Modèles",
    description: "Casques réducteurs de bruit, écouteurs sans fil & enceintes Hi-Fi.",
    icon: Headphones,
    gradient: "from-amber-500 to-orange-600",
    badgeBg: "bg-amber-50 text-amber-700",
  },
  {
    name: "Accessoires & Périphériques",
    count: "60+ Objets",
    description: "Souris de précision, claviers mécaniques, hubs USB-C & écrans 4K.",
    icon: Mouse,
    gradient: "from-emerald-500 to-teal-600",
    badgeBg: "bg-emerald-50 text-emerald-700",
  },
];

export default function CategoriesSection() {
  return (
    <section id="categories" className="bg-slate-50/50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">
              Univers Produits
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Explorez nos univers technologiques.
            </h2>
          </div>

          <Link
            to="/products"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-800"
          >
            <span>Tout le catalogue</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.name}
                
                className="group relative 
                flex flex-col justify-between 
                rounded-2xl border-0 border-slate-200/80
                 bg-white p-6 shadow-sm transition-all 
                 duration-300 hover:-translate-y-1.5
                  "
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${category.gradient} text-white transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${category.badgeBg}`}>
                      {category.count}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-bold text-slate-900  transition-colors">
                    {category.name}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    {category.description}
                  </p>
                </div>

                <Link
                  to="/products"
                  className="hover:border-slate-300
                     focus-visible:outline-none 
                    focus-visible:ring-indigo-600"
                >
                  <div className="mt-6 flex items-center gap-2 pt-4 text-xs font-bold text-slate-800  group-hover:text-indigo-600">
                    <span>Parcourir les produits</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}