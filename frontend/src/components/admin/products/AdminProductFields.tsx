import type { ChangeEvent } from "react";

import { Input } from "@/components/ui/input";

import type { AdminProductFormData } from "./admin-product-form.types";

interface AdminProductFieldsProps {
  formData: AdminProductFormData;
  onFieldChange: (
    field: keyof AdminProductFormData,
    value: string
  ) => void;
  disabled: boolean;
}

export default function AdminProductFields({
  formData,
  onFieldChange,
  disabled,
}: AdminProductFieldsProps) {
  const handleInputChange =
    (field: keyof AdminProductFormData) =>
      (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onFieldChange(field, event.target.value);
      };

  return (
    <>
      <div className="space-y-1.5">
        <label
          htmlFor="product-name"
          className="text-xs font-semibold uppercase tracking-wider text-[#524535]"
        >
          Nom du produit
        </label>

        <Input
          id="product-name"
          name="name"
          value={formData.name}
          onChange={handleInputChange("name")}
          placeholder="Ex: MacBook Pro M4 Max 16''"
          disabled={disabled}
          className="h-10 rounded-[0.25rem] border-[#e5e7eb] bg-[#f9f9ff] text-sm text-[#141b2b] placeholder:text-[#524535]/50 focus-visible:bg-white focus-visible:border-[#e59b22] focus-visible:ring-1 focus-visible:ring-[#e59b22]"
          required
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="product-description"
          className="text-xs font-semibold uppercase tracking-wider text-[#524535]"
        >
          Description
        </label>

        <textarea
          id="product-description"
          name="description"
          value={formData.description}
          onChange={handleInputChange("description")}
          placeholder="Spécifications techniques, autonomie, connectique, garantie..."
          disabled={disabled}
          required
          rows={3}
          className="w-full rounded-[0.25rem] border border-[#e5e7eb] bg-[#f9f9ff] p-3 text-sm text-[#141b2b] placeholder:text-[#524535]/50 outline-none focus:border-[#e59b22] focus:bg-white focus:ring-1 focus:ring-[#e59b22] disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label
            htmlFor="product-price"
            className="text-xs font-semibold uppercase tracking-wider text-[#524535]"
          >
            Prix (FCFA)
          </label>

          <Input
            id="product-price"
            name="price"
            type="number"
            min="0"
            step="1"
            value={formData.price}
            onChange={handleInputChange("price")}
            placeholder="1500000"
            disabled={disabled}
            className="h-10 rounded-[0.25rem] border-[#e5e7eb] bg-[#f9f9ff] text-sm text-[#141b2b] placeholder:text-[#524535]/50 focus-visible:bg-white focus-visible:border-[#e59b22] focus-visible:ring-1 focus-visible:ring-[#e59b22]"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="product-stock"
            className="text-xs font-semibold uppercase tracking-wider text-[#524535]"
          >
            Quantité en Stock
          </label>

          <Input
            id="product-stock"
            name="stock"
            type="number"
            min="0"
            step="1"
            value={formData.stock}
            onChange={handleInputChange("stock")}
            placeholder="25"
            disabled={disabled}
            className="h-10 rounded-[0.25rem] border-[#e5e7eb] bg-[#f9f9ff] text-sm text-[#141b2b] placeholder:text-[#524535]/50 focus-visible:bg-white focus-visible:border-[#e59b22] focus-visible:ring-1 focus-visible:ring-[#e59b22]"
            required
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="product-category"
          className="text-xs font-semibold uppercase tracking-wider text-[#524535]"
        >
          Catégorie
        </label>

        <Input
          id="product-category"
          name="category"
          value={formData.category}
          onChange={handleInputChange("category")}
          placeholder="Ordinateurs, Smartphones, Audio, Accessoires..."
          disabled={disabled}
          className="h-10 rounded-[0.25rem] border-[#e5e7eb] bg-[#f9f9ff] text-sm text-[#141b2b] placeholder:text-[#524535]/50 focus-visible:bg-white focus-visible:border-[#e59b22] focus-visible:ring-1 focus-visible:ring-[#e59b22]"
          required
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="product-image"
          className="text-xs font-semibold uppercase tracking-wider text-[#524535]"
        >
          URL de l'image
        </label>

        <Input
          id="product-image"
          name="image"
          type="url"
          value={formData.image}
          onChange={handleInputChange("image")}
          placeholder="https://images.unsplash.com/photo-..."
          disabled={disabled}
          className="h-10 rounded-[0.25rem] border-[#e5e7eb] bg-[#f9f9ff] text-sm text-[#141b2b] placeholder:text-[#524535]/50 focus-visible:bg-white focus-visible:border-[#e59b22] focus-visible:ring-1 focus-visible:ring-[#e59b22]"
          required
          aria-describedby="product-image-help"
        />

        <p
          id="product-image-help"
          className="text-[11px] text-[#524535]/70"
        >
          Renseignez l'URL publique de l'image haute définition du produit.
        </p>
      </div>
    </>
  );
}