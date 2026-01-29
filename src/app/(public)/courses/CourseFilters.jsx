"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import { DollarSign, Tag } from "lucide-react";
import { FiFilter } from "react-icons/fi";

// Custom hook for categories
const useCategories = () => {
  return useQuery({
    queryKey: ['course-categories'],
    queryFn: async () => {
      const res = await api.get('/courses/categories', { params: { limit: 100 } });
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
};

export default function CourseFilters({ filters, onFilterChange, onClearFilters }) {
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories();
  const categories = categoriesData?.data?.categories || [];
  
  // Local state for UI
  const [localFilters, setLocalFilters] = useState({
    categories: filters.categories || [],
    price: filters.price || "all"
  });

  // Sync with parent filters
  useEffect(() => {
    setLocalFilters({
      categories: filters.categories || [],
      price: filters.price || "all"
    });
  }, [filters]);

  // Helper function to format category title
  const formatCategoryValue = useCallback((title) => {
    return title.toLowerCase().replace(/\s+/g, '_');
  }, []);

  // Handle category toggle
  const toggleCategory = useCallback((categoryTitle) => {
    const formattedCategory = formatCategoryValue(categoryTitle);
    
    setLocalFilters(prev => {
      const newCategories = prev.categories.includes(formattedCategory)
        ? prev.categories.filter(id => id !== formattedCategory)
        : [...prev.categories, formattedCategory];
      
      const newFilters = {
        ...prev,
        categories: newCategories
      };
      
      // Update parent immediately
      onFilterChange({ categories: newCategories });
      
      return newFilters;
    });
  }, [onFilterChange, formatCategoryValue]);

  // Handle price change
  const handlePriceChange = useCallback((price) => {
    setLocalFilters(prev => {
      const newFilters = { ...prev, price };
      onFilterChange({ price });
      return newFilters;
    });
  }, [onFilterChange]);

  // Get category title by ID
  const getCategoryTitle = useCallback((categoryId) => {
    const category = categories.find(c => c._id === categoryId);
    return category?.title || categoryId;
  }, [categories]);

  if (categoriesLoading) {
    return (
      <div className="space-y-8">
        {/* Categories Section Loading */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-blue-100 rounded-lg">
              <Tag className="w-4 h-4 text-blue-600" />
            </div>
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            <div className="ml-auto h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
          </div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-full p-3 rounded-xl border border-gray-200 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Price Section Loading */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-amber-100 rounded-lg">
              <DollarSign className="w-4 h-4 text-amber-600" />
            </div>
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="py-3 px-4 rounded-xl border border-gray-200 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-lg">
            <FiFilter className="w-4 h-4 text-[var(--color-primary)]" />
          </div>
          <h3 className="font-semibold text-[var(--color-text)]">Filters</h3>
        </div>
        <button
          onClick={onClearFilters}
          className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
        >
          Clear all
        </button>
      </div>

      {/* Categories Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-blue-100 rounded-lg">
            <Tag className="w-4 h-4 text-blue-600" />
          </div>
          <h4 className="font-semibold text-[var(--color-text)]">Categories</h4>
          <span className="text-sm text-gray-500 ml-auto">
            {localFilters.categories.length} selected
          </span>
        </div>
        <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
          {categories.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No categories available
            </div>
          ) : (
            categories.map((category) => {
              const formattedCategoryValue = formatCategoryValue(category.title);
              const isSelected = localFilters.categories.includes(formattedCategoryValue);
              
              return (
                <button
                  key={category._id}
                  onClick={() => toggleCategory(category.title)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                    isSelected
                      ? "bg-blue-50 border-blue-200 text-blue-700"
                      : "bg-gray-50/50 border-gray-200 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {category.image && (
                      <div className="w-8 h-8 rounded overflow-hidden">
                        <img 
                          src={category.image} 
                          alt={category.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <span className="font-medium text-left">{category.title}</span>
                  </div>
                  <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                    isSelected
                      ? "bg-blue-500 border-blue-500"
                      : "bg-white border-gray-300"
                  }`}>
                    {isSelected && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </section>

      {/* Price Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-amber-100 rounded-lg">
            <DollarSign className="w-4 h-4 text-amber-600" />
          </div>
          <h4 className="font-semibold text-[var(--color-text)]">Price</h4>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {["all", "free", "paid"].map((price) => (
            <button
              key={price}
              onClick={() => handlePriceChange(price)}
              className={`py-3 px-4 rounded-xl border transition-all ${
                localFilters.price === price
                  ? "bg-amber-50 border-amber-200 text-amber-700 font-medium"
                  : "bg-gray-50/50 border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="capitalize">{price}</span>
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3">
          {localFilters.price === "free"
            ? "Showing only free courses"
            : localFilters.price === "paid"
              ? "Showing only paid courses"
              : "Showing all courses"}
        </p>
      </section>
    </div>
  );
}