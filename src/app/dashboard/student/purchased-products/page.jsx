"use client";

import { useState, useEffect } from "react";
import api from "@/lib/apiClient";
import { 
  Package, 
  Download, 
  Search,
  DollarSign,
  ShoppingBag,
  Calendar,
  FileText,
  CheckCircle
} from "lucide-react";

export default function PurchasedProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPurchasedProducts();
  }, []);

  const fetchPurchasedProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/ecom/products/purchased-product");
      setProducts(res.data.data || []);
    } catch (error) {
      console.error("Error fetching purchased products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    if (!search) return true;
    return (
      product.title?.toLowerCase().includes(search.toLowerCase()) ||
      product.slug?.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleDownload = (product) => {
    if (product.downloadUrl) {
      window.open(product.downloadUrl, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-4">
        <div className="container mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-xl shadow p-6">
                  <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text)]">
            My Purchased Products
          </h1>
          <p className="text-[var(--color-text)]/70 text-sm md:text-base mt-2">
            All digital and physical products you have purchased
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Products</span>
              <div className="p-2 bg-[var(--color-secondary)] rounded-lg text-white">
                <ShoppingBag className="h-5 w-5" />
              </div>
            </div>
            <div className="text-2xl font-bold text-[var(--color-text)]">
              {products.length}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Digital</span>
              <div className="p-2 bg-[var(--color-accent-special)] rounded-lg text-white">
                <FileText className="h-5 w-5" />
              </div>
            </div>
            <div className="text-2xl font-bold text-[var(--color-text)]">
              {products.filter(p => p.type === "digital").length}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Physical</span>
              <div className="p-2 bg-[var(--color-primary)] rounded-lg text-white">
                <Package className="h-5 w-5" />
              </div>
            </div>
            <div className="text-2xl font-bold text-[var(--color-text)]">
              {products.filter(p => p.type === "physical").length}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Spent</span>
              <div className="p-2 bg-[var(--color-accent)] rounded-lg text-white">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
            <div className="text-2xl font-bold text-[var(--color-text)]">
              ${products.reduce((sum, p) => sum + (p.purchaseInfo.totalPrice || 0), 0)}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by product name or slug..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {search ? "No matching products found" : "No products purchased yet"}
            </h3>
            <p className="text-gray-500">
              {search ? "Try a different search term" : "Start shopping to see your purchased products here"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                {/* Product Image */}
                <div className="relative h-48 bg-gray-100">
                  {product.featuredImage ? (
                    <img
                      src={product.featuredImage}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  
                  {/* Type Badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${
                    product.type === "digital" 
                      ? "bg-[#0f929315] text-[var(--color-accent-special)]" 
                      : "bg-[#05966915] text-[var(--color-primary)]"
                  }`}>
                    {product.type === "digital" ? "DIGITAL" : "PHYSICAL"}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-[var(--color-text)] text-lg line-clamp-1">
                      {product.title}
                    </h3>
                    <span className="text-lg font-bold text-[var(--color-text)]">
                      ${product.price}
                    </span>
                  </div>

                  {/* Purchase Info */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(product.purchaseInfo.purchasedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <ShoppingBag className="h-4 w-4" />
                        <span>Qty: {product.purchaseInfo.quantity}</span>
                      </div>
                      <div className="text-[var(--color-text)] font-medium">
                        Total: ${product.purchaseInfo.totalPrice}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    {product.type === "digital" && product.downloadUrl && (
                      <button
                        onClick={() => handleDownload(product)}
                        className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white py-3 rounded-xl hover:bg-[var(--color-primary-hover)] transition-all shadow-md hover:shadow-lg"
                      >
                        <Download className="h-5 w-5" />
                        <span className="font-medium">Download File</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}