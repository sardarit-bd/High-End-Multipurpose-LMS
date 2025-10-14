"use client";

export default function Skeleton({ className = "" }) {
    return (
        <div
            className={`animate-pulse rounded-md bg-gray-200/80 dark:bg-gray-700/40 ${className}`}
            aria-hidden="true"
        />
    );
}

export function SkeletonText({ lines = 1, className = "" }) {
    return (
        <div className={`space-y-2 ${className}`}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton key={i} className="h-3 w-full last:w-5/6" />
            ))}
        </div>
    );
}
