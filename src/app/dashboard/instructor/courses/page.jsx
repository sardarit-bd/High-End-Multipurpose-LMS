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
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { useInstructorCourses } from "@/hooks/useCourse";
import { StatBadge } from "@/components/modules/dashboard/instructorr/StatBadge";
import StatusPill from "@/components/modules/dashboard/instructorr/StatusPill";
import { useAuth } from "@/hooks/useAuth";

const PAGE_SIZE = 6;
const STATUS_OPTIONS = ["All", "Published", "Pending", "Draft"];

export default function InstructorCourses() {
    const {user} = useAuth()
   
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [page, setPage] = useState(1);
    const qc = useQueryClient();

    const { data: courses = [], isLoading, isFetching } = useInstructorCourses({
        search: query,
        status: statusFilter,
        instructor: user?._id
    });

    const totalPages = Math.max(1, Math.ceil(courses.length / PAGE_SIZE));
    const paginated = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return courses.slice(start, start + PAGE_SIZE);
    }, [courses, page]);

    function gotoPage(n) {
        setPage(Math.max(1, Math.min(totalPages, n)));
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <div className="p-4 md:p-6 lg:p-8 min-h-screen text-[var(--color-text)]">
            {/* Header */}
            <div className="space-y-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h3 className="text-sm text-[var(--color-secondary)] font-semibold">
                            Instructor
                        </h3>
                        <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text)]">
                            Your Courses
                        </h1>
                    </div>
                    <Link
                        href="/dashboard/instructor/courses/add"
                        className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all"
                    >
                        Add New Course
                    </Link>
                </div>

                {/* Status Badges */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 w-full">
                    <StatBadge label="Active Courses" value="45" colorClass="bg-[var(--color-primary)]" />
                    <StatBadge label="Pending Courses" value="21" colorClass="bg-rose-500" />
                    <StatBadge label="Draft Courses" value="15" colorClass="bg-indigo-600" />
                    <StatBadge label="Free Courses" value="16" colorClass="bg-sky-500" />
                    <StatBadge label="Paid Courses" value="21" colorClass="bg-fuchsia-600" />
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between py-10 gap-4">
                    <div className="flex items-center gap-3 w-full md:w-1/2">
                        <div className="relative w-full">
                            <select
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value);
                                    setPage(1);
                                    qc.invalidateQueries(["instructorCourses"]);
                                }}
                                className="appearance-none w-full px-4 py-2 bg-[var(--color-background)] border border-[var(--color-primary)] rounded-lg text-[var(--color-text)]"
                            >
                                {STATUS_OPTIONS.map((s) => (
                                    <option key={s}>{s}</option>
                                ))}
                            </select>
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                                <Filter size={14} />
                            </span>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="flex items-center gap-3 w-full md:w-1/2">
                        <div className="relative flex-1">
                            <input
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setPage(1);
                                }}
                                placeholder="Search courses..."
                                className="w-full pl-10 pr-3 py-2 bg-[var(--color-background)] border border-[var(--color-primary)] rounded-lg text-[var(--color-text)]"
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
                            className="px-3 py-2 bg-[var(--color-background)] border border-[var(--color-primary)] rounded-lg text-[var(--color-text)]"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-[var(--color-surface)] rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] p-4 overflow-x-auto">
                {isLoading || isFetching ? (
                    <div className="p-10 text-center text-gray-500">Loading courses...</div>
                ) : (
                    <>
                        {paginated.length > 0 ? (
                            <table className="min-w-full text-left">
                                <thead>
                                    <tr className="text-sm text-gray-500 border-b border-gray-200">
                                        <th className="py-3 px-4">Course Name</th>
                                        <th className="py-3 px-4">Students</th>
                                        <th className="py-3 px-4">Price</th>
                                        <th className="py-3 px-4">Ratings</th>
                                        <th className="py-3 px-4">Status</th>
                                        <th className="py-3 px-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginated.length > 0 && paginated.map((c) => (
                                        <tr key={c._id} className="border-t border-gray-200 hover:bg-gray-50">
                                            <td className="py-4 px-4 align-top">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-16 h-10 relative rounded overflow-hidden bg-gray-100 flex-shrink-0">
                                                        {c?.thumbnail ? (
                                                            <Image
                                                                src={c.thumbnail}
                                                                alt={c.title || "Course thumbnail"}
                                                                fill
                                                                style={{ objectFit: "cover" }}
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-xs">
                                                                No Image
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-[var(--color-text)]">{c.title}</div>
                                                        <div className="text-xs text-gray-500 flex items-center gap-3 mt-1">
                                                            <span className="inline-flex items-center gap-1">
                                                                <BookOpen size={14} /> {c.lessonCount || 0} Lessons
                                                            </span>
                                                            <span className="inline-flex items-center gap-1">
                                                                <Activity size={14} /> {c.quizCount || 0} Quizzes
                                                            </span>
                                                            <span className="inline-flex items-center gap-1">
                                                                <Calendar size={14} /> {c.duration || "N/A"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 align-top">{c.studentCount || 0}</td>
                                            <td className="py-4 px-4 align-top">${c.price}</td>
                                            <td className="py-4 px-4 align-top text-yellow-700">
                                                <Star size={14} className="inline mr-1" /> {c.rating || "—"}
                                            </td>
                                            <td className="py-4 px-4 align-top">
                                                <StatusPill status={c.status} />
                                            </td>
                                            <td className="py-4 px-4 align-top text-right">
                                                <Link
                                                    href={`/dashboard/instructor/courses/${c._id}/units`}
                                                    className="p-2 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                                                    title="Edit"
                                                >
                                                    <Edit size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => alert("Delete course soon")}
                                                    className="ml-2 p-2 rounded-md bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
                                                    title="Delete"
                                                >
                                                    <Trash size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="p-10 text-center text-gray-500">No courses found.</div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
