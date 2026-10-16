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
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#e59b22] border-t-transparent" />
        <p className="text-xs sm:text-sm font-semibold text-[#524535]">
          Chargement du catalogue de produits...
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
        <DialogContent className="max-h-[92vh] w-[calc(100vw-2rem)] max-w-2xl overflow-y-auto rounded-lg border border-[#e5e7eb] bg-white p-5 sm:p-6 shadow-2xl">
          <DialogHeader className="border-b border-[#f1f3ff] pb-4">
            <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#835500]">
              {selectedProduct ? "Édition référence" : "Nouveau matériel"}
            </span>
            <DialogTitle className="text-lg sm:text-xl font-extrabold text-[#141b2b]">
              {selectedProduct
                ? "Modifier le produit"
                : "Ajouter un produit"}
            </DialogTitle>

            <DialogDescription className="text-xs text-[#524535]">
              {selectedProduct
                ? "Modifiez les informations, tarifs et stocks du produit sélectionné."
                : "Ajoutez une nouvelle référence de matériel électronique au catalogue de la boutique."}
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

      <div className="flex items-center justify-between px-1">
        <p className="text-xs sm:text-sm font-medium text-[#524535]">
          <span className="font-bold text-[#141b2b]">{filteredProducts.length}</span>{" "}
          {filteredProducts.length <= 1
            ? "produit affiché"
            : "produits affichés"}
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