import { Search } from "lucide-react";

interface AdminUserFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function AdminUserFilters({
  search,
  onSearchChange,
}: AdminUserFiltersProps) {
  return (
    <div className="rounded-xl focus:border-0 p-4">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <input
          type="text"
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search by name or email..."
          className="h-10 w-full rounded-lg border bg-background pl-9 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>
  );
}