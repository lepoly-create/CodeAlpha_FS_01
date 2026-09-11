import { Package } from "lucide-react";

export default function AdminOrdersHeader() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Package className="h-5 w-5 text-primary" />
        </div>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Orders
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage customer orders and their status.
          </p>
        </div>
      </div>
    </div>
  );
}