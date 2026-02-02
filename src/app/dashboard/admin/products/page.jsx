"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import api from "@/lib/apiClient";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Package,
  DollarSign,
  X,
  ExternalLink,
  Download,
  Globe,
  Tag,
  BarChart,
  Calendar,
  CheckCircle,
  XCircle,
  ShoppingBag,
  TrendingUp,
  Layers,
  FileText,
  Hash,
} from "lucide-react";
import { toast } from "react-toastify";

// Fetch products
const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await api.get("/ecom/products");
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
};

export default function ProductsPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const { data: productsData, isLoading, error } = useProducts();
  const products = productsData?.data || [];

  // Delete product mutation
  const deleteMutation = useMutation({
    mutationFn: async (productId) => {
      const res = await api.delete(`/ecom/products/${productId}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Product deleted successfully!");
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to delete product");
    },
  });

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      !searchQuery ||
      product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.slug?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      filterType === "all" || product.type === filterType;

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && product.isActive) ||
      (filterStatus === "inactive" && !product.isActive);

    return matchesSearch && matchesType && matchesStatus;
  });

  // Handle edit
  const handleEdit = (product) => {
    router.push(`/dashboard/admin/products/edit/${product.slug}`);
  };

  // Handle create new
  const handleCreateNew = () => {
    router.push("/dashboard/admin/products/new");
  };

  // Handle delete
  const handleDelete = (product) => {
    if (window.confirm(`Are you sure you want to delete "${product.title}"?`)) {
      deleteMutation.mutate(product._id);
    }
  };

  // Handle view details
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowDetailsModal(true);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Stats
  const stats = {
    total: products.length,
    active: products.filter((p) => p.isActive).length,
    physical: products.filter((p) => p.type === "physical").length,
    digital: products.filter((p) => p.type === "digital").length,
    outOfStock: products.filter((p) => p.stock <= 0).length,
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="flex justify-between items-center">
          <div>
            <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-64"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-36"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-12"></div>
            </div>
          ))}
        </div>
        
        <div className="h-16 bg-gray-200 rounded-xl"></div>
        <div className="h-64 bg-gray-200 rounded-xl"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl">
        <div className="flex items-center gap-3">
          <XCircle className="h-6 w-6" />
          <div>
            <h3 className="font-semibold">Error loading products</h3>
            <p className="text-sm mt-1">Please try again later or contact support.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text)]">Product Management</h1>
          <p className="text-[var(--color-text)]/70 text-sm md:text-base mt-1">
            Manage your product catalog, inventory, and digital assets
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 px-4 py-3 bg-[var(--color-primary)] text-white rounded-xl hover:bg-[var(--color-primary-hover)] transition-all shadow-md hover:shadow-lg active:scale-[0.98] group"
        >
          <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
          <span className="font-medium">Add New Product</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          icon={<ShoppingBag className="h-5 w-5" />}
          label="Total Products"
          value={stats.total}
          color="bg-[var(--color-secondary)]"
          trend={`${Math.round((stats.active / stats.total) * 100)}% active`}
        />
        <StatCard
          icon={<CheckCircle className="h-5 w-5" />}
          label="Active"
          value={stats.active}
          color="bg-[var(--color-primary)]"
          trend="Live products"
        />
        <StatCard
          icon={<Layers className="h-5 w-5" />}
          label="Physical"
          value={stats.physical}
          color="bg-purple-500"
          trend="Tangible goods"
        />
        <StatCard
          icon={<FileText className="h-5 w-5" />}
          label="Digital"
          value={stats.digital}
          color="bg-[var(--color-accent-special)]"
          trend="Digital downloads"
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5" />}
          label="Out of Stock"
          value={stats.outOfStock}
          color="bg-red-500"
          trend="Requires attention"
        />
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl shadow-md p-5 space-y-4 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name, slug, or description..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="flex-1 md:flex-none px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition appearance-none bg-white"
            >
              <option value="all">All Types</option>
              <option value="physical">Physical</option>
              <option value="digital">Digital</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex-1 md:flex-none px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition appearance-none bg-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        
        {/* Results Count */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            Showing <span className="font-semibold text-[var(--color-text)]">{filteredProducts.length}</span> of {products.length} products
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] text-sm"
            >
              Clear search
            </button>
          )}
        </div>
      </div>

      {/* Products Table - Desktop */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">
                  Product
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">
                  Type
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">
                  Price
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">
                  Stock
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">
                  Created
                </th>
                <th className="text-right p-4 text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center p-12">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Package className="h-12 w-12 mb-3" />
                      <h3 className="font-medium text-gray-600 mb-1">No products found</h3>
                      <p className="text-sm">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50 transition group"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          {product.featuredImage ? (
                            <img
                              src={product.featuredImage}
                              alt={product.title}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Package className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                          {product.type === "digital" && (
                            <div className="absolute -top-1 -right-1 bg-[var(--color-accent-special)] text-white p-1 rounded-full">
                              <FileText className="h-3 w-3" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition">
                            {product.title}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Hash className="h-3 w-3" />
                            {product.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium capitalize ${product.type === "physical" ? "bg-purple-100 text-purple-700" : "bg-[#0f929315] text-[var(--color-accent-special)]"}`}>
                        {product.type === "physical" ? <Package className="h-3 w-3" /> : <FileText className="h-3 w-3" />}
                        {product.type}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-lg text-[var(--color-text)]">
                        ${product.price?.toFixed(2) || "0.00"}
                      </div>
                      {product.compareAtPrice && product.compareAtPrice > product.price && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 line-through">
                            ${product.compareAtPrice.toFixed(2)}
                          </span>
                          <span className="text-xs font-medium bg-red-100 text-red-700 px-2 py-0.5 rounded">
                            Save ${(product.compareAtPrice - product.price).toFixed(2)}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${product.stock > 10 ? "text-green-600" : product.stock > 0 ? "text-orange-600" : "text-red-600"}`}>
                          {product.stock || 0}
                        </span>
                        {product.stock <= 10 && product.stock > 0 && (
                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded">Low</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${product.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {product.isActive ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                          {product.isActive ? "Active" : "Inactive"}
                        </span>
                        {!product.shippingRequired && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded" title="No shipping required">
                            No Ship
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {formatDate(product.createdAt)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewDetails(product)}
                          className="p-2 hover:bg-gray-100 text-gray-700 rounded-lg transition hover:text-[var(--color-primary)] group"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4 group-hover:scale-110 transition" />
                        </button>
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition hover:scale-105"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product)}
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition hover:scale-105"
                          title="Delete"
                          disabled={deleteMutation.isLoading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Products Grid - Mobile */}
      <div className="grid lg:hidden gap-4">
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-md border border-gray-100">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <h3 className="font-medium text-gray-600 mb-1">No products found</h3>
            <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 space-y-4 hover:shadow-lg transition"
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  {product.featuredImage ? (
                    <img
                      src={product.featuredImage}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  {product.type === "digital" && (
                    <div className="absolute -top-1 -right-1 bg-[var(--color-accent-special)] text-white p-1 rounded-full">
                      <FileText className="h-3 w-3" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[var(--color-text)] line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Hash className="h-3 w-3" />
                    {product.slug}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${product.type === "physical" ? "bg-purple-100 text-purple-700" : "bg-[#0f929315] text-[var(--color-accent-special)]"}`}>
                      {product.type}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${product.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {product.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                  <div className="text-gray-600">Price</div>
                  <div className="font-bold text-lg text-[var(--color-text)]">
                    ${product.price?.toFixed(2) || "0.00"}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-gray-600">Stock</div>
                  <div className={`font-bold ${product.stock > 10 ? "text-green-600" : product.stock > 0 ? "text-orange-600" : "text-red-600"}`}>
                    {product.stock || 0}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <div className="text-xs text-gray-500">
                  Created: {formatDate(product.createdAt)}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewDetails(product)}
                    className="p-2 hover:bg-gray-100 text-gray-700 rounded-lg transition"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleEdit(product)}
                    className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product)}
                    className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Product Details Modal */}
      {showDetailsModal && selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
}

