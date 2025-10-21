"use client";

import { FaTimes, FaFilter } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const FilterSidebar = ({ isOpen, onClose, filters, onFiltersChange, productCount }) => {
  const { t } = useTranslation();

  const categories = [
    { value: "all", label: t("shop.filters.allCategories"), count: 0 },
    { value: "electronics", label: t("shop.filters.electronics"), count: 5 },
    { value: "clothing", label: t("shop.filters.clothing"), count: 3 },
    { value: "accessories", label: t("shop.filters.accessories"), count: 2 },
    { value: "sports", label: t("shop.filters.sports"), count: 1 },
    { value: "home", label: t("shop.filters.homeGarden"), count: 0 },
  ];

  const handleCategoryChange = (value) => {
    onFiltersChange({ ...filters, category: value });
    autoCloseOnMobile();
  };

  const handleRatingChange = (rating) => {
    onFiltersChange({ ...filters, rating });
    autoCloseOnMobile();
  };

  // only auto-close on mobile/tablet
  const autoCloseOnMobile = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setTimeout(() => {
        onClose();
      }, 200);
    }
  };

  // show always on desktop
  if (!isOpen && typeof window !== "undefined" && window.innerWidth < 1024)
    return null;

  return (
    <section>
      {/* Overlay for mobile/tablet */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 h-screen w-72 sm:w-80 bg-white shadow-2xl
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:z-auto lg:w-64 lg:h-[1050px] lg:translate-x-0 lg:shadow-lg
          overflow-hidden
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-5 sm:p-6 bg-white">
          <div className="flex items-center gap-2">
            <FaFilter className="text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              {t("shop.filters.title")}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden rounded-full p-2 text-gray-500 hover:bg-gray-100"
          >
            <FaTimes size={18} />
          </button>
        </div>

        
        <div className="h-[calc(100vh-64px)] overflow-y-scroll p-5 sm:p-6 no-scrollbar">
          {/* Results Count */}
          <div className="mb-6 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
            {t("shop.filters.showingResults", { count: productCount })}
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h4 className="mb-4 font-semibold text-gray-800">
              {t("shop.filters.categories")}
            </h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => handleCategoryChange(category.value)}
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
            <h4 className="mb-4 font-semibold text-gray-800">
              {t("shop.filters.priceRange")}
            </h4>
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
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    priceRange: [filters.priceRange[0], parseInt(e.target.value)],
                  })
                }
                onMouseUp={autoCloseOnMobile}
                onTouchEnd={autoCloseOnMobile}
                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    onFiltersChange({ ...filters, priceRange: [0, 50] });
                    autoCloseOnMobile();
                  }}
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  {t("shop.filters.under50")}
                </button>
                <button
                  onClick={() => {
                    onFiltersChange({ ...filters, priceRange: [50, 200] });
                    autoCloseOnMobile();
                  }}
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  {t("shop.filters.fiftyTo200")}
                </button>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="mb-8">
            <h4 className="mb-4 font-semibold text-gray-800">
              {t("shop.filters.minimumRating")}
            </h4>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRatingChange(rating)}
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
                  <span>{t("shop.filters.andUp")}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => {
              onFiltersChange({
                category: "all",
                priceRange: [0, 1000],
                rating: 0,
                sortBy: "featured",
                search: "",
              });
              autoCloseOnMobile();
            }}
            className="w-full rounded-xl border border-gray-300 py-3 font-semibold text-gray-700 transition-all hover:border-red-500 hover:text-red-600 hover:bg-red-50"
          >
            {t("shop.filters.clearAll")}
          </button>
        </div>
      </div>

      {/* Global CSS for hiding scrollbar */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default FilterSidebar;