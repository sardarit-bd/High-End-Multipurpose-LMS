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
} from "lucide-react";
import Image from "next/image";
import { StatBadge } from "@/components/modules/dashboard/instructorr/StatBadge";
import StatusPill from "@/components/modules/dashboard/instructorr/StatusPill";
import Link from "next/link";


/* ----------------------------- Mock Data ----------------------------- */
const MOCK_COURSES = [
    {
        id: "c1",
        title: "Information About UI/UX Design Degree",
        lessons: 11,
        quizzes: 2,
        duration: "03:15:00 Hours",
        students: 600,
        price: 160,
        rating: 4.5,
        reviews: 300,
        status: "Published",
        thumbnail: "/courses/uiux.jpg",
    },
    {
        id: "c2",
        title: "Wordpress for Beginners - Master Wordpress Quickly",
        lessons: 11,
        quizzes: 2,
        duration: "03:15:00 Hours",
        students: 500,
        price: 180,
        rating: 4.2,
        reviews: 430,
        status: "Pending",
        thumbnail: "/courses/business.jpg",
    },
    {
        id: "c3",
        title: "Sketch from A to Z (2024): Become an app designer",
        lessons: 11,
        quizzes: 2,
        duration: "03:15:00 Hours",
        students: 300,
        price: 200,
        rating: 4.7,
        reviews: 140,
        status: "Draft",
        thumbnail: "/courses/art.jpg",
    },
    {
        id: "c4",
        title: "Build Responsive Real World Websites with Crash Course",
        lessons: 11,
        quizzes: 2,
        duration: "03:15:00 Hours",
        students: 400,
        price: 220,
        rating: 4.4,
        reviews: 260,
        status: "Published",
        thumbnail: "/courses/business.jpg",
    },
    {
        id: "c5",
        title: "Learn JavaScript and Express to become a Expert",
        lessons: 11,
        quizzes: 2,
        duration: "03:15:00 Hours",
        students: 700,
        price: 170,
        rating: 4.8,
        reviews: 180,
        status: "Published",
        thumbnail: "/courses/react.jpg",
    },
    {
        id: "c6",
        title: "Introduction to Python Programming",
        lessons: 11,
        quizzes: 2,
        duration: "03:15:00 Hours",
        students: 450,
        price: 150,
        rating: 4.8,
        reviews: 180,
        status: "Published",
        thumbnail: "/courses/uiux.jpg",
    },
    {
        id: "c7",
        title: "Build Responsive Websites with HTML5 and CSS3",
        lessons: 11,
        quizzes: 2,
        duration: "03:15:00 Hours",
        students: 620,
        price: 130,
        rating: 4.9,
        reviews: 510,
        status: "Published",
        thumbnail: "/courses/art.jpg",
    },
    {
        id: "c8",
        title: "Information About Photoshop Design Degree",
        lessons: 11,
        quizzes: 2,
        duration: "03:15:00 Hours",
        students: 550,
        price: 190,
        rating: 4.6,
        reviews: 400,
        status: "Published",
        thumbnail: "/courses/react.jpg",
    },
    {
        id: "c9",
        title: "C# Developers Double Your Coding with Visual Studio",
        lessons: 11,
        quizzes: 2,
        duration: "03:15:00 Hours",
        students: 240,
        price: 140,
        rating: 4.1,
        reviews: 180,
        status: "Published",
        thumbnail: "/courses/business.jpg",
    },
    {
        id: "c10",
        title: "Complete HTML, CSS and Javascript Course",
        lessons: 11,
        quizzes: 2,
        duration: "03:15:00 Hours",
        students: 380,
        price: 110,
        rating: 4.3,
        reviews: 200,
        status: "Published",
        thumbnail: "/courses/uiux.jpg",
    },
];

/* --------------------------- Utility / Config ------------------------- */
const STATUS_OPTIONS = ["All", "Published", "Pending", "Draft"];
const PAGE_SIZE = 6;

/* -------------------------- Helper Components ------------------------- */


