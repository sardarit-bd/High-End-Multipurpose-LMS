"use client";

import { useState, useEffect } from "react";
import { FaSearch, FaFilter, FaBookOpen, FaShoppingCart, FaBox } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ShopHero = ({ 
  onSearchChange, 
  productCount,
  categoryCount 
}) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  // Debounce search
  useEffect(() => {
     onSearchChange(searchQuery);
  }, [searchQuery]);

  return (
    <section className="relative bg-gradient-to-br from-[#059669] to-[#2563EB] py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-white"></div>
        <div className="absolute bottom-10 right-10 h-24 w-24 rounded-full bg-white"></div>
        <div className="absolute top-1/2 left-1/2 h-16 w-16 rounded-full bg-white"></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
            <FaBookOpen className="text-white text-sm" />
            <span className="text-sm font-medium text-white">
              {t("shop.hero.badge") || "Premium Products"}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            {t("shop.hero.title") || "Discover Amazing"} {" "}
            <span className="bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
              {t("shop.hero.highlighted") || "Products"}
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-xl text-orange-100">
            {t("shop.hero.description") || "Browse through our collection of premium products with great discounts and offers"}
          </p>

          {/* Stats Bar */}
          <div className="mx-auto mb-8 max-w-3xl">
            <div className="flex flex-wrap justify-center gap-6 bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white flex items-center justify-center gap-2">
                  <FaBox />
                  {productCount}
                </div>
                <div className="text-orange-200">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{categoryCount}</div>
                <div className="text-orange-200">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {t("shop.hero.stats.free") || "Free"}
                </div>
                <div className="text-orange-200">Shipping</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-orange-200">Support</div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mx-auto mb-8 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder={t("shop.hero.searchPlaceholder") || "Search products, categories, or descriptions..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl outline-none border-0 bg-white/20 px-6 py-4 pl-14 pr-12 text-white placeholder-orange-200 backdrop-blur-sm focus:bg-white/30 focus:ring-2 focus:ring-white/50 transition-all"
              />
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-white text-lg" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white hover:text-orange-200"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ShopHero;