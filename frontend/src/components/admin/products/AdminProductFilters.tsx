import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AdminProductFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
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
    <div className="flex flex-col gap-3 rounded-xl border bg-white p-4 md:flex-row md:items-center">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search products..."
          className="pl-9"
        />
      </div>

      {/* Category */}
      <select
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
        className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
      >
        <option value="all">All categories</option>

        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      {/* Status */}
      <select
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
        className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
      >
        <option value="all">All status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="outOfStock">Out of stock</option>
      </select>
    </div>
  );
}