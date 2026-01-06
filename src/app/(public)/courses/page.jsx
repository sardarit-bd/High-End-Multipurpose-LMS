"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { FiFilter } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import CourseCard from "@/components/modules/courses/CourseCard";
import { usePublicCourses } from "@/hooks/useCourse";

export default function PublicCourseListing() {
  const { t } = useTranslation();

  // ---------- State ----------
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchDraft, setSearchDraft] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);

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
    <div className="w-full min-h-screen bg-white text-gray-800">
      {/* ===== Top Controls ===== */}
      <div className="sticky top-[65px] z-30 bg-white mb-5 border-b">
        <div className="container mx-auto px-3 py-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md bg-[var(--color-primary)] text-white font-medium"
            >
              <FiFilter size={16} />
              <span>{t("courseListing.filters") || "Filters"}</span>
            </button>
            <button
              onClick={clearFilters}
              className="text-xs px-2 py-1.5 border rounded-md text-[var(--color-primary)] border-[var(--color-primary)]"
            >
              {t("courseListing.clear") || "Clear"}
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="px-3 pb-2 container mx-auto">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchDraft}
            onChange={(e) => setSearchDraft(e.target.value)}
            className="w-full px-3 py-1.5 rounded-md border border-gray-300 text-sm placeholder-gray-500 outline-0"
          />
        </div>
      </div>

      {/* ===== Layout ===== */}
      <div className="container mx-auto">
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 shrink-0 h-[calc(100dvh-160px)] sticky top-[160px] overflow-y-auto border-r border-gray-200 bg-white p-4 hidden lg:block">
            <SidebarFilters
              categories={categories}
              selectedCategories={selectedCategories}
              selectedPrice={selectedPrice}
              toggleCategory={toggleCategory}
              setSelectedPrice={setSelectedPrice}
            />
          </aside>

          {/* Main */}
          <main className="flex-1 p-4 sm:p-6">
            {isLoading || isFetching ? (
              <div className="text-center text-gray-500 py-10">Loading courses...</div>
            ) : courses.length === 0 ? (
              <EmptyState onReset={clearFilters} />
            ) : (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <Link key={course._id} href={`/courses/${course.slug}`} className="block group">
                      <CourseCard
                        course={{
                          title: course.title,
                          thumbnail:
                            course.thumbnail ||
                            "https://via.placeholder.com/400x250?text=No+Image",
                          category: course.category,
                          author: course.instructor?.name || "Unknown",
                          price: course.price,
                          level: course.level,
                          slug: course.slug
                        }}
                      />
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-2">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-3 py-2 border rounded-md disabled:opacity-40"
                    >
                      ←
                    </button>
                    <span className="text-sm">
                      Page {page} / {totalPages}
                    </span>
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="px-3 py-2 border rounded-md disabled:opacity-40"
                    >
                      →
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* ===== Mobile Filter Sheet ===== */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/50 flex items-end lg:hidden"
          onClick={() => setIsFilterOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full bg-white rounded-t-2xl shadow-xl p-5 animate-slideUp"
          >
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3" />
            <SidebarFilters
              categories={categories}
              selectedCategories={selectedCategories}
              selectedPrice={selectedPrice}
              toggleCategory={toggleCategory}
              setSelectedPrice={setSelectedPrice}
            />
            <div className="flex gap-2 mt-5">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="flex-1 py-3 rounded-md bg-[var(--color-primary)] text-white font-medium"
              >
                Apply
              </button>
              <button
                onClick={() => {
                  clearFilters();
                  setIsFilterOpen(false);
                }}
                className="flex-1 py-3 rounded-md border border-gray-300 text-gray-700 font-medium"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation */}
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
    <div className="space-y-6 text-sm text-gray-800">
      <section>
        <h4 className="font-semibold mb-2">Categories</h4>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat}>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="accent-[var(--color-primary)]"
                />
                <span>{cat}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h4 className="font-semibold mb-2">Price</h4>
        <ul className="space-y-2">
          {["all", "free", "paid"].map((p) => (
            <li key={p}>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  checked={selectedPrice === p}
                  onChange={() => setSelectedPrice(p)}
                  className="accent-[var(--color-accent)]"
                />
                <span className="capitalize">{p}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function EmptyState({ onReset }) {
  return (
    <div className="border rounded-xl p-10 text-center bg-gray-50">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">No courses found</h3>
      <p className="text-sm text-gray-600 mb-6">
        Try clearing filters or adjusting your search.
      </p>
      <button
        onClick={onReset}
        className="px-4 py-2 rounded-md bg-[var(--color-primary)] text-white"
      >
        Reset filters
      </button>
    </div>
  );
}
