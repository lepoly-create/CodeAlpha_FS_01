import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AdminOrderFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
}

export default function AdminOrderFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
}: AdminOrderFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-[#e5e7eb] bg-white p-3.5 shadow-xs md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#524535]/60" />

        <Input
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Rechercher par client ou référence commande..."
          className="h-10 rounded-[0.25rem] border-[#e5e7eb] bg-[#f9f9ff] pl-9 text-xs sm:text-sm text-[#141b2b] placeholder:text-[#524535]/50 focus-visible:bg-white focus-visible:border-[#e59b22] focus-visible:ring-1 focus-visible:ring-[#e59b22]"
        />
      </div>

      <select
        value={status}
        onChange={(event) =>
          onStatusChange(event.target.value)
        }
        className="h-10 rounded-[0.25rem] border border-[#e5e7eb] bg-[#f9f9ff] px-3 text-xs sm:text-sm text-[#141b2b] outline-hidden focus:border-[#e59b22] focus:bg-white focus:ring-1 focus:ring-[#e59b22] cursor-pointer"
      >
        <option value="all">Tous les statuts</option>
        <option value="pending">En attente</option>
        <option value="confirmed">Confirmée</option>
        <option value="cancelled">Annulée</option>
      </select>
    </div>
  );
}