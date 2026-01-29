"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { MapPin, Gift, BookOpen, ChevronLeft, ChevronRight, Calendar, Trophy, Target } from "lucide-react";
import { useEnrolledStudentsByInstructor } from "@/hooks/useUser";
import { useInstructorCourses } from "@/hooks/useCourse";
import { useAuth } from "@/hooks/useAuth";

export default function InstructorStudents() {
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const {user} = useAuth()

  // Fetch enrolled students
  const { data: enrolledData, isLoading } = useEnrolledStudentsByInstructor({});
  
  // Fetch instructor's courses for filtering
  const { data: coursesData } = useInstructorCourses({instructor: user?.userId})
  console.log(coursesData)

  // Extract data
  const enrolledStudents = enrolledData?.data || [];
  const courses = coursesData || [];

  // Transform data for display
  const transformedStudents = useMemo(() => {
    return enrolledStudents.map((enrollment) => {
      const user = enrollment.user || {};
      const coursePoints = enrollment.points?.byCourse || {};
      const totalPoints = enrollment.points?.totalPoints || 0;
      
      // Get enrolled courses count
      const enrolledCourseCount = Object.keys(coursePoints).length;
      
      // Calculate average points per course
      const avgPoints = enrolledCourseCount > 0 
        ? Math.round(totalPoints / enrolledCourseCount) 
        : 0;

      return {
        _id: enrollment._id,
        name: user.name || "Unknown Student",
        email: user.email,
        location: "N/A", // You might want to add location to user model
        joined: new Date(enrollment.startedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        courses: enrolledCourseCount,
        totalPoints,
        avgPoints,
        status: enrollment.status,
        progress: enrollment.progress || 0,
        coursePoints,
        user,
        startedAt: enrollment.startedAt,
        lastActivityAt: enrollment.lastActivityAt,
        // Use actual user image if available, otherwise placeholder
        image: user.picture || `/api/placeholder/400/300?text=${encodeURIComponent(user.name?.charAt(0) || 'U')}`
      };
    });
  }, [enrolledStudents]);

  // Filter students
  const filteredStudents = useMemo(() => {
    let result = transformedStudents.filter((student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase())
    );

    // Filter by selected course
    if (selectedCourse !== "all") {
      result = result.filter(student => 
        student.coursePoints && student.coursePoints[selectedCourse]
      );
    }

    return result;
  }, [transformedStudents, search, selectedCourse]);

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / pageSize);
  const paginatedStudents = filteredStudents.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, selectedCourse]);

  const gotoPage = (n) => {
    if (n >= 1 && n <= totalPages) setPage(n);
  };

  // Calculate stats
  const stats = useMemo(() => {
    const totalStudents = filteredStudents.length;
    const totalCourses = filteredStudents.reduce((sum, s) => sum + s.courses, 0);
    const avgCourses = totalStudents > 0 ? (totalCourses / totalStudents).toFixed(1) : 0;
    const activeStudents = filteredStudents.filter(s => s.status === "active").length;

    return {
      totalStudents,
      totalCourses,
      avgCourses,
      activeStudents,
      completionRate: totalStudents > 0 
        ? ((filteredStudents.filter(s => s.progress >= 100).length / totalStudents) * 100).toFixed(1)
        : 0
    };
  }, [filteredStudents]);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mb-4"></div>
          <p className="text-gray-600">Loading students data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* Header with Stats */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-text)]">Student Management</h1>
            <p className="text-gray-600 mt-1">Track and manage your enrolled students</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
            <div className="bg-white p-3 rounded-lg border border-gray-100">
              <p className="text-sm text-gray-500">Total Students</p>
              <p className="text-2xl font-bold text-[var(--color-text)]">{stats.totalStudents}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search students by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            />
          </div>
          
          <div className="w-full md:w-64">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            >
              <option value="all">All Courses</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Student Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {paginatedStudents.map((student) => (
          <div
            key={student._id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-1"
          >
            {/* Student Image */}
            <div className="relative w-full h-48 bg-gradient-to-br from-blue-50 to-emerald-50">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-white text-3xl font-bold">
                  {student.name.charAt(0)}
                </div>
              </div>
              {/* Progress Badge */}
              <div className="absolute top-3 right-3">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  student.progress >= 100 
                    ? 'bg-green-100 text-green-800'
                    : student.progress >= 50
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {student.progress}% Complete
                </div>
              </div>
            </div>

            {/* Student Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {student.name}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">{student.email}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 p-2 rounded-lg">
                  <div className="flex items-center gap-1">
                    <BookOpen size={14} className="text-[var(--color-primary)]" />
                    <span className="text-xs text-gray-500">Courses</span>
                  </div>
                  <p className="text-lg font-bold text-gray-800 mt-1">{student.courses}</p>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                  <div className="flex items-center gap-1">
                    <Trophy size={14} className="text-[var(--color-accent)]" />
                    <span className="text-xs text-gray-500">Points</span>
                  </div>
                  <p className="text-lg font-bold text-gray-800 mt-1">{student.totalPoints}</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-gray-400" />
                    <span>Joined</span>
                  </div>
                  <span className="font-medium">{student.joined}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target size={14} className="text-gray-400" />
                    <span>Status</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    student.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {student.status}
                  </span>
                </div>
              </div>

              {/* Course Points (if filtered by course) */}
              {selectedCourse !== "all" && student.coursePoints[selectedCourse] && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Points in this course:</span>
                    <span className="font-bold text-[var(--color-primary)]">
                      {student.coursePoints[selectedCourse]}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {paginatedStudents.length === 0 && (
          <div className="col-span-full bg-white rounded-xl border border-gray-200 p-8 text-center">
            <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
              <BookOpen size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No students found</h3>
            <p className="text-gray-500">
              {search || selectedCourse !== "all" 
                ? "No students match your filters. Try different search terms."
                : "No students have enrolled in your courses yet."}
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredStudents.length > 0 && (
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-gray-500">
            Showing {Math.min((page - 1) * pageSize + 1, filteredStudents.length)} to{" "}
            {Math.min(page * pageSize, filteredStudents.length)} of {filteredStudents.length} students
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => gotoPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => gotoPage(pageNum)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                      page === pageNum
                        ? "bg-[var(--color-primary)] text-white"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => gotoPage(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}