/* ----------------------------- Main Page ------------------------------ */
export default function InstructorCourses() {
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [page, setPage] = useState(1);

    // Filtered & searched courses
    const filtered = useMemo(() => {
        let items = MOCK_COURSES.slice();
        if (statusFilter !== "All") items = items.filter((c) => c.status === statusFilter);
        if (query.trim()) {
            const q = query.toLowerCase();
            items = items.filter((c) => c.title.toLowerCase().includes(q));
        }
        return items;
    }, [query, statusFilter]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paginated = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return filtered.slice(start, start + PAGE_SIZE);
    }, [filtered, page]);

    function gotoPage(n) {
        setPage(Math.max(1, Math.min(totalPages, n)));
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <div className="p-4 md:p-6 lg:p-8 min-h-screen text-[var(--color-text)]">
            {/* Header + badges */}
            <div className="space-y-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h3 className="text-sm text-[var(--color-secondary)] font-semibold">Instructor</h3>
                        <h1 className="text-2xl md:text-3xl font-bold">Your Courses</h1>
                    </div>
                    <Link
                        href="add-course"
                        className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all"
                    >
                        Add New Course
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 w-full">
                        <StatBadge label="Active Courses" value="45" colorClass="bg-[var(--color-primary)]" />
                        <StatBadge label="Pending Courses" value="21" colorClass="bg-rose-500" />
                        <StatBadge label="Draft Courses" value="15" colorClass="bg-indigo-600" />
                        <StatBadge label="Free Courses" value="16" colorClass="bg-sky-500" />
                        <StatBadge label="Paid Courses" value="21" colorClass="bg-fuchsia-600" />
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between py-10 gap-4">
                    <div className="flex items-center gap-3 w-full md:w-1/2">
                        <div className="relative w-full">
                            <select
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value);
                                    setPage(1);
                                }}
                                className="appearance-none w-full px-4 py-2 bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                            >
                                {STATUS_OPTIONS.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                                <Filter size={14} />
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-1/2">
                        <div className="relative flex-1">
                            <input
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setPage(1);
                                }}
                                placeholder="Search courses..."
                                className="w-full pl-10 pr-3 px-4 py-2  bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <Search size={16} />
                            </span>
                        </div>
                        <button
                            onClick={() => {
                                setQuery("");
                                setStatusFilter("All");
                                setPage(1);
                            }}
                            className="px-3 py-2 bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            {/* Courses List */}
            <div className="bg-white rounded-[var(--radius-card)] shadow-sm p-4 overflow-x-auto">
                {/* Table for md+ */}
                <div className="hidden md:block">
                    <table className="min-w-full text-left">
                        <thead>
                            <tr className="text-sm text-gray-500">
                                <th className="py-3 px-4">Course Name</th>
                                <th className="py-3 px-4">Students</th>
                                <th className="py-3 px-4">Price</th>
                                <th className="py-3 px-4">Ratings</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.map((c) => (
                                <tr key={c.id} className="border-t border-gray-200 hover:bg-gray-50">
                                    <td className="py-4 px-4 align-top">
                                        <div className="flex items-start gap-3">
                                            <div className="w-16 h-10 relative rounded overflow-hidden bg-gray-100 flex-shrink-0">
                                                <Image src={c.thumbnail} alt={c.title} fill style={{ objectFit: "cover" }} />
                                            </div>
                                            <div>
                                                <div className="font-semibold">{c.title}</div>
                                                <div className="text-xs text-gray-400 flex items-center gap-3 mt-1">
                                                    <span className="inline-flex items-center gap-1">
                                                        <BookOpen size={14} /> {c.lessons} Lessons
                                                    </span>
                                                    <span className="inline-flex items-center gap-1">
                                                        <Activity size={14} /> {c.quizzes} Quizzes
                                                    </span>
                                                    <span className="inline-flex items-center gap-1">
                                                        <Calendar size={14} /> {c.duration}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="py-4 px-4 align-top">{c.students}</td>
                                    <td className="py-4 px-4 align-top">${c.price}</td>
                                    <td className="py-4 px-4 align-top">
                                        <div className="inline-flex items-center gap-2">
                                            <span className="flex items-center bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-sm">
                                                <Star size={14} className="mr-1" /> {c.rating}
                                            </span>
                                            <span className="text-xs text-gray-400">({c.reviews})</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 align-top">
                                        <StatusPill status={c.status} />
                                    </td>
                                    <td className="py-4 px-4 align-top text-right">
                                        <div className="inline-flex items-center gap-2">
                                            <button
                                                onClick={() => alert(`Editing ${c.title}`)}
                                                className="p-2 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                                                title="Edit"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (confirm(`Are you sure you want to delete "${c.title}"?`)) {
                                                        alert(`Deleted ${c.title}`);
                                                    }
                                                }}
                                                className="p-2 rounded-md bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
                                                title="Delete"
                                            >
                                                <Trash size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {paginated.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="p-6 text-center text-gray-500">
                                        No courses found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Cards for mobile */}
                <div className={`grid gap-4 sm:grid-cols-2 md:hidden`}>
                    {paginated.map((c) => (
                        <article
                            key={c.id}
                            className="flex gap-3 p-3 border rounded-lg hover:bg-gray-50 transition"
                        >
                            <div className="w-24 h-20 relative rounded overflow-hidden bg-gray-100 flex-shrink-0">
                                <Image src={c.thumbnail} alt={c.title} fill style={{ objectFit: "cover" }} />
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold">{c.title}</div>
                                <div className="text-xs text-gray-400 mt-2 flex flex-wrap gap-2">
                                    <span className="inline-flex items-center gap-1">
                                        <BookOpen size={12} /> {c.lessons} Lessons
                                    </span>
                                    <span className="inline-flex items-center gap-1">
                                        <Activity size={12} /> {c.quizzes} Quizzes
                                    </span>
                                    <span className="inline-flex items-center gap-1">
                                        <Calendar size={12} /> {c.duration}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between mt-3">
                                    <div className="text-sm font-semibold text-[var(--color-primary)]">
                                        ${c.price}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-600">{c.students}</span>
                                        <StatusPill status={c.status} />
                                    </div>
                                </div>

                                {/* Actions on mobile */}
                                <div className="flex items-center gap-2 mt-3">
                                    <button
                                        onClick={() => alert(`Editing ${c.title}`)}
                                        className="flex-1 py-2 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 text-sm"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (confirm(`Are you sure you want to delete "${c.title}"?`)) {
                                                alert(`Deleted ${c.title}`);
                                            }
                                        }}
                                        className="flex-1 py-2 rounded-md bg-rose-50 text-rose-600 hover:bg-rose-100 text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}

                    {paginated.length === 0 && (
                        <div className="p-6 text-center text-gray-500 col-span-full">
                            No courses found.
                        </div>
                    )}
                </div>

                {/* Pagination (unchanged) */}
                <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                        Page {page} of {totalPages}
                    </div>
                    <div className="inline-flex items-center gap-2">
                        <button
                            onClick={() => gotoPage(page - 1)}
                            disabled={page === 1}
                            className="p-2 rounded-md bg-white border border-gray-200 disabled:opacity-50"
                        >
                            <ChevronLeft size={16} />
                        </button>

                        <div className="hidden sm:flex items-center gap-1">
                            {Array.from({ length: totalPages }).map((_, i) => {
                                const n = i + 1;
                                return (
                                    <button
                                        key={n}
                                        onClick={() => gotoPage(n)}
                                        className={`px-3 py-1 rounded-md text-sm ${n === page
                                                ? "bg-[var(--color-primary)] text-white"
                                                : "bg-white border border-gray-200 text-gray-700"
                                            }`}
                                    >
                                        {n}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => gotoPage(page + 1)}
                            disabled={page === totalPages}
                            className="p-2 rounded-md bg-white border border-gray-200 disabled:opacity-50"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

