import { useState } from "react";

import AdminProductsHeader from "@/components/admin/products/AdminProductsHeader";
import AdminProductFilters from "@/components/admin/products/AdminProductFilters";
import AdminProductTable from "@/components/admin/products/AdminProductTable";
import AdminProductForm from "@/components/admin/products/AdminProductForm";
import AdminProductDeleteDialog from "@/components/admin/products/AdminProductDeleteDialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import useAdminProducts from "@/hooks/useAdminProducts";
import useProductFilters, {
  type ProductStatusFilter,
} from "@/hooks/useProductFilters";

import type { Product } from "@/types/product";
import type {
  CreateProductData,
  UpdateProductData,
} from "@/services/product.service";

type FormMode = "closed" | "create" | "edit";

export default function AdminProducts() {
  const {
    products,
    loading,
    deleting,
    createAdminProduct,
    updateAdminProduct,
    disableAdminProduct,
  } = useAdminProducts();

  const {
    search,
    category,
    status,
    categories,
    filteredProducts,
    setSearch,
    setCategory,
    setStatus,
  } = useProductFilters(products);

  const [formMode, setFormMode] =
    useState<FormMode>("closed");

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [productToDelete, setProductToDelete] =
    useState<Product | null>(null);

  const showForm = formMode !== "closed";

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setFormMode("create");
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setFormMode("edit");
  };

  const handleCancelForm = () => {
    setFormMode("closed");
    setSelectedProduct(null);
  };

  const handleSubmit = async (
    data: CreateProductData | UpdateProductData
  ) => {
    if (
      formMode === "edit" &&
      selectedProduct
    ) {
      await updateAdminProduct(
        selectedProduct._id,
        data as UpdateProductData
      );
    } else {
      await createAdminProduct(
        data as CreateProductData
      );
    }

    handleCancelForm();
  };

  const handleDeleteProduct = (
    product: Product
  ) => {
    setProductToDelete(product);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) {
      return;
    }

    await disableAdminProduct(
      productToDelete._id
    );

    setProductToDelete(null);
  };

  const handleStatusChange = (
    value: string
  ) => {
    setStatus(value as ProductStatusFilter);
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading products...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-5 sm:space-y-6">
      <AdminProductsHeader
        onAddProduct={handleAddProduct}
      />

      <Dialog
        open={showForm}
        onOpenChange={(open) => {
          if (!open) {
            handleCancelForm();
          }
        }}
      >
        <DialogContent className="max-h-[95vh] w-[calc(100%-1rem)] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedProduct
                ? "Edit product"
                : "Add product"}
            </DialogTitle>

            <DialogDescription>
              {selectedProduct
                ? "Update the product information."
                : "Add a new product to your catalog."}
            </DialogDescription>
          </DialogHeader>

          <AdminProductForm
            key={
              selectedProduct?._id ??
              "new-product"
            }
            product={selectedProduct}
            onSubmit={handleSubmit}
            onCancel={handleCancelForm}
          />
        </DialogContent>
      </Dialog>

      <AdminProductFilters
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        status={status}
        onStatusChange={handleStatusChange}
        categories={categories}
      />

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1
            ? "product"
            : "products"}
        </p>
      </div>

      <AdminProductTable
        products={filteredProducts}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />

      <AdminProductDeleteDialog
        product={productToDelete}
        open={!!productToDelete}
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onCancel={() =>
          setProductToDelete(null)
        }
      />
    </div>
  );
}