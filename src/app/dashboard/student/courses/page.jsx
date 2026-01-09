"use client";

import CourseCard from "@/components/modules/dashboard/student/CourseCard";
import { useAuth } from "@/hooks/useAuth";
import { useEnrollmentCourses } from "@/hooks/useCourse";
import { useMemo, useState } from "react";
import Link from "next/link";

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState("enrolled");

  const { user, loading: authLoading } = useAuth();
  const { data, loading: courseLoading } = useEnrollmentCourses(user?._id);

  // Calculate counts for each status using useMemo for performance
  const courseCounts = useMemo(() => {
    if (!data) return { enrolled: 0, completed: 0 };

    return data.reduce((acc, enrollment) => {
      const status = enrollment.status || 'enrolled';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, { enrolled: 0, completed: 0 });
  }, [data]);

  if (authLoading || courseLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your courses...</p>
        </div>
      </div>
    );
  }

  const filteredCourses = data?.filter((enrollment) => {
    const status = enrollment.status || 'enrolled';
    return status === activeTab;
  });
  return (
    <div className="min-h-screen bg-white">
      <h1 className="text-2xl font-bold text-[var(--color-text)] mb-4">
        Enrolled Courses
      </h1>

      {/* Tabs */}
      <div className="flex space-x-3 mb-6">
        <button
          onClick={() => setActiveTab("enrolled")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === "enrolled"
              ? "bg-[var(--color-primary)] text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          Enrolled ({courseCounts.enrolled})
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === "completed"
              ? "bg-[var(--color-secondary)] text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          Completed ({courseCounts.completed})
        </button>
      </div>

      {/* Courses */}
      {filteredCourses?.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No {activeTab} courses found</h3>
          <p className="text-gray-600 mb-6">
            {activeTab === 'enrolled'
              ? "You haven't enrolled in any courses yet. Browse our course catalog to get started!"
              : "You haven't completed any courses yet. Keep learning to see your completed courses here!"
            }
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses?.map((enrollment) => (
            <CourseCard key={enrollment?._id} course={enrollment} />
          ))}
        </div>
      )}
    </div>
  );
}
