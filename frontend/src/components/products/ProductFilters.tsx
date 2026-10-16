import { Heart } from "lucide-react";
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
    <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {/* Bouton Tout */}
      <Button
        variant={selectedCategory === "all" ? "default" : "outline"}
        size="sm"
        className={`shrink-0 cursor-pointer rounded-[0.25rem] text-xs font-semibold transition-all h-9 px-4 ${
          selectedCategory === "all"
            ? "bg-[#e59b22] text-white shadow-[0_4px_14px_0_rgba(229,155,34,0.35)] hover:bg-[#d97706]"
            : "bg-white text-[#524535] border-[#e5e7eb] hover:bg-[#f1f3ff] hover:text-[#141b2b] hover:border-[#e59b22]"
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
            className={`shrink-0 cursor-pointer rounded-[0.25rem] text-xs font-semibold capitalize transition-all h-9 px-4 ${
              isActive
                ? "bg-[#e59b22] text-white shadow-[0_4px_14px_0_rgba(229,155,34,0.35)] hover:bg-[#d97706]"
                : "bg-white text-[#524535] border-[#e5e7eb] hover:bg-[#f1f3ff] hover:text-[#141b2b] hover:border-[#e59b22]"
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
        className={`shrink-0 cursor-pointer rounded-[0.25rem] text-xs font-semibold transition-all h-9 px-4 ${
          selectedCategory === "favorites"
            ? "bg-red-500 text-white border-red-500 shadow-md hover:bg-red-600"
            : "bg-white text-[#524535] border-[#e5e7eb] hover:bg-red-50 hover:text-red-600 hover:border-red-300"
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