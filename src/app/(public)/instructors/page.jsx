"use client";
import InstructorCard from "@/components/modules/instructor/InstructorCard";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";

// ===== Dummy Instructor Data =====
const instructors = [
  {
    name: "Rolands Granger",
    role: "Developer",
    lessons: 12,
    time: "169hr 20min",
    rating: 4.9,
    reviews: 200,
    image: "/images/ins1.jpg",
    category: "Technology",
  },
  {
    name: "Lisa Lopez",
    role: "Finance",
    lessons: 22,
    time: "15hr 06min",
    rating: 4.4,
    reviews: 130,
    image: "/images/ins2.jpg",
    category: "Management",
  },
  {
    name: "Charles Ruiz",
    role: "Cloud Engineer",
    lessons: 16,
    time: "2hr 25min",
    rating: 4.5,
    reviews: 120,
    image: "/images/ins3.jpg",
    category: "Programming",
  },
  {
    name: "Ivana Tow",
    role: "Corporate Trainer",
    lessons: 25,
    time: "4hr 20min",
    rating: 4.2,
    reviews: 210,
    image: "/images/ins4.jpg",
    category: "Productivity",
  },
  {
    name: "Kevin Leonard",
    role: "Developer",
    lessons: 11,
    time: "7hr 10min",
    rating: 4.5,
    reviews: 140,
    image: "/images/ins5.jpg",
    category: "Technology",
  },
  {
    name: "Rogerina Grogan",
    role: "Vocational",
    lessons: 6,
    time: "19hr 30min",
    rating: 4.6,
    reviews: 180,
    image: "/images/ins6.jpg",
    category: "Art & Media",
  },
  {
    name: "David Roccoz",
    role: "Sports Coach",
    lessons: 4,
    time: "1hr 30min",
    rating: 4.3,
    reviews: 190,
    image: "/images/ins7.jpg",
    category: "Productivity",
  },
  {
    name: "Jeanette Dulaney",
    role: "Technical Trainer",
    lessons: 8,
    time: "4hr 35min",
    rating: 4.3,
    reviews: 150,
    image: "/images/ins8.jpg",
    category: "Programming",
  },
  {
    name: "Debran Andrew",
    role: "Health & Wellness",
    lessons: 8,
    time: "4hr 35min",
    rating: 4.3,
    reviews: 190,
    image: "/images/ins3.jpg",
    category: "General",
  }
];



export default function InstructorListing() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = [
    "Technology",
    "Programming",
    "Management",
    "Productivity",
    "Finance",
  ];

  // ===== Filtering Logic =====
  const filteredInstructors = instructors.filter((inst) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(inst.category);

    const searchMatch =
      searchQuery === "" ||
      inst.name.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && searchMatch;
  });

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
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
          <button className="hidden lg:flex items-center gap-1 text-[var(--color-primary)]">
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
        <div className="flex items-center gap-3 flex-wrap w-full md:w-auto justify-between">
          <span className="md:inline-block hidden text-xs sm:text-sm text-gray-600">
            Showing {filteredInstructors.length} results
          </span>

          {/* Search input */}
          <input
            type="text"
            placeholder="Search instructor"
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
        </aside>

        {/* ===== Instructor Grid ===== */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInstructors.map((inst, i) => (
              <InstructorCard key={i} instructor={inst} />
            ))}
          </div>
        </main>
      </div>

      {/* ===== Mobile Filter Drawer ===== */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 flex justify-end transition-opacity duration-300">
          {/* Sliding panel */}
          <div
            className={`fixed top-16 py-3 px-4 right-0 h-full w-64 bg-[var(--color-background)] shadow-[var(--shadow-medium)] border-r border-[var(--color-primary)] z-50 transform transition-transform duration-500 ease-in-out ${
              isFilterOpen ? "-translate-x-0" : "translate-x-full"
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
          </div>
        </div>
      )}
    </div>
  );
}
