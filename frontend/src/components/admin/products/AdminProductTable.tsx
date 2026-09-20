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
      <div className="rounded-xl border bg-white p-10 text-center">
        <p className="text-sm text-muted-foreground">
          No products found.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-212.5 text-sm">
          <thead className="border-b bg-slate-50">
            <tr>
              <th className="px-5 py-4 text-left font-medium">
                Product
              </th>

              <th className="px-5 py-4 text-left font-medium">
                Category
              </th>

              <th className="px-5 py-4 text-left font-medium">
                Price
              </th>

              <th className="px-5 py-4 text-left font-medium">
                Stock
              </th>

              <th className="px-5 py-4 text-left font-medium">
                Status
              </th>

              <th className="px-5 py-4 text-right font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {products.map((product) => (
              <tr
                key={product._id}
                className="transition-colors hover:bg-slate-200"
              >
                {/* Product */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border bg-slate-100">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {product.name}
                      </p>

                      <p className="max-w-65 truncate text-xs text-muted-foreground">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="px-5 py-4">
                  {product.category}
                </td>

                {/* Price */}
                <td className="px-5 py-4 font-medium">
                  {formatPrice(product.price)}
                </td>

                {/* Stock */}
                <td className="px-5 py-4">
                  <span
                    className={
                      product.stock === 0
                        ? "font-medium text-red-600"
                        : product.stock <= 5
                          ? "font-medium text-orange-600"
                          : ""
                    }
                  >
                    {product.stock}
                  </span>
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  {product.isActive ? (
                    <span className="inline-flex rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                      Inactive
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(product)}
                      title="Edit product"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(product)}
                      title="Delete product"
                      className="text-red-600 hover:text-red-700"
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
  );
}