"use client";

import { useMemo, useState } from "react";
import {
    Search,
    Filter,
    Star,
    Calendar,
    BookOpen,
    Activity,
    ChevronLeft,
    ChevronRight,
    Edit,
    Trash,
    Plus,
    Users,
    DollarSign,
    FileText,
    TrendingUp,
    Sparkles
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { useCategories, useInstructorCourses } from "@/hooks/useCourse";
import { useCourseStats } from "@/hooks/useDashboard";
import StatusPill from "@/components/modules/dashboard/instructorr/StatusPill";
import { useAuth } from "@/hooks/useAuth";
import { TbLabel } from "react-icons/tb";

const PAGE_SIZE = 6;
const STATUS_OPTIONS = ["All", "Published", "Draft"];
const PRICE_OPTIONS = ["All", "Free", "Paid", "Under $1000", "$1000-$5000", "Over 5000"];

export default function InstructorCourses() {
    const { user } = useAuth();
   
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [priceFilter, setPriceFilter] = useState("All");
    const [page, setPage] = useState(1);
    const qc = useQueryClient();

    // Fetch categories dynamically
    const { data: categoryData, isLoading: categoriesLoading } = useCategories();
    const categories = categoryData?.data?.categories || [];

    const { data: courses = [], isLoading, isFetching } = useInstructorCourses({
        search: query,
        status: statusFilter.toLowerCase() === "all" ? null : statusFilter.toLowerCase(),
        instructor: user?._id
    });

    const { data: courseStats, isLoading: statsLoading } = useCourseStats(user?._id);

    // Prepare category options
    const CATEGORY_OPTIONS = useMemo(() => {
        const categoryList = ["All", ...categories.map(cat => cat.title)];
        return categoryList;
    }, [categories]);

    const filteredCourses = useMemo(() => {
        return courses.filter(course => {
            // Category filter - check if course category matches selected
            console.log(course.category, categoryFilter)
            if (categoryFilter !== "All" && course.category !== categoryFilter?.replace(' ', '_').toLowerCase()) {
                return false;
            }

            // Price filter
            if (priceFilter !== "All") {
                const price = course.price || 0;
                switch (priceFilter) {
                    case "Free":
                        if (price > 0) return false;
                        break;
                    case "Paid":
                        if (price <= 0) return false;
                        break;
                    case "Under $1000":
                        if (price >= 1000) return false;
                        break;
                    case "$1000-$5000":
                        if (price < 1000 || price > 5000) return false;
                        break;
                    case "Over 5000":
                        if (price <= 5000) return false;
                        break;
                }
            }

            return true;
        });
    }, [courses, categoryFilter, priceFilter]);

    const totalPages = Math.max(1, Math.ceil(filteredCourses.length / PAGE_SIZE));
    const paginated = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return filteredCourses.slice(start, start + PAGE_SIZE);
    }, [filteredCourses, page]);

    function gotoPage(n) {
        setPage(Math.max(1, Math.min(totalPages, n)));
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Header with Stats */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-special)] rounded-xl">
                                <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-[var(--color-secondary)]">
                                    Instructor Dashboard
                                </h3>
                                <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text)]">
                                    Course Management
                                </h1>
                            </div>
                        </div>
                        <p className="text-[var(--color-text)]/70 max-w-2xl">
                            Manage all your courses, track performance, and create new learning experiences
                        </p>
                    </div>
                    <Link
                        href="/dashboard/instructor/courses/add"
                        className="group bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-special)] hover:from-[var(--color-primary-hover)] hover:to-[var(--color-accent-special)] text-white px-5 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Create New Course
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-emerald-100 shadow-[var(--shadow-soft)]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[var(--color-text)]/70">Active Courses</p>
                                <p className="text-2xl font-bold text-[var(--color-text)]">
                                    {statsLoading ? "..." : (courseStats?.activeCourses || 0)}
                                </p>
                            </div>
                            <div className="p-2 bg-emerald-100 rounded-lg">
                                <TrendingUp className="w-5 h-5 text-[var(--color-primary)]" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-indigo-100 shadow-[var(--shadow-soft)]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[var(--color-text)]/70">Draft Courses</p>
                                <p className="text-2xl font-bold text-[var(--color-text)]">
                                    {statsLoading ? "..." : (courseStats?.draftCourses || 0)}
                                </p>
                            </div>
                            <div className="p-2 bg-indigo-100 rounded-lg">
                                <Edit className="w-5 h-5 text-indigo-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-sky-100 shadow-[var(--shadow-soft)]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[var(--color-text)]/70">Free Courses</p>
                                <p className="text-2xl font-bold text-[var(--color-text)]">
                                    {statsLoading ? "..." : (courseStats?.freeCourses || 0)}
                                </p>
                            </div>
                            <div className="p-2 bg-sky-100 rounded-lg">
                                <Users className="w-5 h-5 text-sky-500" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-fuchsia-100 shadow-[var(--shadow-soft)]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[var(--color-text)]/70">Paid Courses</p>
                                <p className="text-2xl font-bold text-[var(--color-text)]">
                                    {statsLoading ? "..." : (courseStats?.paidCourses || 0)}
                                </p>
                            </div>
                            <div className="p-2 bg-fuchsia-100 rounded-lg">
                                <DollarSign className="w-5 h-5 text-fuchsia-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Stats for Filtered Results */}
                {(statusFilter !== "All" || categoryFilter !== "All" || priceFilter !== "All" || query) && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200 shadow-sm mb-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Activity className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[var(--color-text)]">Filtered Results</h3>
                                    <p className="text-sm text-[var(--color-text)]/70">
                                        Showing {filteredCourses.length} of {courses.length} courses
                                        {statusFilter !== "All" && ` • Status: ${statusFilter}`}
                                        {categoryFilter !== "All" && ` • Category: ${categoryFilter}`}
                                        {priceFilter !== "All" && ` • Price: ${priceFilter}`}
                                        {query && ` • Search: "${query}"`}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-blue-600">
                                    ${filteredCourses.reduce((sum, course) => sum + (course.price || 0), 0).toLocaleString()}
                                </p>
                                <p className="text-xs text-[var(--color-text)]/70">Total Value</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Search and Filter Bar */}
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-emerald-100 shadow-[var(--shadow-medium)] mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Status Filter */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Filter className="w-4 h-4 text-[var(--color-primary)]" />
                                <label className="text-sm font-medium text-[var(--color-text)]">Status</label>
                            </div>
                            <select
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value);
                                    setPage(1);
                                }}
                                className="w-full px-3 py-2 bg-emerald-50/50 border border-emerald-200 rounded-lg text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                            >
                                {STATUS_OPTIONS.map((status) => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>

                        {/* Category Filter - Now Dynamic */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <BookOpen className="w-4 h-4 text-[var(--color-primary)]" />
                                <label className="text-sm font-medium text-[var(--color-text)]">Category</label>
                            </div>
                            <select
                                value={categoryFilter}
                                onChange={(e) => {
                                    setCategoryFilter(e.target.value);
                                    setPage(1);
                                }}
                                className="w-full px-3 py-2 bg-emerald-50/50 border border-emerald-200 rounded-lg text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                                disabled={categoriesLoading}
                            >
                                {categoriesLoading ? (
                                    <option value="">Loading categories...</option>
                                ) : (
                                    <>
                                        <option value="All">All Categories</option>
                                        {categories.map((category) => (
                                            <option key={category._id} value={category.title}>
                                                {category.title}
                                            </option>
                                        ))}
                                    </>
                                )}
                            </select>
                        </div>

                        {/* Price Filter */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="w-4 h-4 text-[var(--color-primary)]" />
                                <label className="text-sm font-medium text-[var(--color-text)]">Price Range</label>
                            </div>
                            <select
                                value={priceFilter}
                                onChange={(e) => {
                                    setPriceFilter(e.target.value);
                                    setPage(1);
                                }}
                                className="w-full px-3 py-2 bg-emerald-50/50 border border-emerald-200 rounded-lg text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                            >
                                {PRICE_OPTIONS.map((price) => (
                                    <option key={price} value={price}>{price}</option>
                                ))}
                            </select>
                        </div>

                        {/* Search */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Search className="w-4 h-4 text-[var(--color-primary)]" />
                                <label className="text-sm font-medium text-[var(--color-text)]">Search</label>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    value={query}
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        setPage(1);
                                    }}
                                    placeholder="Search courses..."
                                    className="flex-1 px-3 py-2 bg-emerald-50/50 border border-emerald-200 rounded-lg text-[var(--color-text)] placeholder-emerald-400/70 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                                />
                                <button
                                    onClick={() => {
                                        setQuery("");
                                        setStatusFilter("All");
                                        setCategoryFilter("All");
                                        setPriceFilter("All");
                                        setPage(1);
                                    }}
                                    className="px-3 py-2 bg-emerald-100 text-[var(--color-primary)] hover:bg-emerald-200 rounded-lg font-medium transition-colors"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Courses Table */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-emerald-100 shadow-[var(--shadow-medium)] overflow-hidden">
                <div className="p-6 border-b border-emerald-50">
                    <h2 className="text-lg font-semibold text-[var(--color-text)] flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-[var(--color-primary)]" />
                        Your Courses ({filteredCourses.length}{courses.length !== filteredCourses.length ? ` of ${courses.length}` : ''})
                    </h2>
                </div>

                {isLoading || isFetching ? (
                    <div className="p-12 text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]"></div>
                        <p className="mt-3 text-[var(--color-text)]/70">Loading your courses...</p>
                    </div>
                ) : (
                    <>
                        {paginated.length > 0 ? (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-emerald-50">
                                                <th className="py-4 px-6 text-left text-sm font-semibold text-[var(--color-text)]">Course</th>
                                                <th className="py-4 px-6 text-left text-sm font-semibold text-[var(--color-text)]">Category</th>
                                                <th className="py-4 px-6 text-left text-sm font-semibold text-[var(--color-text)]">Students</th>
                                                <th className="py-4 px-6 text-left text-sm font-semibold text-[var(--color-text)]">Price</th>
                                                <th className="py-4 px-6 text-left text-sm font-semibold text-[var(--color-text)]">Label</th>
                                                <th className="py-4 px-6 text-left text-sm font-semibold text-[var(--color-text)]">Status</th>
                                                <th className="py-4 px-6 text-left text-sm font-semibold text-[var(--color-text)]">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-emerald-50">
                                            {paginated.map((c) => {
                                                // Find category details for badge styling
                                                const categoryDetails = categories.find(cat => cat.title === c.category);
                                                
                                                return (
                                                    <tr key={c._id} className="hover:bg-emerald-50/30 transition-colors">
                                                        <td className="py-4 px-6">
                                                            <div className="flex items-start gap-4">
                                                                <div className="relative w-20 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-emerald-100">
                                                                    {c?.thumbnail ? (
                                                                        <Image
                                                                            src={c.thumbnail}
                                                                            alt={c.title || "Course thumbnail"}
                                                                            fill
                                                                            className="object-cover"
                                                                        />
                                                                    ) : (
                                                                        <div className="w-full h-full flex items-center justify-center bg-emerald-50 text-emerald-400">
                                                                            <BookOpen className="w-5 h-5" />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <h3 className="font-semibold text-[var(--color-text)] line-clamp-1">{c.title}</h3>
                                                                    <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-[var(--color-text)]/60">
                                                                        <span className="inline-flex items-center gap-1">
                                                                            <BookOpen className="w-3 h-3" />
                                                                            {c.lessonCount || 0} lessons
                                                                        </span>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            {c.category ? (
                                                                <span 
                                                                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                                                    title={categoryDetails?.description || c.category}
                                                                >
                                                                    {c.category}
                                                                </span>
                                                            ) : (
                                                                <span className="text-gray-400 text-sm">No category</span>
                                                            )}
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <div className="flex items-center gap-2">
                                                                <Users className="w-4 h-4 text-[var(--color-secondary)]" />
                                                                <span className="font-medium">{c.noOfStudents || 0}</span>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <div className={`flex items-center gap-1 ${c.price === 0 ? 'text-emerald-600' : 'text-[var(--color-text)]'}`}>
                                                                <DollarSign className="w-4 h-4" />
                                                                <span className="font-medium">{c.price}</span>
                                                                {c.price === 0 && (
                                                                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full ml-2">Free</span>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <div className="flex items-center gap-1">
                                                                <TbLabel className="w-4 h-4" />
                                                                <span className="font-medium">{c.level || "—"}</span>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <StatusPill status={c.status} />
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <div className="flex items-center gap-2">
                                                                <Link
                                                                    href={`/dashboard/instructor/courses/edit/${c.slug}`}
                                                                    className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                                                                    title="Edit Course"
                                                                >
                                                                    <Edit className="w-4 h-4" />
                                                                </Link>
                                                                <Link
                                                                    href={`/dashboard/instructor/courses/${c._id}/units`}
                                                                    className="p-2 rounded-lg bg-emerald-50 text-[var(--color-primary)] hover:bg-emerald-100 transition-colors"
                                                                    title="Manage Units"
                                                                >
                                                                    <Plus className="w-4 h-4" />
                                                                </Link>
                                                                <button
                                                                    onClick={() => alert("Delete course soon")}
                                                                    className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                                                                    title="Delete Course"
                                                                >
                                                                    <Trash className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        ) : (
                            <div className="p-12 text-center">
                                <div className="inline-block p-4 bg-emerald-50 rounded-full mb-4">
                                    <BookOpen className="w-8 h-8 text-emerald-400" />
                                </div>
                                <h3 className="text-lg font-medium text-[var(--color-text)] mb-2">No courses found</h3>
                                <p className="text-[var(--color-text)]/70 mb-6">Try adjusting your search or create a new course</p>
                                <Link
                                    href="/dashboard/instructor/courses/add"
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--color-primary)] to-emerald-500 text-white px-5 py-2 rounded-lg font-medium hover:shadow-lg transition-all"
                                >
                                    <Plus className="w-4 h-4" />
                                    Create First Course
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Pagination */}
            {paginated.length > 0 && totalPages > 1 && (
                <div className="mt-8 flex items-center justify-between">
                    <div className="text-sm text-[var(--color-text)]/70">
                        Showing {((page - 1) * PAGE_SIZE) + 1} to {Math.min(page * PAGE_SIZE, filteredCourses.length)} of {filteredCourses.length} courses
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => gotoPage(page - 1)}
                            disabled={page === 1}
                            className="p-2 rounded-lg border border-emerald-200 text-[var(--color-text)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-50 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                onClick={() => gotoPage(p)}
                                className={`w-10 h-10 rounded-lg font-medium transition-all ${page === p
                                        ? "bg-gradient-to-r from-[var(--color-primary)] to-emerald-500 text-white shadow-md"
                                        : "text-[var(--color-text)] hover:bg-emerald-50 border border-emerald-200"
                                    }`}
                            >
                                {p}
                            </button>
                        ))}
                        <button
                            onClick={() => gotoPage(page + 1)}
                            disabled={page === totalPages}
                            className="p-2 rounded-lg border border-emerald-200 text-[var(--color-text)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-50 transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}