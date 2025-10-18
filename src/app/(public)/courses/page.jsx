"use client";
import CourseCard from "@/components/modules/courses/CourseCard";
import { useState, useMemo, useEffect, useCallback } from "react";
import { FiFilter, FiGrid, FiList } from "react-icons/fi";
import { courses } from "@/components/modules/home/FeaturedCourses";
import { useTranslation } from "react-i18next";

/**
 * CourseListing — compact mobile header + bottom-sheet filters
 * JS/JSX only
 */
export default function CourseListing() {
  const { t } = useTranslation();

  // ---------- State ----------
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedInstructors, setSelectedInstructors] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("all");

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  // search (debounced)
  const [searchDraft, setSearchDraft] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);

  // ---------- Lists (i18n + fallback) ----------
  const categories = useMemo(
    () => [
      t("courses.categories.uiux") || "UI/UX",
      t("courses.categories.productivity") || "Productivity",
      t("courses.categories.management") || "Management",
      t("courses.categories.artMedia") || "Art & Media",
      t("courseListing.categories.programming") || "Programming",
      t("courseListing.categories.technology") || "Technology",
    ],
    [t]
  );
  const instructors = useMemo(
    () => ["Binodh Sation", "David Bentel", "Calvin Johnson", "Maria Chen", "James Lee"],
    []
  );

  // ---------- Handlers ----------
  const toggleCategory = useCallback((cat) => {
    setPage(1);
    setSelectedCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
  }, []);
  const toggleInstructor = useCallback((name) => {
    setPage(1);
    setSelectedInstructors((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));
  }, []);
  const clearFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedInstructors([]);
    setSelectedPrice("all");
    setSearchDraft("");
    setSearchQuery("");
    setPage(1);
  }, []);
  const removeChip = useCallback((type, value) => {
    if (type === "cat" && value) setSelectedCategories((p) => p.filter((c) => c !== value));
    if (type === "inst" && value) setSelectedInstructors((p) => p.filter((i) => i !== value));
    if (type === "price") setSelectedPrice("all");
    if (type === "search") {
      setSearchDraft("");
      setSearchQuery("");
    }
    setPage(1);
  }, []);

  // debounce
  useEffect(() => {
    const id = setTimeout(() => {
      setSearchQuery(searchDraft.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(id);
  }, [searchDraft]);

  // ---------- Filtering ----------
  const filteredCourses = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return courses.filter((course) => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(course.category);
      const instructorMatch = selectedInstructors.length === 0 || selectedInstructors.includes(course.author);
      const priceMatch =
        selectedPrice === "all" ||
        (selectedPrice === "free" && course.isFree) ||
        (selectedPrice === "paid" && !course.isFree);
      const searchMatch =
        q === "" ||
        course.title.toLowerCase().includes(q) ||
        (course?.category || "").toLowerCase().includes(q) ||
        (course?.author || "").toLowerCase().includes(q);
      return categoryMatch && instructorMatch && priceMatch && searchMatch;
    });
  }, [selectedCategories, selectedInstructors, selectedPrice, searchQuery]);

  // ---------- Pagination ----------
  const total = filteredCourses.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageSafe = Math.min(page, totalPages);
  const startIdx = (pageSafe - 1) * pageSize;
  const currentPageItems = filteredCourses.slice(startIdx, startIdx + pageSize);
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  // active count for badge
  const activeCount =
    selectedCategories.length +
    selectedInstructors.length +
    (selectedPrice !== "all" ? 1 : 0) +
    (searchQuery ? 1 : 0);

  // ---------- UI ----------
  return (
    <div className="w-full min-h-screen bg-white">
      {/* ===== Compact Top Controls (mobile optimized) ===== */}
      <div className="sticky top-[65px] z-30 bg-white border-b container mx-auto">
        <div className="container mx-auto px-3 py-2 flex items-center justify-between gap-2">
          {/* Left: Filter + Clear */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md bg-[var(--color-primary)] text-white font-medium"
            >
              <FiFilter size={16} />
              <span>{t("courseListing.filters") || "Filters"}</span>
              {activeCount > 0 && (
                <span className="ml-1 inline-flex items-center justify-center min-w-5 h-5 px-1 text-xs rounded-full bg-white/20">
                  {activeCount}
                </span>
              )}
            </button>
            <button
              onClick={clearFilters}
              className="text-xs px-2 py-1.5 border rounded-md text-[var(--color-primary)] border-[var(--color-primary)]"
            >
              {t("courseListing.clear") || "Clear"}
            </button>
          </div>

          {/* Right: View Toggle */}
          <div className="flex items-center border rounded-md overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-2 py-1 ${viewMode === "grid" ? "bg-[var(--color-primary)] text-white" : "text-gray-700"}`}
              aria-pressed={viewMode === "grid"}
            >
              <FiGrid size={15} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-2 py-1 border-l ${viewMode === "list" ? "bg-[var(--color-primary)] text-white" : "text-gray-700"}`}
              aria-pressed={viewMode === "list"}
            >
              <FiList size={15} />
            </button>
          </div>
        </div>

        {/* Compact Search */}
        <div className="px-3 pb-2">
          <input
            type="text"
            placeholder={t("courseListing.searchPlaceholder") || "Search courses..."}
            value={searchDraft}
            onChange={(e) => setSearchDraft(e.target.value)}
            className="w-full px-3 py-1.5 rounded-md border border-gray-300 text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
          />

          {/* Quick chips row (only when active) */}
          {(selectedCategories.length > 0 ||
            selectedInstructors.length > 0 ||
            selectedPrice !== "all" ||
            !!searchQuery) && (
              <div className="mt-2 overflow-x-auto no-scrollbar flex gap-2 py-1">
                {searchQuery && <Chip label={`“${searchQuery}”`} onRemove={() => removeChip("search")} />}
                {selectedCategories.slice(0, 3).map((c) => (
                  <Chip key={`qc-${c}`} label={c} onRemove={() => removeChip("cat", c)} />
                ))}
                {selectedInstructors.slice(0, 2).map((i) => (
                  <Chip key={`qi-${i}`} label={i} onRemove={() => removeChip("inst", i)} />
                ))}
                {selectedPrice !== "all" && (
                  <Chip
                    label={`${t("courseListing.price") || "Price"}: ${t(`courseListing.priceOptions.${selectedPrice}`) || selectedPrice
                      }`}
                    onRemove={() => removeChip("price")}
                  />
                )}
              </div>
            )}
        </div>
      </div>

      {/* ===== Layout: Sidebar + Grid/List ===== */}
      <div className="container mx-auto">
        <div className="flex">
          {/* Desktop Sidebar */}
          <aside className="w-64 shrink-0 h-[calc(100dvh-130px)] sticky top-[130px] overflow-y-auto border-r border-gray-200 bg-white p-4 hidden lg:block">
            <SidebarFilters
              categories={categories}
              instructors={instructors}
              selectedCategories={selectedCategories}
              selectedInstructors={selectedInstructors}
              selectedPrice={selectedPrice}
              toggleCategory={toggleCategory}
              toggleInstructor={toggleInstructor}
              setSelectedPrice={setSelectedPrice}
            />
          </aside>

          {/* Main */}
          <main className="flex-1 p-4 sm:p-6">
            {total === 0 ? (
              <EmptyState onReset={clearFilters} />
            ) : (
              <>
                <div className={viewMode === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6" : "grid grid-cols-1 gap-4"}>
                  {currentPageItems.map((course, i) => (
                    <div key={i} className={viewMode === "list" ? "w-full" : ""}>
                      <CourseCard course={course} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-8 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={pageSafe === 1}
                    className="px-3 py-2 border rounded-md disabled:opacity-40"
                    aria-label="Previous page"
                  >
                    ←
                  </button>
                  <span className="text-sm">
                    {t("courseListing.page") || "Page"} {pageSafe} / {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={pageSafe === totalPages}
                    className="px-3 py-2 border rounded-md disabled:opacity-40"
                    aria-label="Next page"
                  >
                    →
                  </button>

                  {/* Page size (hide on xs to save space) */}
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setPage(1);
                    }}
                    className="hidden sm:block text-sm border rounded-md px-2 py-2"
                    aria-label="Results per page"
                  >
                    {[9, 12, 18, 24].map((n) => (
                      <option key={n} value={n}>
                        {n}/page
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </main>
        </div>
      </div>

      {/* ===== Mobile Bottom-Sheet Filters ===== */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/40" role="dialog" aria-modal="true" onClick={() => setIsFilterOpen(false)}>
          <BottomSheet onClose={() => setIsFilterOpen(false)}>
            <div className="p-4 space-y-6">
              <MobileFilters
                categories={categories}
                instructors={instructors}
                selectedCategories={selectedCategories}
                selectedInstructors={selectedInstructors}
                selectedPrice={selectedPrice}
                toggleCategory={toggleCategory}
                toggleInstructor={toggleInstructor}
                setSelectedPrice={setSelectedPrice}
              />

              <div className="sticky bottom-0 left-0 right-0 bg-[var(--color-background)] pt-2">
                <div className="flex gap-2">
                  <button onClick={() => setIsFilterOpen(false)} className="flex-1 py-3 rounded-md bg-[var(--color-primary)] text-white">
                    {t("courseListing.apply") || "Apply"}
                  </button>
                  <button
                    onClick={() => {
                      clearFilters();
                      setIsFilterOpen(false);
                    }}
                    className="flex-1 py-3 rounded-md border"
                  >
                    {t("courseListing.clear") || "Clear"}
                  </button>
                </div>
              </div>
            </div>
          </BottomSheet>
        </div>
      )}

      {/* global helpers */}
      <style jsx global>{`
        @keyframes slideIn {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0%); opacity: 1; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

/* ===================== Subcomponents ===================== */

function SidebarFilters({
  categories,
  instructors,
  selectedCategories,
  selectedInstructors,
  selectedPrice,
  toggleCategory,
  toggleInstructor,
  setSelectedPrice,
}) {
  const { t } = useTranslation();
  return (
    <div className="space-y-6 text-sm">
      {/* Categories */}
      <section>
        <h4 className="font-medium mb-2 text-gray-700">{t("courseListing.categories") || "Categories"}</h4>
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
                <span className="text-[var(--color-text)]">{cat}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      {/* Instructors */}
      <section>
        <h4 className="font-medium mb-2 text-gray-700">{t("courseListing.instructors") || "Instructors"}</h4>
        <ul className="space-y-2">
          {instructors.map((inst) => (
            <li key={inst}>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedInstructors.includes(inst)}
                  onChange={() => toggleInstructor(inst)}
                  className="accent-[var(--color-secondary)]"
                />
                <span className="text-[var(--color-text)]">{inst}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      {/* Price */}
      <section>
        <h4 className="font-medium mb-2 text-gray-700">{t("courseListing.price") || "Price"}</h4>
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
                <span className="text-[var(--color-text)] capitalize">
                  {t(`courseListing.priceOptions.${p}`) || p}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function MobileFilters(props) {
  return <SidebarFilters {...props} />;
}

function Chip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs border bg-white">
      {label}
      <button
        onClick={onRemove}
        className="ml-1 leading-none opacity-70 hover:opacity-100"
        aria-label={`Remove ${label}`}
        title="Remove"
      >
        ×
      </button>
    </span>
  );
}

function EmptyState({ onReset }) {
  return (
    <div className="border rounded-xl p-10 text-center bg-[var(--color-text)]/5">
      <h3 className="text-lg font-semibold mb-2">No courses match your filters</h3>
      <p className="text-sm text-gray-600 mb-6">Try clearing filters or adjusting your search.</p>
      <button onClick={onReset} className="px-4 py-2 rounded-md bg-[var(--color-primary)] text-white">
        Reset filters
      </button>
    </div>
  );
}

/** BottomSheet (overlay, no layout push; swipe-down / scroll-to-close) */
function BottomSheet({ children, onClose }) {
  const [startY, setStartY] = useState(null);
  const [translate, setTranslate] = useState(0);

  useEffect(() => {
    const onScroll = () => onClose && onClose();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onClose]);

  const handleTouchStart = (e) => setStartY(e.touches[0].clientY);
  const handleTouchMove = (e) => {
    if (startY == null) return;
    const dy = e.touches[0].clientY - startY;
    if (dy > 0) setTranslate(Math.min(dy, 300));
  };
  const handleTouchEnd = () => {
    if (translate > 120) onClose && onClose();
    setTranslate(0);
    setStartY(null);
  };

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 bg-[var(--color-background)] rounded-t-2xl shadow-2xl animate-[slideIn_.25s_ease-out]"
      style={{ transform: `translateY(${translate}px)`, maxHeight: "85vh" }}
      onClick={(e) => e.stopPropagation()}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* drag handle */}
      <div className="w-full flex items-center justify-center pt-2 pb-1">
        <span className="h-1.5 w-10 rounded-full bg-gray-300" />
      </div>
      <div className="overflow-y-auto px-4 pb-6" style={{ maxHeight: "calc(85vh - 48px)" }}>
        {children}
      </div>
    </div>
  );
}
