import { Heart} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
}: ProductFiltersProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar scroll-smooth">
      {/* Bouton Tout */}
      <Button
        variant={selectedCategory === "all" ? "default" : "outline"}
        size="sm"
        className={`shrink-0 cursor-pointer rounded-xl text-xs font-medium transition-all ${
          selectedCategory === "all"
            ? "bg-slate-900 text-white shadow-md"
            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
        }`}
        onClick={() => onCategoryChange("all")}
      >
        Tous les produits
      </Button>

      {/* Catégories dynamiques */}
      {categories.map((cat) => {
        const isActive = selectedCategory === cat;
        return (
          <Button
            key={cat}
            variant={isActive ? "default" : "outline"}
            size="sm"
            className={`shrink-0 cursor-pointer rounded-xl text-xs font-medium capitalize transition-all ${
              isActive
                ? "bg-slate-900 text-white shadow-md"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </Button>
        );
      })}

      {/* Filtre Favoris */}
      <Button
        variant={selectedCategory === "favorites" ? "default" : "outline"}
        size="sm"
        className={`shrink-0 cursor-pointer rounded-xl text-xs font-medium transition-all ${
          selectedCategory === "favorites"
            ? "bg-red-500 text-white border-red-500 shadow-md hover:bg-red-600"
            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
        }`}
        onClick={() => onCategoryChange("favorites")}
      >
        <Heart
          className={`mr-1.5 h-3.5 w-3.5 ${
            selectedCategory === "favorites" ? "fill-white" : "text-red-500"
          }`}
        />
        Favoris
      </Button>

    </div>
  );
}