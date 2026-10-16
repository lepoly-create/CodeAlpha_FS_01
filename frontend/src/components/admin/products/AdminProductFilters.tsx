import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type StatusFilter =
  | "all"
  | "active"
  | "inactive"
  | "outOfStock";

interface AdminProductFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  status: string;
  onStatusChange: (value: StatusFilter) => void;
  categories: string[];
}

export default function AdminProductFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  status,
  onStatusChange,
  categories,
}: AdminProductFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-[#e5e7eb] bg-white p-3.5 shadow-xs md:flex-row md:items-center">
      {/* Recherche */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#524535]/60" />

        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Rechercher un produit (nom, spécifications)..."
          className="h-10 rounded-[0.25rem] border-[#e5e7eb] bg-[#f9f9ff] pl-9 text-xs sm:text-sm text-[#141b2b] placeholder:text-[#524535]/50 focus-visible:bg-white focus-visible:border-[#e59b22] focus-visible:ring-1 focus-visible:ring-[#e59b22]"
        />
      </div>

      {/* Selects group: 2 colonnes sur tablette/mobile large, aligné en ligne sur desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:flex md:items-center">
        {/* Catégorie */}
        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          aria-label="Filtrer par catégorie"
          className="h-10 rounded-[0.25rem] border border-[#e5e7eb] bg-[#f9f9ff] px-3 text-xs sm:text-sm text-[#141b2b] outline-hidden focus:border-[#e59b22] focus:bg-white focus:ring-1 focus:ring-[#e59b22] cursor-pointer min-w-[170px]"
        >
          <option value="all">Toutes les catégories</option>

          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Statut */}
        <select
          value={status}
          onChange={(event) =>
            onStatusChange(event.target.value as StatusFilter)
          }
          aria-label="Filtrer par statut"
          className="h-10 rounded-[0.25rem] border border-[#e5e7eb] bg-[#f9f9ff] px-3 text-xs sm:text-sm text-[#141b2b] outline-hidden focus:border-[#e59b22] focus:bg-white focus:ring-1 focus:ring-[#e59b22] cursor-pointer min-w-[150px]"
        >
          <option value="all">Tous les statuts</option>
          <option value="active">Actif</option>
          <option value="inactive">Inactif</option>
          <option value="outOfStock">Rupture de stock</option>
        </select>
      </div>
    </div>
  );
}