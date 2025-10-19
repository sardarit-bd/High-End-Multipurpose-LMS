"use client";

function Skeleton({ className = "" }) {
    return (
        <div
            aria-hidden="true"
            className={`animate-pulse rounded-md bg-gray-200/80 dark:bg-gray-700/40 ${className}`}
        />
    );
}

export default function ManageAdminsSkeleton() {
    const rows = Array.from({ length: 6 });

    return (
        <div className="p-6 space-y-6 text-[var(--color-text)]" role="status" aria-busy="true">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-9 w-40 rounded-[--radius-default]" />
            </div>

            {/* Table Skeleton */}
            <div className="rounded-[--radius-card] shadow-md bg-white p-4 overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-left text-sm">
                            {Array.from({ length: 7 }).map((_, i) => (
                                <th key={i} className="p-3">
                                    <Skeleton className="h-4 w-20" />
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map((_, idx) => (
                            <tr key={idx} className="border-b text-sm">
                                {/* ID */}
                                <td className="p-3">
                                    <Skeleton className="h-4 w-16" />
                                </td>

                                {/* Name */}
                                <td className="p-3">
                                    <Skeleton className="h-4 w-40" />
                                </td>

                                {/* Email */}
                                <td className="p-3">
                                    <Skeleton className="h-4 w-56" />
                                </td>

                                {/* Role */}
                                <td className="p-3">
                                    <Skeleton className="h-4 w-28" />
                                </td>

                                {/* Status badge */}
                                <td className="p-3">
                                    <Skeleton className="h-5 w-20 rounded-full" />
                                </td>

                                {/* Joined */}
                                <td className="p-3">
                                    <Skeleton className="h-4 w-24" />
                                </td>

                                {/* Actions */}
                                <td className="p-3">
                                    <div className="flex gap-2 justify-center">
                                        <Skeleton className="h-8 w-8 rounded-full" />
                                        <Skeleton className="h-8 w-8 rounded-full" />
                                        <Skeleton className="h-8 w-8 rounded-full" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Accessible helper for screen readers */}
                <span className="sr-only">Loading admin list...</span>
            </div>
        </div>
    );
}