function StatCard({ icon, label, value, color, trend }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition hover:-translate-y-0.5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <div className={`p-2 rounded-lg ${color} text-white`}>
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <div className="text-2xl font-bold text-[var(--color-text)]">{value}</div>
        {trend && (
          <div className="text-xs text-gray-500">{trend}</div>
        )}
      </div>
    </div>
  );
}

function ProductDetailsModal({ product, onClose }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-[var(--color-text)]">Product Details</h2>
            <p className="text-sm text-gray-500 mt-1">Complete information about {product.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Product Name</label>
                  <div className="mt-1 text-lg font-semibold text-[var(--color-text)]">
                    {product.title}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Slug</label>
                  <div className="mt-1 flex items-center gap-2">
                    <Hash className="h-4 w-4 text-gray-400" />
                    <code className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-mono">
                      {product.slug}
                    </code>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Description</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg text-gray-700">
                    {product.description || "No description provided"}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Featured Image</label>
                  <div className="mt-2">
                    {product.featuredImage ? (
                      <img
                        src={product.featuredImage}
                        alt={product.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing & Inventory */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-5 space-y-4">
                <h3 className="font-semibold text-[var(--color-text)] flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Pricing Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Current Price</label>
                    <div className="mt-1 text-2xl font-bold text-[var(--color-primary)]">
                      ${product.price?.toFixed(2) || "0.00"}
                    </div>
                  </div>
                  {product.compareAtPrice && (
                    <div>
                      <label className="text-sm text-gray-600">Compare Price</label>
                      <div className="mt-1 text-lg text-gray-500 line-through">
                        ${product.compareAtPrice.toFixed(2)}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 space-y-4">
                <h3 className="font-semibold text-[var(--color-text)] flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Inventory & Status
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Stock Quantity</label>
                    <div className={`mt-1 text-2xl font-bold ${product.stock > 10 ? "text-green-600" : product.stock > 0 ? "text-orange-600" : "text-red-600"}`}>
                      {product.stock || 0}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Status</label>
                    <div className="mt-1">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${product.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {product.isActive ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                        {product.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Type & Shipping */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-[var(--color-text)] mb-3">Product Type</h3>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${product.type === "physical" ? "bg-purple-100 text-purple-700" : "bg-[#0f929315] text-[var(--color-accent-special)]"}`}>
                  {product.type === "physical" ? (
                    <>
                      <Package className="h-5 w-5" />
                      <span>Physical Product</span>
                    </>
                  ) : (
                    <>
                      <FileText className="h-5 w-5" />
                      <span>Digital Product</span>
                    </>
                  )}
                </div>
                {product.type === "digital" && product.digitalUrl && (
                  <div className="mt-4">
                    <label className="text-sm font-medium text-gray-600 mb-2 block">Digital Download</label>
                    <a
                      href={product.digitalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition"
                    >
                      <Download className="h-4 w-4" />
                      Download File
                    </a>
                  </div>
                )}
              </div>

              <div className="pt-6">
              <h3 className="font-semibold text-[var(--color-text)] mb-3">Timestamps</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Created At</div>
                  <div className="font-medium">{formatDate(product.createdAt)}</div>
                </div>
                {/* <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Last Updated</div>
                  <div className="font-medium">{formatDate(product.updatedAt)}</div>
                </div> */}
              </div>
            </div>
            </div>

            {/* Images Gallery */}
            {product.images && product.images.length > 0 && (
              <div>
                <h3 className="font-semibold text-[var(--color-text)] mb-3">Product Images</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.title} - ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Timestamps */}
            
            <div>
                <h3 className="font-semibold text-[var(--color-text)] mb-3">Shipping & Attributes</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Shipping Required</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${product.shippingRequired ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}>
                      {product.shippingRequired ? "Yes" : "No"}
                    </span>
                  </div>
                  {product.attributes && product.attributes.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-600 mb-2 block">Attributes</label>
                      <div className="flex flex-wrap flex-col gap-2">
                        {product.attributes.map((attr, index) => (
                          <p key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                            {attr}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
          </div>
        </div>

        {/* Modal Footer */}
        {/* <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Product ID: <code className="ml-2 font-mono">{product._id}</code>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                // You can add edit navigation here
              }}
              className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition"
            >
              Edit Product
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}