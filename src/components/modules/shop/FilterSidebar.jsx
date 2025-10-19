"use client";

import { useState } from "react";
import { FaTimes, FaFilter, FaDollarSign } from "react-icons/fa";

const FilterSidebar = ({ isOpen, onClose, filters, onFiltersChange, productCount }) => {
  const categories = [
    { value: "all", label: "All Categories", count: 0 },
    { value: "electronics", label: "Electronics", count: 5 },
    { value: "clothing", label: "Clothing", count: 3 },
    { value: "accessories", label: "Accessories", count: 2 },
    { value: "sports", label: "Sports", count: 1 },
    { value: "home", label: "Home & Garden", count: 0 }
  ];

  const handlePriceChange = (min, max) => {
    onFiltersChange({
      ...filters,
      priceRange: [min, max]
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed left-0 top-0 z-50 h-full w-80 bg-white shadow-2xl lg:static lg:z-auto lg:w-64 lg:shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <div className="flex items-center gap-2">
            <FaFilter className="text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <FaTimes />
          </button>
        </div>

        <div className="h-full overflow-y-auto p-6">
          {/* Results Count */}
          <div className="mb-6 rounded-lg bg-blue-50 p-4">
            <p className="text-sm text-blue-800">
              Showing <span className="font-semibold">{productCount}</span> products
            </p>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h4 className="mb-4 font-semibold text-gray-800">Categories</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => onFiltersChange({ ...filters, category: category.value })}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-all ${
                    filters.category === category.value
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span>{category.label}</span>
                  {category.count > 0 && (
                    <span className="rounded-full bg-gray-200 px-2 py-1 text-xs">
                      {category.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <h4 className="mb-4 font-semibold text-gray-800">Price Range</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(filters.priceRange[0], parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handlePriceChange(0, 50)}
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm hover:border-blue-500"
                >
                  Under $50
                </button>
                <button
                  onClick={() => handlePriceChange(50, 200)}
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm hover:border-blue-500"
                >
                  $50-$200
                </button>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="mb-8">
            <h4 className="mb-4 font-semibold text-gray-800">Minimum Rating</h4>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => onFiltersChange({ ...filters, rating })}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-all ${
                    filters.rating === rating
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className={`text-sm ${
                          index < rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span>& Up</span>
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => onFiltersChange({
              category: "all",
              priceRange: [0, 1000],
              rating: 0,
              sortBy: "featured"
            })}
            className="w-full rounded-xl border border-gray-300 py-3 font-semibold text-gray-700 transition-all hover:border-red-500 hover:text-red-600"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;