"use client";
import InstructorCard from "@/components/modules/instructor/InstructorCard";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { Clock as ClockIcon,  Search, X, Users, Award, Star, Clock, BookOpen, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function InstructorListing() {
  const { t } = useTranslation();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // ===== Instructor Data with Translation =====
  const instructors = [
    {
      name: "Rolands Granger",
      role: t("instructors.roles.developer") || "Developer",
      lessons: 12,
      time: "169hr 20min",
      rating: 4.9,
      reviews: 200,
      image: "/images/ins1.jpg",
      category: t("instructorListing.categories.technology") || "Technology",
    },
    {
      name: "Lisa Lopez",
      role: t("instructors.roles.finance") || "Finance",
      lessons: 22,
      time: "15hr 06min",
      rating: 4.4,
      reviews: 130,
      image: "/images/ins2.jpg",
      category: t("instructorListing.categories.management") || "Management",
    },
    {
      name: "Charles Ruiz",
      role: t("instructors.roles.cloudEngineer") || "Cloud Engineer",
      lessons: 16,
      time: "2hr 25min",
      rating: 4.5,
      reviews: 120,
      image: "/images/ins3.jpg",
      category: t("instructorListing.categories.programming") || "Programming",
    },
    {
      name: "Ivana Tow",
      role: t("instructors.roles.corporateTrainer") || "Corporate Trainer",
      lessons: 25,
      time: "4hr 20min",
      rating: 4.2,
      reviews: 210,
      image: "/images/ins4.jpg",
      category: t("instructorListing.categories.productivity") || "Productivity",
    },
    {
      name: "Kevin Leonard",
      role: t("instructors.roles.developer") || "Developer",
      lessons: 11,
      time: "7hr 10min",
      rating: 4.5,
      reviews: 140,
      image: "/images/ins5.jpg",
      category: t("instructorListing.categories.technology") || "Technology",
    },
    {
      name: "Rogerina Grogan",
      role: t("instructors.roles.vocational") || "Vocational",
      lessons: 6,
      time: "19hr 30min",
      rating: 4.6,
      reviews: 180,
      image: "/images/ins6.jpg",
      category: t("courses.categories.artMedia") || "Art & Media",
    },
    {
      name: "David Roccoz",
      role: t("instructors.roles.sportsCoach") || "Sports Coach",
      lessons: 4,
      time: "1hr 30min",
      rating: 4.3,
      reviews: 190,
      image: "/images/ins7.jpg",
      category: t("instructorListing.categories.productivity") || "Productivity",
    },
    {
      name: "Jeanette Dulaney",
      role: t("instructors.roles.technicalTrainer") || "Technical Trainer",
      lessons: 8,
      time: "4hr 35min",
      rating: 4.3,
      reviews: 150,
      image: "/images/ins8.jpg",
      category: t("instructorListing.categories.programming") || "Programming",
    },
    {
      name: "Debran Andrew",
      role: t("instructors.roles.healthWellness") || "Health & Wellness",
      lessons: 8,
      time: "4hr 35min",
      rating: 4.3,
      reviews: 190,
      image: "/images/ins3.jpg",
      category: t("instructors.categories.general") || "General",
    }
  ];

  const categories = [
    t("instructorListing.categories.technology") || "Technology",
    t("instructorListing.categories.programming") || "Programming",
    t("instructorListing.categories.management") || "Management",
    t("instructorListing.categories.productivity") || "Productivity",
    t("instructorListing.categories.finance") || "Finance",
  ];

  // Calculate stats
  const totalInstructors = instructors.length;
  const totalLessons = instructors.reduce((sum, inst) => sum + inst.lessons, 0);
  const avgRating = (instructors.reduce((sum, inst) => sum + inst.rating, 0) / instructors.length).toFixed(1);

  // ===== Filtering Logic =====
  const filteredInstructors = instructors.filter((inst) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(inst.category);

    const searchMatch =
      searchQuery === "" ||
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.role.toLowerCase().includes(searchQuery.toLowerCase());

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
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-background)] to-emerald-50/30">
      {/* ===== Modern Header ===== */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-emerald-100 shadow-[var(--shadow-soft)] sticky top-[65px] z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Left side - Title & Stats */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-special)] rounded-xl">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[var(--color-text)]">Expert Instructors</h1>
                <p className="text-sm text-[var(--color-text)]/70">
                  Learn from {totalInstructors} industry experts
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
                  placeholder="Search instructors by name or expertise..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
          {(selectedCategories.length > 0 || searchQuery) && (
            <div className="pb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-[var(--color-text)]/70">Active filters:</span>
                {selectedCategories.map(cat => (
                  <span key={cat} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    <Award className="w-3 h-3" />
                    {cat}
                  </span>
                ))}
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
                  <h3 className="font-semibold text-[var(--color-text)]">Filter Instructors</h3>
                </div>
                <button
                  onClick={clearFilters}
                  className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
                >
                  Clear all
                </button>
              </div>

              {/* Categories */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-600" />
                  <h4 className="font-semibold text-[var(--color-text)]">Expertise Areas</h4>
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
              </div>

              {/* Stats */}
              <div className="mt-8 pt-6 border-t border-emerald-100">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Showing</span>
                    <span className="font-semibold text-[var(--color-text)]">{filteredInstructors.length} instructors</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Categories</span>
                    <span className="font-semibold text-[var(--color-text)]">{selectedCategories.length || "All"}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-[var(--color-text)]">
                  {filteredInstructors.length} Expert{filteredInstructors.length !== 1 ? 's' : ''} Found
                </h2>
                <p className="text-sm text-[var(--color-text)]/70">
                  Learn from the best in their fields
                </p>
              </div>
              <div className="text-sm text-[var(--color-text)]/70">
                Sorted by: <span className="font-medium">Rating</span>
              </div>
            </div>

            {/* Instructors Grid */}
            {filteredInstructors.length === 0 ? (
              <div className="bg-gradient-to-br from-white to-emerald-50/30 rounded-2xl border border-dashed border-emerald-200 p-12 text-center">
                <div className="inline-block p-4 bg-emerald-100 rounded-full mb-4">
                  <Users className="w-12 h-12 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--color-text)] mb-3">No Instructors Found</h3>
                <p className="text-[var(--color-text)]/70 max-w-md mx-auto mb-8">
                  We couldn't find any instructors matching your criteria. Try adjusting your filters or search terms.
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInstructors.map((inst, i) => (
                  <div key={i} className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                    <InstructorCard instructor={inst} />
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ===== Mobile Filter Modal ===== */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end lg:hidden"
          onClick={() => setIsFilterOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-slideUp"
          >
            <div className="bg-white w-full max-h-[90vh] overflow-y-auto rounded-t-3xl">
              {/* Drag Handle */}
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
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-[var(--color-text)]">Expertise Areas</h4>
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
                  </div>
                </div>
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
      )}
    </div>
  );
}