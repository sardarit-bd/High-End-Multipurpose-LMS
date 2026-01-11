"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import CourseCard from "@/components/modules/courses/CourseCard";
import { usePublicCourses } from "@/hooks/useCourse";
import { BookOpen, ChevronLeft, ChevronRight, DollarSign, Loader2, Search, Sparkles, Tag, X } from "lucide-react";
import { FiFilter } from "react-icons/fi";

export default function PublicCourseListing() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();

  // ---------- State ----------
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchDraft, setSearchDraft] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);

  // ---------- Initialize from URL parameters ----------
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    const urlCategories = searchParams.get('categories');

    if (urlSearch) {
      setSearchDraft(urlSearch);
      setSearchQuery(urlSearch);
    }

    if (urlCategories) {
      // Split comma-separated categories and filter to only valid ones
      const categoryList = urlCategories.split(',').map(cat => cat.trim());
      const validCategories = categoryList.filter(cat =>
        ["Programming", "Database", "Design", "Technology", "Management"].includes(cat)
      );
      setSelectedCategories(validCategories);
    }
  }, [searchParams]);

  // ---------- Debounce search ----------
  useEffect(() => {
    const id = setTimeout(() => {
      setSearchQuery(searchDraft.trim());
      setPage(1);
    }, 400);
    return () => clearTimeout(id);
  }, [searchDraft]);

  // ---------- Categories ----------
  const categories = useMemo(
    () => ["Programming", "Database", "Design", "Technology", "Management"],
    []
  );

  // ---------- Handlers ----------
  const toggleCategory = useCallback((cat) => {
    setPage(1);
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedPrice("all");
    setSearchDraft("");
    setSearchQuery("");
    setPage(1);
  }, []);

  // ---------- API Integration ----------
  const { data, isLoading, isFetching } = usePublicCourses({
    page,
    limit,
    search: searchQuery,
    price: selectedPrice,
    categories: selectedCategories,
  });

  const courses = data?.items || [];
  const totalPages = data?.totalPages || 1;

  // ---------- UI ----------
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-background)] to-emerald-50/30">
      {/* ===== Modern Header ===== */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-emerald-100 shadow-[var(--shadow-soft)] sticky top-[65px] z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Left side - Title & Stats */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-special)] rounded-xl">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[var(--color-text)]">Browse Courses</h1>
                <p className="text-sm text-[var(--color-text)]/70">
                  Discover {data?.totalItems || 0}+ courses to boost your skills
                </p>
              </div>
            </div>

            {/* Right side - Controls */}
            <div className="flex items-center gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 sm:max-w-sm">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Search courses by title, instructor, or topic..."
                  value={searchDraft}
                  onChange={(e) => setSearchDraft(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-emerald-50/50 border border-emerald-200 rounded-xl text-[var(--color-text)] placeholder-emerald-400/70 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                />
              </div>

              {/* Filter Button */}
              <button
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-emerald-200 text-[var(--color-text)] rounded-xl hover:bg-emerald-50 transition-colors lg:hidden"
              >
                <FiFilter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Active Filters Bar */}
          {(selectedCategories.length > 0 || selectedPrice !== "all" || searchQuery) && (
            <div className="pb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-[var(--color-text)]/70">Active filters:</span>
                {selectedCategories.map(cat => (
                  <span key={cat} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    <Tag className="w-3 h-3" />
                    {cat}
                  </span>
                ))}
                {selectedPrice !== "all" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                    <DollarSign className="w-3 h-3" />
                    {selectedPrice === "free" ? "Free Only" : "Paid Only"}
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-[var(--color-primary)] rounded-full text-sm">
                    <Search className="w-3 h-3" />
                    "{searchQuery}"
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full text-sm transition-colors ml-2"
                >
                  <X className="w-3 h-3" />
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===== Main Layout ===== */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-emerald-100 shadow-[var(--shadow-medium)] p-6 sticky top-32">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-lg">
                    <FiFilter className="w-4 h-4 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="font-semibold text-[var(--color-text)]">Filters</h3>
                </div>
                <button
                  onClick={clearFilters}
                  className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
                >
                  Clear all
                </button>
              </div>

              <SidebarFilters
                categories={categories}
                selectedCategories={selectedCategories}
                selectedPrice={selectedPrice}
                toggleCategory={toggleCategory}
                setSelectedPrice={setSelectedPrice}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {isLoading || isFetching ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mb-4">
                  <Loader2 className="w-12 h-12 text-[var(--color-primary)]" />
                </div>
                <h3 className="text-lg font-medium text-[var(--color-text)] mb-2">Loading Courses</h3>
                <p className="text-[var(--color-text)]/70">Finding the best courses for you...</p>
              </div>
            ) : courses.length === 0 ? (
              <EmptyState onReset={clearFilters} />
            ) : (
              <>
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-[var(--color-text)]">
                      {data?.totalItems} Course{data?.totalItems !== 1 ? 's' : ''} Found
                    </h2>
                    <p className="text-sm text-[var(--color-text)]/70">
                      Page {page} of {totalPages}
                    </p>
                  </div>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <Link key={course._id} href={`/courses/${course.slug}`} className="block group">
                      <div className="transform transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl">
                        <CourseCard
                          course={{
                            title: course.title,
                            thumbnail:
                              course.thumbnail ||
                              "https://via.placeholder.com/400x250?text=No+Image",
                            category: course.category || "Uncategorized",
                            author: course.instructor?.name || course.instructor?.email || "Unknown Instructor",
                            price: course.price || 0,
                            level: course.level,
                            slug: course.slug,
                            lessons: course.lessonCount || 0,
                            lessonCount: course.lessonCount || 0,
                            duration: course.duration || "0m"
                          }}
                        />
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Modern Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-emerald-100">
                    <div className="text-sm text-[var(--color-text)]/70">
                      {/* Showing {((page - 1) * limit) + 1}-{Math.min(page * limit, data?.totalItems)} of {data?.totalItems} courses */}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="p-2 rounded-lg border border-emerald-200 text-[var(--color-text)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-50 transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (page <= 3) {
                          pageNum = i + 1;
                        } else if (page >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = page - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setPage(pageNum)}
                            className={`w-10 h-10 rounded-lg font-medium transition-all ${page === pageNum
                                ? "bg-gradient-to-r from-[var(--color-primary)] to-emerald-500 text-white shadow-md"
                                : "text-[var(--color-text)] hover:bg-emerald-50 border border-emerald-200"
                              }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      
                      {totalPages > 5 && (
                        <span className="px-2 text-gray-400">...</span>
                      )}
                      
                      <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="p-2 rounded-lg border border-emerald-200 text-[var(--color-text)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-50 transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* ===== Mobile Filter Modal ===== */}
      <AnimatedModal isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
        <div className="bg-white w-full max-h-[90vh] overflow-y-auto rounded-t-3xl">
          {/* Drag Handle */}
          <div className="sticky top-0 bg-white pt-4 pb-2 px-4 border-b border-gray-100">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <FiFilter className="w-4 h-4 text-[var(--color-primary)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-text)]">Filter Courses</h3>
              </div>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Filter Content */}
          <div className="p-6">
            <SidebarFilters
              categories={categories}
              selectedCategories={selectedCategories}
              selectedPrice={selectedPrice}
              toggleCategory={toggleCategory}
              setSelectedPrice={setSelectedPrice}
            />
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-0 bg-white p-6 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  clearFilters();
                  setIsFilterOpen(false);
                }}
                className="py-3 px-4 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="py-3 px-4 bg-gradient-to-r from-[var(--color-primary)] to-emerald-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </AnimatedModal>
    </div>
  );
}

/* ---------- Modal Component ---------- */
function AnimatedModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end lg:hidden"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-slideUp"
      >
        {children}
      </div>
      <style jsx global>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

/* ---------- Subcomponents ---------- */
function SidebarFilters({
  categories,
  selectedCategories,
  selectedPrice,
  toggleCategory,
  setSelectedPrice,
}) {
  return (
    <div className="space-y-8">
      {/* Categories Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-blue-100 rounded-lg">
            <Tag className="w-4 h-4 text-blue-600" />
          </div>
          <h4 className="font-semibold text-[var(--color-text)]">Categories</h4>
          <span className="text-sm text-gray-500 ml-auto">
            {selectedCategories.length} selected
          </span>
        </div>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${selectedCategories.includes(cat)
                  ? "bg-blue-50 border-blue-200 text-blue-700"
                  : "bg-gray-50/50 border-gray-200 text-gray-700 hover:bg-gray-100"
                }`}
            >
              <span className="font-medium">{cat}</span>
              <div className={`w-5 h-5 rounded border flex items-center justify-center ${selectedCategories.includes(cat)
                  ? "bg-blue-500 border-blue-500"
                  : "bg-white border-gray-300"
                }`}>
                {selectedCategories.includes(cat) && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
            </button>
          ))}
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
          {["all", "free", "paid"].map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPrice(p)}
              className={`py-3 px-4 rounded-xl border transition-all ${selectedPrice === p
                  ? "bg-amber-50 border-amber-200 text-amber-700 font-medium"
                  : "bg-gray-50/50 border-gray-200 text-gray-700 hover:bg-gray-100"
                }`}
            >
              <span className="capitalize">{p}</span>
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3">
          {selectedPrice === "free" 
            ? "Showing only free courses" 
            : selectedPrice === "paid" 
            ? "Showing only paid courses" 
            : "Showing all courses"}
        </p>
      </section>
    </div>
  );
}

function EmptyState({ onReset }) {
  return (
    <div className="bg-gradient-to-br from-white to-emerald-50/30 rounded-2xl border border-dashed border-emerald-200 p-12 text-center">
      <div className="inline-block p-4 bg-emerald-100 rounded-full mb-4">
        <BookOpen className="w-12 h-12 text-emerald-500" />
      </div>
      <h3 className="text-2xl font-bold text-[var(--color-text)] mb-3">No Courses Found</h3>
      <p className="text-[var(--color-text)]/70 max-w-md mx-auto mb-8">
        We couldn't find any courses matching your criteria. Try adjusting your filters or search terms.
      </p>
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--color-primary)] to-emerald-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105"
      >
        <Sparkles className="w-5 h-5" />
        Reset All Filters
      </button>
    </div>
  );
}