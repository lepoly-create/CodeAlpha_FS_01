import { useEffect, useMemo, useState } from "react";
import axios from "axios";
//import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import AdminProductsHeader from "@/components/admin/products/AdminProductsHeader";
import AdminProductFilters from "@/components/admin/products/AdminProductFilters";
import AdminProductTable from "@/components/admin/products/AdminProductTable";
import AdminProductForm from "@/components/admin/products/AdminProductForm";
import AdminProductDeleteDialog from "@/components/admin/products/AdminProductDeleteDialog";

import {
  createProduct,
  deleteProduct,
  getAdminProducts,
  updateProduct,
  type CreateProductData,
  type UpdateProductData,
} from "@/services/product.service";

import type { Product } from "@/types/product";

export default function AdminProducts() {
  //const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [productToDelete, setProductToDelete] =
    useState<Product | null>(null);

  const [deleting, setDeleting] = useState(false);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const data = await getAdminProducts();

      setProducts(data);
    } catch (error: unknown) {
      toast.error(
        (axios.isAxiosError(error) && error.response?.data?.message) ||
          "Unable to load products."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void (async () => {
      await loadProducts();
    })();
  }, []);

  const categories = useMemo(() => {
    return Array.from(
      new Set(products.map((product) => product.category))
    ).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        category === "all" ||
        product.category === category;

      let matchesStatus = true;

      if (status === "active") {
        matchesStatus = product.isActive;
      }

      if (status === "inactive") {
        matchesStatus = !product.isActive;
      }

      if (status === "outOfStock") {
        matchesStatus = product.stock === 0;
      }

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [products, search, category, status]);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setSelectedProduct(null);
  };

  const handleSubmit = async (
    data: CreateProductData | UpdateProductData
  ) => {
    try {
      if (selectedProduct) {
        await updateProduct(selectedProduct._id, data);

        toast.success("Product updated successfully.");
      } else {
        await createProduct(data as CreateProductData);

        toast.success("Product created successfully.");
      }

      handleCancelForm();
      await loadProducts();
    } catch (error: unknown) {
      toast.error(
        (axios.isAxiosError(error) && error.response?.data?.message) ||
          "Unable to save product."
      );
    }
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

    try {
      setDeleting(true);

      await deleteProduct(productToDelete._id);

      toast.success("Product disabled successfully.");

      setProductToDelete(null);

      await loadProducts();
    } catch (error: unknown) {
      toast.error(
        (axios.isAxiosError(error) && error.response?.data?.message) ||
          "Unable to disable product."
      );
    } finally {
      setDeleting(false);
    }
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
      {/* Header */}
      <AdminProductsHeader
        onAddProduct={handleAddProduct}
      />

      {/* Form */}
      {showForm && (
        <AdminProductForm
          key={selectedProduct?._id ?? "new-product"}
          product={selectedProduct}
          onSubmit={handleSubmit}
          onCancel={handleCancelForm}
        />
      )}

      {/* Filters */}
      <AdminProductFilters
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        status={status}
        onStatusChange={setStatus}
        categories={categories}
      />

      {/* Result count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1
            ? "product"
            : "products"}
        </p>
      </div>

      {/* Table */}
      <AdminProductTable
        products={filteredProducts}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />

      {/* Delete dialog */}
      <AdminProductDeleteDialog
        product={productToDelete}
        open={!!productToDelete}
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setProductToDelete(null)}
      />
    </div>
  );
}