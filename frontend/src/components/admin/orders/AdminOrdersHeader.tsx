import { Package } from "lucide-react";

export default function AdminOrdersHeader() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-[0.25rem] bg-[#ffddb5]/60 text-[#835500] border border-[#835500]/20">
          <Package className="h-5 w-5" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#835500]">
            Gestion Commerciale
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#141b2b] sm:text-3xl">
            Commandes
          </h1>

          <p className="mt-0.5 text-xs sm:text-sm text-[#524535]">
            Consultez, confirmez ou traitez les commandes passées par vos clients.
          </p>
        </div>
      </div>
    </div>
  );
}