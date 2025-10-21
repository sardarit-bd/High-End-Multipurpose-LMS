"use client";

import Footer from "@/components/modules/footers/Footer";
import Navbar from "@/components/modules/headers/Navbar";
import CartSidebar from "@/components/modules/shop/CartSidebar";
import CheckoutModal from "@/components/modules/shop/CheckoutModal";
import FilterSidebar from "@/components/modules/shop/FilterSidebar";
import ProductGrid from "@/components/modules/shop/ProductGrid";
import ShopHero from "@/components/modules/shop/ShopHero";
import ShopSkeleton from "@/components/modules/shop/ShopSkeleton";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaCartPlus, FaFilter } from "react-icons/fa";

const Shop = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: [0, 1000],
    rating: 0,
    sortBy: "featured",
    search: "",
  });
  const [loading, setLoading] = useState(true);

  const clearCart = () => {
    setCart([]);
  };

  // Sample products data
  useEffect(() => {
    const sampleProducts = [
      {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 99.99,
        originalPrice: 129.99,
        image:
          "https://res.cloudinary.com/dfq6dppjb/image/upload/v1760857947/1_rss07c.png",
        images: [
          "https://res.cloudinary.com/dfq6dppjb/image/upload/v1760857947/1_rss07c.png",
          "https://res.cloudinary.com/dfq6dppjb/image/upload/v1760857948/1b_alt.png",
          "https://res.cloudinary.com/dfq6dppjb/image/upload/v1760857948/1c_alt.png",
        ],
        category: "electronics",
        rating: 4.5,
        reviewCount: 128,
        featured: true,
        discount: 23,
        inStock: true,
      },
      {
        id: 2,
        name: "Smart Fitness Watch",
        price: 199.99,
        originalPrice: 249.99,
        image:
          "https://res.cloudinary.com/dfq6dppjb/image/upload/v1760857947/6_ndcsu7.png",
        category: "electronics",
        rating: 4.8,
        reviewCount: 89,
        featured: true,
        discount: 20,
        inStock: true,
      },
      {
        id: 3,
        name: "Organic Cotton T-Shirt",
        price: 29.99,
        originalPrice: 39.99,
        image:
          "https://res.cloudinary.com/dfq6dppjb/image/upload/v1760857948/8_fbys3e.png",
        category: "clothing",
        rating: 4.3,
        reviewCount: 256,
        featured: false,
        discount: 25,
        inStock: true,
      },
      {
        id: 4,
        name: "Professional Camera Lens",
        price: 599.99,
        originalPrice: 799.99,
        image:
          "https://res.cloudinary.com/dfq6dppjb/image/upload/v1760857948/5_idpboj.png",
        category: "electronics",
        rating: 4.9,
        reviewCount: 67,
        featured: true,
        discount: 25,
        inStock: false,
      },
      {
        id: 5,
        name: "Designer Backpack",
        price: 79.99,
        originalPrice: 99.99,
        image:
          "https://res.cloudinary.com/dfq6dppjb/image/upload/v1760857947/4_gi21el.png",
        category: "accessories",
        rating: 4.6,
        reviewCount: 142,
        featured: false,
        discount: 20,
        inStock: true,
      },
      {
        id: 6,
        name: "Gaming Keyboard RGB",
        price: 89.99,
        originalPrice: 119.99,
        image:
          "https://res.cloudinary.com/dfq6dppjb/image/upload/v1760857947/7_viojbg.png",
        category: "electronics",
        rating: 4.4,
        reviewCount: 203,
        featured: true,
        discount: 25,
        inStock: true,
      },
      {
        id: 7,
        name: "Yoga Mat Premium",
        price: 49.99,
        originalPrice: 69.99,
        image:
          "https://res.cloudinary.com/dfq6dppjb/image/upload/v1760857947/3_eqimrv.png",
        category: "sports",
        rating: 4.7,
        reviewCount: 89,
        featured: false,
        discount: 29,
        inStock: true,
      },
      {
        id: 8,
        name: "Wireless Charging Pad",
        price: 39.99,
        originalPrice: 49.99,
        image:
          "https://res.cloudinary.com/dfq6dppjb/image/upload/v1760857947/2_soficz.png",
        category: "electronics",
        rating: 4.2,
        reviewCount: 178,
        featured: false,
        discount: 20,
        inStock: true,
      },
    ];

    // Simulate loading delay
    setTimeout(() => {
      setProducts(sampleProducts);
      setFilteredProducts(sampleProducts);
      setLoading(false);
    }, 1500);
  }, []);

  // Filter products
  useEffect(() => {
    let filtered = [...products];

    // Category filter
    if (filters.category !== "all") {
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter((product) => product.rating >= filters.rating);
    }

    // Search filter
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sort products
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // featured
        filtered.sort((a, b) =>
          b.featured === a.featured ? 0 : b.featured ? -1 : 1
        );
    }

    setFilteredProducts(filtered);
  }, [filters, products]);

  // Cart functions
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  if (loading) {
    return <ShopSkeleton />;
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Hero Section */}
        <ShopHero
          onShowFilters={() => setIsFilterOpen(true)}
          cartItemCount={getCartItemCount()}
          search={filters.search}
          onSearchChange={(val) =>
            setFilters((prev) => ({ ...prev, search: val }))
          }
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
                onFiltersChange={setFilters}
                productCount={filteredProducts.length}
              />

              {/* Product Grid */}
              <div className="flex-1">
                <ProductGrid
                  products={filteredProducts}
                  loading={loading}
                  onAddToCart={addToCart}
                  filters={filters}
                  onFiltersChange={setFilters}
                  onOpenFilters={() => setIsFilterOpen(true)}
                  getCartItemCount={getCartItemCount}
                  setIsCartOpen={setIsCartOpen}
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
          onCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
          total={getCartTotal()}
        />

        {/* Checkout Modal */}
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