import { Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminProductsHeaderProps {
  onAddProduct: () => void;
}

export default function AdminProductsHeader({
  onAddProduct,
}: AdminProductsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.25rem] bg-[#ffddb5]/60 text-[#835500] border border-[#835500]/20">
          <Package className="h-5 w-5" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#835500]">
            Gestion Catalogue
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#141b2b] sm:text-3xl">
            Produits
          </h1>

          <p className="mt-0.5 text-xs sm:text-sm text-[#524535]">
            Gérez vos références de produits, les prix, les stocks et l'activation.
          </p>
        </div>
      </div>

      <Button
        onClick={onAddProduct}
        className="w-full sm:w-auto gap-2 rounded-[0.25rem] bg-[#e59b22] text-xs sm:text-sm font-semibold text-white shadow-[0_4px_14px_0_rgba(229,155,34,0.35)] hover:bg-[#d97706] hover:shadow-[0_6px_20px_0_rgba(229,155,34,0.45)] cursor-pointer h-10 px-5"
      >
        <Plus className="h-4 w-4" />
        Ajouter un produit
      </Button>
    </div>
  );
}