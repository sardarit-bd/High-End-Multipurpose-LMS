"use client";
import Skeleton, { SkeletonText } from "@/components/modules/special/Skeleton";


export default function CourseSingleSkeleton() {
    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* ===== Left Content ===== */}
                    <div className="flex-1">
                        {/* Video Banner */}
                        <div className="rounded-[var(--radius-card)] overflow-hidden shadow-lg mb-6">
                            <Skeleton className="h-56 sm:h-72 md:h-[420px] w-full rounded-[var(--radius-card)]" />
                        </div>
                        {/* Overview */}
                        <section className="bg-white shadow-sm rounded-[var(--radius-card)] p-6 mb-6">
                            <Skeleton className="h-6 w-40 mb-4" />
                            <div className="mb-4">
                                <Skeleton className="h-4 w-48 mb-2" />
                                <SkeletonText lines={4} />
                            </div>
                            <div className="mb-4">
                                <Skeleton className="h-4 w-48 mb-2" />
                                <ul className="space-y-2">
                                    <Skeleton className="h-3 w-5/6" />
                                    <Skeleton className="h-3 w-4/6" />
                                    <Skeleton className="h-3 w-3/6" />
                                </ul>
                            </div>
                            <div>
                                <Skeleton className="h-4 w-48 mb-2" />
                                <Skeleton className="h-3 w-4/6" />
                            </div>
                        </section>

                        {/* CourseContent / AboutInstructor / CommentForm placeholders */}
                        <section className="bg-white shadow-sm rounded-[var(--radius-card)] p-6 mb-6">
                            <Skeleton className="h-5 w-40 mb-4" />
                            <SkeletonText lines={3} />
                            <Skeleton className="h-40 w-full mt-4" />
                        </section>

                        <section className="bg-white shadow-sm rounded-[var(--radius-card)] p-6 mb-6">
                            <Skeleton className="h-5 w-52 mb-4" />
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <div className="flex-1">
                                    <Skeleton className="h-3 w-1/2 mb-2" />
                                    <Skeleton className="h-3 w-2/3" />
                                </div>
                            </div>
                        </section>

                        <section className="bg-white shadow-sm rounded-[var(--radius-card)] p-6">
                            <Skeleton className="h-5 w-44 mb-4" />
                            <Skeleton className="h-24 w-full" />
                        </section>
                    </div>

                    {/* ===== Right Sidebar ===== */}
                    <aside className="w-full lg:w-80 flex-shrink-0 lg:sticky lg:top-18 self-start">
                        <div className="bg-white rounded-[var(--radius-card)] shadow-md p-6 mb-6">
                            <div className="mb-3">
                                <Skeleton className="h-8 w-24 mb-1" />
                                <Skeleton className="h-3 w-16 mb-1" />
                                <Skeleton className="h-3 w-20" />
                            </div>
                            <div className="flex gap-3 mb-4">
                                <Skeleton className="h-10 w-full rounded-lg" />
                                <Skeleton className="h-10 w-full rounded-lg" />
                            </div>
                            <Skeleton className="h-11 w-full rounded-lg" />
                        </div>

                        <div className="bg-white rounded-[var(--radius-card)] shadow-md p-6 mb-6">
                            <Skeleton className="h-4 w-28 mb-3" />
                            <ul className="space-y-2">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <Skeleton key={i} className="h-3 w-5/6" />
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white rounded-[var(--radius-card)] shadow-md p-6">
                            <Skeleton className="h-4 w-40 mb-3" />
                            <ul className="space-y-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Skeleton key={i} className="h-3 w-3/4" />
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
