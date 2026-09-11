import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminProductsHeaderProps {
  onAddProduct: () => void;
}

export default function AdminProductsHeader({
  onAddProduct,
}: AdminProductsHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Products
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your products, stock and availability.
        </p>
      </div>

      <Button
        onClick={onAddProduct}
        className="gap-2"
      >
        <Plus className="h-4 w-4" />
        Add product
      </Button>
    </div>
  );
}