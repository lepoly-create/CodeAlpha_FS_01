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
      <div className="space-y-2">
        <label
          htmlFor="product-name"
          className="text-sm font-medium"
        >
          Product name
        </label>

        <Input
          id="product-name"
          name="name"
          value={formData.name}
          onChange={handleInputChange("name")}
          placeholder="MacBook Pro M4"
          disabled={disabled}
          required
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="product-description"
          className="text-sm font-medium"
        >
          Description
        </label>

        <textarea
          id="product-description"
          name="description"
          value={formData.description}
          onChange={handleInputChange("description")}
          placeholder="Product description..."
          disabled={disabled}
          required
          rows={4}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="product-price"
            className="text-sm font-medium"
          >
            Price ($)
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
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="product-stock"
            className="text-sm font-medium"
          >
            Stock
          </label>

          <Input
            id="product-stock"
            name="stock"
            type="number"
            min="0"
            step="1"
            value={formData.stock}
            onChange={handleInputChange("stock")}
            placeholder="20"
            disabled={disabled}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="product-category"
          className="text-sm font-medium"
        >
          Category
        </label>

        <Input
          id="product-category"
          name="category"
          value={formData.category}
          onChange={handleInputChange("category")}
          placeholder="Ordinateurs"
          disabled={disabled}
          required
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="product-image"
          className="text-sm font-medium"
        >
          Image URL
        </label>

        <Input
          id="product-image"
          name="image"
          type="url"
          value={formData.image}
          onChange={handleInputChange("image")}
          placeholder="https://example.com/product.jpg"
          disabled={disabled}
          required
          aria-describedby="product-image-help"
        />

        <p
          id="product-image-help"
          className="text-xs text-muted-foreground"
        >
          Enter the URL of the product image.
        </p>
      </div>
    </>
  );
}