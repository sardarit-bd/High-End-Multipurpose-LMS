"use client";

import { useTranslation } from "react-i18next";
import { FaCartPlus, FaFilter, FaSort } from "react-icons/fa";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { SearchCheck, SearchIcon } from "lucide-react";

const ProductGrid = ({
  products,
  loading,
  onAddToCart,
  filters,
  onFiltersChange,
  onOpenFilters,
  getCartItemCount,
  setIsCartOpen,
  categories
}) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <section>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="h-8 bg-gray-300 rounded w-40 animate-pulse"></div>
            <div className="h-10 bg-gray-300 rounded w-24 lg:hidden animate-pulse"></div>
            <div className="h-12 bg-gray-300 rounded w-32 animate-pulse"></div>
          </div>
          <div className="h-10 bg-gray-300 rounded w-48 animate-pulse"></div>
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <ProductCardSkeleton key={item} />
          ))}
        </div>
      </section>
    );
  }

  // Sort options
  const sortOptions = [
    { value: "featured", label: t("shop.sort.featured") },
    { value: "newest", label: t("shop.sort.newest") },
    { value: "oldest", label: t("shop.sort.oldest") },
    { value: "price-low", label: t("shop.sort.lowToHigh") },
    { value: "price-high", label: t("shop.sort.highToLow") },
    { value: "rating", label: t("shop.sort.rating") },
    { value: "name", label: t("shop.sort.nameAZ") },
  ];

  return (
    <section>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {t("shop.productsTitle")} ({products.length})
          </h2>

          {/* Mobile Filter Button */}
          <button
            onClick={onOpenFilters}
            className="flex items-center gap-2 rounded-lg bg-[#059669] px-4 py-2 text-white transition-all hover:bg-green-700 lg:hidden"
          >
            <FaFilter />
            <span>{t("shop.filters.title")}</span>
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 rounded-md bg-[#059669] px-4 py-3 text-white shadow-lg transition-all hover:shadow-xl"
          >
            <FaCartPlus className="text-lg" />
            <span className="font-semibold">{getCartItemCount()}</span>
            {getCartItemCount() > 0 && (
              <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {getCartItemCount()}
              </span>
            )}
          </button>
        </div>

        {/* Sort Dropdown */}
        {/* <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <FaSort />
            <span className="text-sm font-medium">Sort by:</span>
          </div>
          <select
            value={filters.sortBy}
            onChange={(e) =>
              onFiltersChange({ sortBy: e.target.value })
            }
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div> */}
      </div>

      {/* Active Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {filters.category !== "all" && (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1.5 text-sm text-blue-700">
            Category: {categories.find(c => c._id === filters.category)?.title || filters.category}
            <button
              onClick={() => onFiltersChange({ category: "all" })}
              className="ml-1 text-[#059669]"
            >
              ×
            </button>
          </span>
        )}
        
        {filters.type !== "all" && (
          <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1.5 text-sm text-purple-700">
            Type: {filters.type}
            <button
              onClick={() => onFiltersChange({ type: "all" })}
              className="ml-1 text-purple-500 hover:text-purple-700"
            >
              ×
            </button>
          </span>
        )}
        
        
        {filters.priceRange[0] > 0 || filters.priceRange[1] < 1000 ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1.5 text-sm text-green-700">
            Price: ${filters.priceRange[0]} - ${filters.priceRange[1]}
            <button
              onClick={() => onFiltersChange({ priceRange: [0, 1000] })}
              className="ml-1 text-green-500 hover:text-green-700"
            >
              ×
            </button>
          </span>
        ) : null}
        
        {filters.search && (
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700">
            Search: "{filters.search}"
            <button
              onClick={() => onFiltersChange({ search: "" })}
              className="ml-1 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </span>
        )}
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-gray-400 mb-4 text-center text-9xl flex justify-between items-center"><SearchIcon width={400} className="text-center mx-auto" /></div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {t("shop.noProducts.title")}
          </h3>
          <p className="text-gray-500 mb-4">{t("shop.noProducts.subtitle")}</p>
          <button
            onClick={() => onFiltersChange({
              category: "all",
              priceRange: [0, 1000],
              rating: 0,
              sortBy: "featured",
              search: "",
              type: "all",
              status: "all",
            })}
            className="rounded-lg bg-[#059669] px-6 py-3 font-semibold text-white transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductGrid;