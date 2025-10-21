"use client";

import { useTranslation } from "react-i18next";
import { FaCartPlus, FaFilter } from "react-icons/fa";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

const ProductGrid = ({
  products,
  loading,
  onAddToCart,
  filters,
  onFiltersChange,
  onOpenFilters,
  getCartItemCount,
  setIsCartOpen
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
            className="flex items-center gap-2 rounded-lg bg-gradient-to-br from-blue-600 to-purple-700 px-4 py-2 text-white transition-all hover:bg-green-700 lg:hidden"
          >
            <FaFilter />
            <span>{t("shop.filters.title")}</span>
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-3 text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl"
          >
            <FaCartPlus />
            <span className="font-semibold">{getCartItemCount()}</span>
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-4">
          <select
            value={filters.sortBy}
            onChange={(e) =>
              onFiltersChange({ ...filters, sortBy: e.target.value })
            }
            className="text-black rounded-lg border border-gray-400 px-3 py-2 focus:border-green-500 focus:outline-none"
          >
            <option value="featured">{t("shop.sort.featured")}</option>
            <option value="price-low">{t("shop.sort.lowToHigh")}</option>
            <option value="price-high">{t("shop.sort.highToLow")}</option>
            <option value="rating">{t("shop.sort.rating")}</option>
            <option value="name">{t("shop.sort.nameAZ")}</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {t("shop.noProducts.title")}
          </h3>
          <p className="text-gray-500">{t("shop.noProducts.subtitle")}</p>
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
