"use client";

import { FaCartPlus, FaFilter } from "react-icons/fa";
import ProductCard from "./ProductCard";

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
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header with Sort and Results */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800">
            All Products ({products.length})
          </h2>

          {/* Mobile Filter Button */}
          <button
            onClick={onOpenFilters}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-br from-blue-600 to-purple-700 px-4 py-2 text-white transition-all hover:bg-green-700 lg:hidden"
          >
            <FaFilter />
            <span>Filters</span>
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            className=" flex items-center gap-2 rounded-md bg-blue-600 px-4 py-3 text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl"
          >
            <FaCartPlus />
            <span className="font-semibold">{getCartItemCount()}</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={filters.sortBy}
              onChange={(e) =>
                onFiltersChange({ ...filters, sortBy: e.target.value })
              }
              className="text-black rounded-lg border border-gray-400 px-3 py-2 focus:border-green-500 focus:outline-none"
            >
              <option className="text-black" value="featured">
                Featured
              </option>
              <option className="text-black" value="price-low">
                Price: Low to High
              </option>
              <option className="text-black" value="price-high">
                Price: High to Low
              </option>
              <option className="text-black" value="rating">
                Highest Rated
              </option>
              <option className="text-black" value="name">
                Name A-Z
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No products found
          </h3>
          <p className="text-gray-500">
            Try adjusting your filters to find more products.
          </p>
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
    </div>
  );
};

export default ProductGrid;
