import { useState, type SyntheticEvent } from "react";

import { Button } from "@/components/ui/button";
import type {
  CreateProductData,
  UpdateProductData,
} from "@/services/product.service";
import type { Product } from "@/types/product";

import AdminProductFields from "./AdminProductFields";
import type { AdminProductFormData } from "./admin-product-form.types";

interface AdminProductFormProps {
  product?: Product | null;
  onSubmit: (
    data: CreateProductData | UpdateProductData
  ) => Promise<void>;
  onCancel: () => void;
}

const getInitialFormData = (
  product?: Product | null
): AdminProductFormData => {
  if (!product) {
    return {
      name: "",
      description: "",
      price: "",
      image: "",
      category: "",
      stock: "",
    };
  }

  return {
    name: product.name,
    description: product.description,
    price: String(product.price),
    image: product.image,
    category: product.category,
    stock: String(product.stock),
  };
};

export default function AdminProductForm({
  product,
  onSubmit,
  onCancel,
}: AdminProductFormProps) {
  const [formData, setFormData] = useState<AdminProductFormData>(
    () => getInitialFormData(product)
  );

  const [loading, setLoading] = useState(false);

  const isEditing = product !== null && product !== undefined;

  const handleFieldChange = (
    field: keyof AdminProductFormData,
    value: string
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const productData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: Number(formData.price),
      image: formData.image.trim(),
      category: formData.category.trim(),
      stock: Number(formData.stock),
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
      className="space-y-5"
    >
      <AdminProductFields
        formData={formData}
        onFieldChange={handleFieldChange}
        disabled={loading}
      />

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