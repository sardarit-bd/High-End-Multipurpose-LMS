"use client";
import InstructorCard from "@/components/modules/instructor/InstructorCard";
import { useState, useEffect, useMemo, useCallback } from "react";
import { FiFilter } from "react-icons/fi";
import { Search, X, Users, Award, Sparkles, Loader2 } from "lucide-react";
import InstructorFilters from "./InstructorFilters";
import { useInstructors } from "@/hooks/useAuth";

export default function InstructorListing() {
  // State
  const [filters, setFilters] = useState({
    expertise: [],
    search: ""
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchDraft, setSearchDraft] = useState("");
  const [page, setPage] = useState(1);
  const limit = 9;

  // Debounce search
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

  // Fetch instructors - only re-fetch when filters or page change
  const { data, isLoading, isFetching, error } = useInstructors({
    page,
    limit,
    search: filters.search,
    expertise: filters.expertise,
  });

  const instructors = data?.items || [];
  const totalItems = data?.total || 0;
  const totalPages = data?.totalPages || 1;

  // Handlers - defined before useMemo
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      expertise: [],
      search: ""
    });
    setSearchDraft("");
    setPage(1);
  }, []);

  // Memoize header to prevent re-renders
  const headerContent = useMemo(() => {
    return (
      <div className="bg-white/95 backdrop-blur-sm border-b border-emerald-100 shadow-[var(--shadow-soft)] sticky top-[65px] z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Title */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-special)] rounded-xl">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[var(--color-text)]">Expert Instructors</h1>
                <p className="text-sm text-[var(--color-text)]/70">
                  Learn from {totalItems} industry experts
                </p>
              </div>
            </div>

            {/* Search */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:max-w-sm">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400">
                  <Search className="w-4 h-4"/>
                </div>
                <input
                autoFocus
                  type="text"
                  placeholder="Search instructors by name or expertise..."
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

          {/* Active Filters */}
          {(filters.expertise.length > 0 || filters.search) && (
            <div className="pb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-[var(--color-text)]/70">Active filters:</span>
                {filters.search && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-[var(--color-primary)] rounded-full text-sm">
                    <Search className="w-3 h-3" />
                    "{filters.search}"
                  </span>
                )}
                {filters.expertise.length > 0 && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    <Award className="w-3 h-3" />
                    {filters.expertise.length} expertise selected
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
    );
  }, [totalItems, searchDraft, filters, clearFilters]); // Added clearFilters to dependencies

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--color-background)] to-emerald-50/30">
        {headerContent}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md">
            <div className="inline-block p-4 bg-red-100 rounded-full mb-4">
              <X className="w-12 h-12 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-red-700 mb-3">Error Loading Instructors</h3>
            <p className="text-red-600 mb-8">
              We encountered an error while loading the instructors.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium"
            >
              <Sparkles className="w-5 h-5" />
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading state for initial load only
 

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-background)] to-emerald-50/30">
      {headerContent}

      {/* Main Layout */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-emerald-100 shadow-[var(--shadow-medium)] p-6 sticky top-32">
              <InstructorFilters
                filters={{ ...filters, totalItems }}
                onFilterChange={updateFilters}
                onClearFilters={clearFilters}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header with Loading Indicator */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-[var(--color-text)]">
                    {isFetching ? "Loading..." : `${instructors.length} Expert${instructors.length !== 1 ? 's' : ''} Found`}
                  </h2>
                  {isFetching && (
                    <Loader2 className="w-4 h-4 animate-spin text-[var(--color-primary)]" />
                  )}
                </div>
                <p className="text-sm text-[var(--color-text)]/70">
                  Page {page} of {totalPages}
                </p>
              </div>
              {/* <div className="text-sm text-[var(--color-text)]/70">
                Sorted by: <span className="font-medium">Rating</span>
              </div> */}
            </div>

            {/* Instructors Grid with Skeleton Loading */}
            {isFetching && instructors.length === 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gradient-to-br from-white to-emerald-50/30 rounded-2xl border border-emerald-200 p-6 animate-pulse">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : instructors.length === 0 ? (
              <div className="bg-gradient-to-br from-white to-emerald-50/30 rounded-2xl border border-dashed border-emerald-200 p-12 text-center">
                <div className="inline-block p-4 bg-emerald-100 rounded-full mb-4">
                  <Users className="w-12 h-12 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--color-text)] mb-3">No Instructors Found</h3>
                <p className="text-[var(--color-text)]/70 max-w-md mx-auto mb-8">
                  Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--color-primary)] to-emerald-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <Sparkles className="w-5 h-5" />
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {instructors.map((instructor) => (
                    <div key={instructor._id} className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                      <InstructorCard instructor={instructor} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1 || isFetching}
                        className="p-2 rounded-lg border border-emerald-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-50 transition-colors"
                      >
                        ← Previous
                      </button>
                      <span className="px-4">
                        Page {page} of {totalPages}
                      </span>
                      <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages || isFetching}
                        className="p-2 rounded-lg border border-emerald-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-50 transition-colors"
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end lg:hidden">
          <div className="bg-white w-full max-h-[90vh] overflow-y-auto rounded-t-3xl animate-slideUp">
            {/* Header */}
            <div className="sticky top-0 bg-white pt-4 pb-2 px-4 border-b border-gray-100">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <FiFilter className="w-4 h-4 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--color-text)]">Filter Instructors</h3>
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
              <InstructorFilters
                filters={filters}
                onFilterChange={updateFilters}
                onClearFilters={clearFilters}
              />
            </div>

            {/* Actions */}
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
    </div>
  );
}