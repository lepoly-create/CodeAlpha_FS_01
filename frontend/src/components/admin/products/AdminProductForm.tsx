import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type {
  CreateProductData,
  UpdateProductData,
} from "@/services/product.service";
import type { Product } from "@/types/product";

interface AdminProductFormProps {
  product?: Product | null;
  onSubmit: (
    data: CreateProductData | UpdateProductData
  ) => Promise<void>;
  onCancel: () => void;
}

export default function AdminProductForm({
  product,
  onSubmit,
  onCancel,
}: AdminProductFormProps) {
  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [image, setImage] = useState(product?.image ?? "");
  const [category, setCategory] = useState(product?.category ?? "");
  const [stock, setStock] = useState(product ? String(product.stock) : "");

  const [loading, setLoading] = useState(false);

  const isEditing = !!product;

  const handleSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const productData = {
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      image: image.trim(),
      category: category.trim(),
      stock: Number(stock),
    };

    setLoading(true);

    try {
      await onSubmit(productData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border bg-white p-6"
    >
      <div>
        <h2 className="text-lg font-semibold">
          {isEditing ? "Edit product" : "Add product"}
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          {isEditing
            ? "Update the product information."
            : "Add a new product to your catalog."}
        </p>
      </div>

      {/* Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Product name
        </label>

        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="MacBook Pro M4"
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Description
        </label>

        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Product description..."
          required
          rows={4}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Price + Stock */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Price ($)
          </label>

          <Input
            type="number"
            min="0"
            step="1"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="1500000"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Stock
          </label>

          <Input
            type="number"
            min="0"
            step="1"
            value={stock}
            onChange={(event) => setStock(event.target.value)}
            placeholder="20"
            required
          />
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Category
        </label>

        <Input
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          placeholder="Ordinateurs"
          required
        />
      </div>

      {/* Image */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Image URL
        </label>

        <Input
          type="url"
          value={image}
          onChange={(event) => setImage(event.target.value)}
          placeholder="https://example.com/product.jpg"
          required
        />

        <p className="text-xs text-muted-foreground">
          Enter the URL of the product image.
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t pt-5">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : isEditing
              ? "Update product"
              : "Add product"}
        </Button>
      </div>
    </form>
  );
}