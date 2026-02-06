"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import CourseCard from "@/components/modules/courses/CourseCard";
import { usePublicCourses } from "@/hooks/useCourse";
import { BookOpen, ChevronLeft, ChevronRight, Loader2, Search, Sparkles, Tag, X } from "lucide-react";
import { FiFilter } from "react-icons/fi";
import CourseFilters from "./CourseFilters";

export default function PublicCourseListing() {
  const searchParams = useSearchParams();
  const initialLoadRef = useRef(true);
 
  const search = searchParams.get("search")
  const category = searchParams.get("categories")

  // ---------- State ----------
  const [filters, setFilters] = useState({
    categories: [category],
    price: "all",
    search: search
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchDraft, setSearchDraft] = useState("");
  const [page, setPage] = useState(1);
  const limit = 9;

  // ---------- Debounce search ----------
  useEffect(() => {
    const id = setTimeout(() => {
      setFilters(prev => ({
        ...prev,
        search: searchDraft.trim()
      }));
      setPage(1);
    }, 400);
    return () => clearTimeout(id);
  }, [searchDraft]);

  // ---------- API Integration ----------
  const { data, isLoading, isFetching } = usePublicCourses({
    page,
    limit,
    search: filters.search,
    price: filters.price,
    categories: filters.categories,
  });

  const courses = data?.items || [];
  const totalPages = data?.totalPages || 1;

  // ---------- Handlers ----------
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      price: "all",
      search: ""
    });
    setSearchDraft("");
    setPage(1);
  };

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
                  Discover {data?.total || 0}+ courses to boost your skills
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
          {(filters.categories.length > 0 || filters.price !== "all" || filters.search) && (
            <div className="pb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-[var(--color-text)]/70">Active filters:</span>
                {filters.categories.map(categoryId => (
                  <span key={categoryId} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    <Tag className="w-3 h-3" />
                    Category ID: {categoryId}
                  </span>
                ))}
                {filters.price !== "all" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                    {filters.price === "free" ? "Free Only" : "Paid Only"}
                  </span>
                )}
                {filters.search && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-[var(--color-primary)] rounded-full text-sm">
                    <Search className="w-3 h-3" />
                    "{filters.search}"
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
          {/* Desktop Sidebar - Filters */}
          <aside className="hidden lg:block w-72 shrink-0">
            <CourseFilters
              filters={filters}
              onFilterChange={updateFilters}
              onClearFilters={clearFilters}
            />
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
                      {data?.total} Course{data?.total !== 1 ? 's' : ''} Found
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
                            instructorImage: course.instructor?.picture || null,
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
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end lg:hidden">
          <div className="bg-white w-full max-h-[90vh] overflow-y-auto rounded-t-3xl animate-slideUp">
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
              <CourseFilters
                filters={filters}
                onFilterChange={updateFilters}
                onClearFilters={clearFilters}
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
        </div>
      )}

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

/* ---------- EmptyState Component ---------- */
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