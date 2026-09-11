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
    <div className="flex flex-col gap-3 rounded-xl border bg-white p-4 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search by customer or order ID..."
          className="pl-9"
        />
      </div>

      <select
        value={status}
        onChange={(event) =>
          onStatusChange(event.target.value)
        }
        className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
      >
        <option value="all">All status</option>
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>
  );
}