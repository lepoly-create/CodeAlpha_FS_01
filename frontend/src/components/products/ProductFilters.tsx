import { Heart, SlidersHorizontal } from "lucide-react";

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
    <div className="flex items-center gap-3 overflow-x-auto pb-2">
      <Button
        variant={
          selectedCategory === "all"
            ? "default"
            : "outline"
        }
        className="shrink-0 cursor-pointer rounded-full"
        onClick={() => onCategoryChange("all")}
      >
        All
      </Button>

      {categories.map((category) => (
        <Button
          key={category}
          variant={
            selectedCategory === category
              ? "default"
              : "outline"
          }
          className="shrink-0 cursor-pointer rounded-full"
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </Button>
      ))}

      <Button
        variant={
          selectedCategory === "favorites" ? "default" : "outline"
        }
        className="shrink-0 cursor-pointer rounded-full"
        onClick={() => onCategoryChange("favorites")}
      >
        <Heart
          className={`mr-2 h-4 w-4 ${
            selectedCategory === "favorites"
              ? "fill-current"
              : ""
          }`}
        />
        Favorites
          
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="ml-auto cursor-pointer shrink-0 rounded-full"
      >
        <SlidersHorizontal className="h-5 w-5" />
      </Button>
    </div>
  );
}