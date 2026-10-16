import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/format-price";

interface AdminProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function AdminProductTable({
  products,
  onEdit,
  onDelete,
}: AdminProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-[#e5e7eb] bg-white p-10 text-center shadow-xs">
        <p className="text-sm font-semibold text-[#524535]">
          Aucun produit trouvé dans cette sélection.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* VUE MOBILE (< 768px) : Cartes tactiles ultra-épurées */}
      <div className="space-y-3 md:hidden">
        {products.map((product) => (
          <div
            key={product._id}
            className="rounded-lg border border-[#e5e7eb] bg-white p-4 shadow-xs space-y-3"
          >
            <div className="flex items-start gap-3">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-[0.25rem] border border-[#e5e7eb] bg-[#f9f9ff] p-1 flex items-center justify-center">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="text-[10px] text-[#524535]">Sans image</div>
                )}
              </div>

              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-[#f1f3ff] px-2.5 py-0.5 text-[10px] font-semibold text-[#524535] border border-[#e5e7eb]">
                    {product.category}
                  </span>
                  {product.isActive ? (
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                      Actif
                    </span>
                  ) : (
                    <span className="rounded-full bg-[#f1f3ff] px-2 py-0.5 text-[10px] font-bold text-[#524535] border border-[#e5e7eb]">
                      Inactif
                    </span>
                  )}
                </div>

                <p className="truncate text-sm font-bold text-[#141b2b]">
                  {product.name}
                </p>

                <div className="flex items-center justify-between pt-0.5">
                  <span className="text-sm font-bold text-[#141b2b]">
                    {formatPrice(product.price)}
                  </span>
                  <span
                    className={`text-xs ${product.stock === 0
                      ? "font-bold text-[#ba1a1a]"
                      : product.stock <= 5
                        ? "font-bold text-[#e59b22]"
                        : "font-semibold text-[#524535]"
                      }`}
                  >
                    Stock : {product.stock}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 border-t border-[#f1f3ff] pt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(product)}
                className="flex-1 rounded-[0.25rem] border-[#e5e7eb] text-xs font-semibold text-[#141b2b] hover:bg-[#f1f3ff] h-9 gap-1.5"
              >
                <Pencil className="h-3.5 w-3.5 text-[#0053db]" />
                Modifier
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(product)}
                className="flex-1 rounded-[0.25rem] border-[#ffdad6] text-xs font-semibold text-[#ba1a1a] hover:bg-[#ffdad6]/40 h-9 gap-1.5"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Supprimer
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* VUE TABLETTE & DESKTOP (>= 768px) : Tableau classique haute densité */}
      <div className="hidden md:block overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
            <thead className="border-b border-[#f1f3ff] bg-[#f9f9ff] text-[#141b2b]">
              <tr>
                <th className="px-5 py-3.5 text-left font-bold text-xs uppercase tracking-wider text-[#524535]">
                  Produit
                </th>

                <th className="px-5 py-3.5 text-left font-bold text-xs uppercase tracking-wider text-[#524535]">
                  Catégorie
                </th>

                <th className="px-5 py-3.5 text-left font-bold text-xs uppercase tracking-wider text-[#524535]">
                  Prix
                </th>

                <th className="px-5 py-3.5 text-left font-bold text-xs uppercase tracking-wider text-[#524535]">
                  Stock
                </th>

                <th className="px-5 py-3.5 text-left font-bold text-xs uppercase tracking-wider text-[#524535]">
                  Statut
                </th>

                <th className="px-5 py-3.5 text-right font-bold text-xs uppercase tracking-wider text-[#524535]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#f1f3ff]">
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="transition-colors hover:bg-[#f9f9ff]"
                >
                  {/* Product */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 shrink-0 overflow-hidden rounded-[0.25rem] border border-[#e5e7eb] bg-[#f9f9ff] p-1 flex items-center justify-center">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <div className="text-[10px] text-[#524535]">
                            Sans image
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-[#141b2b]">
                          {product.name}
                        </p>

                        <p className="max-w-65 truncate text-xs text-[#524535]">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-3.5 text-xs font-semibold text-[#524535]">
                    <span className="rounded-full bg-[#f1f3ff] px-2.5 py-0.5 border border-[#e5e7eb]">
                      {product.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-5 py-3.5 text-sm font-bold text-[#141b2b]">
                    {formatPrice(product.price)}
                  </td>

                  {/* Stock */}
                  <td className="px-5 py-3.5 text-xs">
                    <span
                      className={
                        product.stock === 0
                          ? "font-bold text-[#ba1a1a]"
                          : product.stock <= 5
                            ? "font-bold text-[#e59b22]"
                            : "font-semibold text-[#141b2b]"
                      }
                    >
                      {product.stock}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-3.5">
                    {product.isActive ? (
                      <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200">
                        Actif
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-[#f1f3ff] px-2.5 py-0.5 text-xs font-bold text-[#524535] border border-[#e5e7eb]">
                        Inactif
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end gap-1.5">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(product)}
                        title="Modifier le produit"
                        className="h-8 w-8 rounded-[0.25rem] text-[#524535] hover:bg-[#e9edff] hover:text-[#0053db]"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(product)}
                        title="Supprimer le produit"
                        className="h-8 w-8 rounded-[0.25rem] text-[#ba1a1a] hover:bg-[#ffdad6]/50 hover:text-[#93000a]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}