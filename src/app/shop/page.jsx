"use client";

import Footer from "@/components/modules/footers/Footer";
import Navbar from "@/components/modules/headers/Navbar";
import CartSidebar from "@/components/modules/shop/CartSidebar";
import CheckoutModal from "@/components/modules/shop/CheckoutModal";
import FilterSidebar from "@/components/modules/shop/FilterSidebar";
import ProductGrid from "@/components/modules/shop/ProductGrid";
import ShopHero from "@/components/modules/shop/ShopHero";
import ShopSkeleton from "@/components/modules/shop/ShopSkeleton";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import api from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/providers/CartProvider";


const Shop = () => {
  const { t } = useTranslation();
  const router = useRouter();
  
  // ✅ Use cart context instead of local state
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
  } = useCart();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: [0, 5000],
    sortBy: "featured",
    search: "",
    type: "all",
    status: "all",
  });

  // Fetch products from API
  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ["products", "shop"],
    queryFn: async () => {
      const res = await api.get("/ecom/products");
      return res.data.data || [];
    },
    refetchOnWindowFocus: false,
  });

  // Fetch categories from API
  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/courses/categories");
      return res?.data?.data?.categories || [];
    },
    refetchOnWindowFocus: false,
  });

  // Memoize products and categories to prevent unnecessary re-renders
  const products = useMemo(() => productsData || [], [productsData]);
  const categories = useMemo(() => categoriesData || [], [categoriesData]);

  // Memoize transformed products
  const transformedProducts = useMemo(() => 
    products.map(product => ({
      id: product._id,
      name: product.title,
      price: product.price,
      originalPrice: product.compareAtPrice || product.price * 1.2,
      image: product.featuredImage || "https://res.cloudinary.com/dfq6dppjb/image/upload/v1760857947/1_rss07c.png",
      images: product.images || [],
      category: product.category?.title || product.category || "uncategorized",
      categoryId: product.category?._id || null,
      discount: product.compareAtPrice 
        ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
        : 0,
      inStock: product.stock > 0,
      type: product.type || "physical",
      isActive: product.isActive,
      slug: product.slug,
      description: product.description,
      stock: product.stock || 0,
      attributes: product.attributes || [],
      shippingRequired: product.shippingRequired || false,
      digitalUrl: product.digitalUrl,
      createdAt: product.createdAt,
    })),
    [products]
  );

  // Memoize category options
  const categoryOptions = useMemo(() => {
    const baseOptions = [
      { value: "all", label: t("shop.filters.allCategories") || "All Categories", count: products.length }
    ];
    
    const categoryCounts = {};
    transformedProducts.forEach(product => {
      const categoryId = product.categoryId;
      if (categoryId) {
        categoryCounts[categoryId] = (categoryCounts[categoryId] || 0) + 1;
      }
    });

    const categoryOptions = categories.map(cat => ({
      value: cat._id,
      label: cat.title,
      count: categoryCounts[cat._id] || 0
    }));

    return [...baseOptions, ...categoryOptions];
  }, [categories, transformedProducts, products.length, t]);

  // Filter products
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Use useMemo for filtering instead of useEffect with setState
  const filteredProductsMemo = useMemo(() => {
    if (!transformedProducts.length) return [];

    let filtered = [...transformedProducts];

    // Category filter
    if (filters.category !== "all") {
      filtered = filtered.filter(
        (product) => product.categoryId === filters.category
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    // Search filter
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q)
      );
    }

    // Type filter
    if (filters.type !== "all") {
      filtered = filtered.filter((product) => product.type === filters.type);
    }

    // Status filter
    if (filters.status !== "all") {
      filtered = filtered.filter((product) => 
        filters.status === "active" ? product.isActive : !product.isActive
      );
    }
    return filtered;
  }, [filters, transformedProducts]);

  // Update filteredProducts state only when it actually changes
  useEffect(() => {
    setFilteredProducts(filteredProductsMemo);
  }, [filteredProductsMemo]);

  // Memoize filter change handler
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // ✅ Handle checkout - navigate to checkout page
  const handleCheckout = useCallback(() => {
    setIsCartOpen(false);
    router.push('/product-checkout');
  }, [router, setIsCartOpen]);

  const loading = productsLoading || categoriesLoading;

  if (loading) {
    return <ShopSkeleton />;
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Hero Section */}
        <ShopHero
          search={filters.search}
          onSearchChange={(val) => handleFilterChange({ search: val })}
          productCount={filteredProducts.length}
          categoryCount={categories.length}
        />

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex gap-8">
              {/* Filter Sidebar */}
              <FilterSidebar
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                filters={filters}
                onFiltersChange={handleFilterChange}
                productCount={filteredProducts.length}
                categoryOptions={categoryOptions}
                priceRange={[0, Math.max(...products.map(p => p.price || 0), 1000)]}
              />

              {/* Product Grid */}
              <div className="flex-1">
                <ProductGrid
                  products={filteredProducts}
                  loading={loading}
                  onAddToCart={addToCart}
                  filters={filters}
                  onFiltersChange={handleFilterChange}
                  onOpenFilters={() => setIsFilterOpen(true)}
                  getCartItemCount={getCartItemCount}
                  setIsCartOpen={setIsCartOpen}
                  categories={categories}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Cart Sidebar */}
        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemoveFromCart={removeFromCart}
          onCheckout={handleCheckout}
          total={getCartTotal()}
        />

        {/* Checkout Modal - Optional: You can remove this if using /checkout page */}
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          cart={cart}
          total={getCartTotal()}
          clearCart={clearCart}
        />
      </div>
      <Footer />
    </>
  );
};

export default Shop;