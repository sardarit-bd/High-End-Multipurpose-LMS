"use client";
import CourseCard from "@/components/modules/courses/CourseCard";
import { useState } from "react";
import { FiFilter, FiGrid, FiList } from "react-icons/fi";
import { courses } from "@/components/modules/home/FeaturedCourses";

export default function CourseListing() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedInstructors, setSelectedInstructors] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = [
    "UI/UX",
    "Productivity",
    "Management",
    "Art & Media",
    "Programming",
    "Technology",
  ];

  const instructors = [
    "Binodh Sation",
    "David Bentel",
    "Calvin Johnson",
    "Maria Chen",
    "James Lee",
  ];


  // ===== Filtering Logic =====
  const filteredCourses = courses.filter((course) => {
    // Category filter
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(course.category);

    // Instructor filter
    const instructorMatch =
      selectedInstructors.length === 0 ||
      selectedInstructors.includes(course.author);

    // Price filter
    const priceMatch =
      selectedPrice === "all" ||
      (selectedPrice === "free" && course.isFree) ||
      (selectedPrice === "paid" && !course.isFree);

    // Search filter
    const searchMatch =
      searchQuery === "" ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && instructorMatch && priceMatch && searchMatch;
  });

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleInstructor = (inst) => {
    setSelectedInstructors((prev) =>
      prev.includes(inst) ? prev.filter((i) => i !== inst) : [...prev, inst]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedInstructors([]);
    setSelectedPrice("all");
    setSearchQuery("");
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* ===== Sticky Top Bar ===== */}
      <div className="sticky container mx-auto top-[65px] z-30 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex flex-col md:flex-row flex-wrap items-center justify-between gap-3">
        {/* Left side: Filters */}
        <div className="flex md:items-center justify-between w-full md:w-auto gap-2">
          <button
            className="lg:hidden flex items-center py-2 px-4 gap-1 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium rounded-md mt-2"
            onClick={() => setIsFilterOpen(true)}
          >
            <FiFilter size={18} />
            <span className="text-sm font-semibold">Filters</span>
          </button>
          <button
            className="hidden lg:flex items-center gap-1 text-[var(--color-primary)]"
          >
            <FiFilter size={18} />
            <span className="text-sm font-semibold">Filters</span>
          </button>
          <button
            onClick={clearFilters}
            className="text-xs px-3 py-2 bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)]"
          >
            Clear
          </button>
        </div>

        {/* Right side: Results + Controls */}
        <div className="flex  items-center gap-3 flex-wrap w-full md:w-auto justify-between">
          <span className="md:inline-block hidden text-xs sm:text-sm text-gray-600">
            Showing {Math.min(9, filteredCourses.length)} of{" "}
            {filteredCourses.length} results
          </span>


          {/* Sort dropdown */}
          {/* <select className="px-3 py-2 bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]">
            <option>Newly Published</option>
            <option>Popular</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select> */}

          {/* Search input */}
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
          />
        </div>
      </div>

      <div className="flex container mx-auto">
        {/* ===== Sidebar (desktop) ===== */}
        <aside className="w-64 h-screen sticky top-[135px] overflow-y-auto border-r border-gray-200 bg-white p-4 hidden lg:block">
          {/* Categories */}
          <div className="mb-6">
            <h4 className="font-medium text-sm mb-2 text-gray-700">Categories</h4>
            <ul className="space-y-2 text-sm">
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
          </div>

          {/* Instructors */}
          <div className="mb-6">
            <h4 className="font-medium text-sm mb-2 text-gray-700">Instructors</h4>
            <ul className="space-y-2 text-sm">
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
          </div>

          {/* Price */}
          <div>
            <h4 className="font-medium text-sm mb-2 text-gray-700">Price</h4>
            <ul className="space-y-2 text-sm">
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
                      {p}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* ===== Course Grid/List ===== */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCourses.map((course, i) => (
              <CourseCard key={i} course={course} />
            ))}
          </div>
        </main>
      </div>

      {/* ===== Mobile Filter Drawer ===== */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 flex justify-end transition-opacity duration-300">
          {/* Sliding panel */}
          <div
            className={`fixed top-16 py-3 px-4 right-0 h-full w-64 bg-[var(--color-background)] shadow-[var(--shadow-medium)] border-r border-[var(--color-primary)] z-50 transform transition-transform duration-500 ease-in-out ${isFilterOpen ? "-translate-x-0" : "translate-x-full"
              }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-[var(--color-text)]">Filters</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
              >
                Close
              </button>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-medium text-sm mb-2 text-gray-700">Categories</h4>
              <ul className="space-y-2 text-sm">
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
            </div>

            {/* Instructors */}
            <div className="mb-6">
              <h4 className="font-medium text-sm mb-2 text-gray-700">Instructors</h4>
              <ul className="space-y-2 text-sm">
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
            </div>

            {/* Price */}
            <div>
              <h4 className="font-medium text-sm mb-2 text-gray-700">Price</h4>
              <ul className="space-y-2 text-sm">
                {["all", "free", "paid"].map((p) => (
                  <li key={p}>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="priceMobile"
                        checked={selectedPrice === p}
                        onChange={() => setSelectedPrice(p)}
                        className="accent-[var(--color-accent)]"
                      />
                      <span className="text-[var(--color-text)] capitalize">{p}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
