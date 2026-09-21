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

export default function AdminProducts() {

  const {
    loading,
    filteredProducts,
    categories,

    search,
    category,
    status,

    onSearchChange,
    onCategoryChange,
    onStatusChange,

    showForm,
    selectedProduct,

    handleAddProduct,
    handleEditProduct,
    handleCancelForm,
    handleSubmit,

    productToDelete,
    deleting,
    handleDeleteProduct,
    handleCancelDelete,
    handleConfirmDelete,
  } = useAdminProducts();

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
        onSearchChange={onSearchChange}
        category={category}
        onCategoryChange={onCategoryChange}
        status={status}
        onStatusChange={onStatusChange}
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
        onCancel={handleCancelDelete}
      />
    </div>
  );
}