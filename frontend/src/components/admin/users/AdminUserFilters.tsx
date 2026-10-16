import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AdminUserFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function AdminUserFilters({
  search,
  onSearchChange,
}: AdminUserFiltersProps) {
  return (
    <div className="rounded-lg border border-[#e5e7eb] bg-white p-3.5 shadow-xs">
      <div className="relative max-w-lg">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#524535]/60" />

        <Input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Rechercher un client (nom, prénom ou email)..."
          className="h-10 w-full rounded-[0.25rem] border-[#e5e7eb] bg-[#f9f9ff] pl-9 pr-4 text-xs sm:text-sm text-[#141b2b] placeholder:text-[#524535]/50 focus-visible:bg-white focus-visible:border-[#e59b22] focus-visible:ring-1 focus-visible:ring-[#e59b22]"
        />
      </div>
    </div>
  );
}