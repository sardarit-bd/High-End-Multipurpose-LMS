import React, { useState, useMemo } from "react";
import { Calendar, User, ArrowRight, MoreVertical, Eye, Download, Clock, CheckCircle, PlayCircle } from "lucide-react";
import Link from "next/link";

// Utility function to generate slug from title
const generateSlug = (title) => {
  if (!title) return "";
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const CourseTable = ({ enrollments = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Transform enrollments data to match the expected format
  const courses = useMemo(() => {
      return enrollments.map(enrollment => {
        const course = enrollment.course || {};
        const instructor = course.instructor || {};

      return {
        id: enrollment._id,
        name: course.title || "Unknown Course",
        instructor: instructor.name || "Unknown Instructor",
        date: enrollment.createdAt ? new Date(enrollment.createdAt).toLocaleDateString('en-GB') : "N/A",
        status: enrollment.status === 'completed' ? "Completed" : "Ongoing",
        progress: enrollment.progress || 0,
        duration: course.duration || "N/A",
        category: course.category || "General",
        nextLesson: enrollment.nextLesson || null,
        courseId: course._id,
        slug: course.slug || generateSlug(course.title) || course._id,
        enrollmentId: enrollment._id,
      };
    });
  }, [enrollments]);

  // Filter courses based on search and status
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || course.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [courses, searchTerm, statusFilter]);


  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-gradient-to-r from-emerald-500 to-green-500 text-white";
      case "Ongoing":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    return status === "Completed" ? 
      <CheckCircle className="w-4 h-4" /> : 
      <Clock className="w-4 h-4" />;
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-900">My Enrolled Courses</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div>
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Status</option>
              <option>Ongoing</option>
              <option>Completed</option>
            </select>
          </div>
        </div>
        <p className="text-gray-600 text-sm">Track your learning progress and manage enrolled courses</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
              <th className="p-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Course Details
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Instructor
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Progress
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {courses.map((course, idx) => (
              <tr 
                key={idx} 
                className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-white transition-colors duration-200 group"
              >
                {/* Course Details */}
                <td className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center flex-shrink-0">
                      <PlayCircle className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {course.name}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                          {course.category}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          {course.date}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {course.duration}
                        </div>
                      </div>
                      {course.nextLesson && (
                        <p className="text-xs text-gray-500 mt-2">
                          Next: <span className="font-medium text-blue-600">{course.nextLesson}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </td>

                {/* Instructor */}
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="font-medium text-gray-900">{course.instructor}</span>
                  </div>
                </td>

                {/* Progress */}
                <td className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{course.progress}%</span>
                      <span className="font-medium text-gray-900">
                        {course.status === "Completed" ? "Completed" : `${100 - course.progress}% left`}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          course.status === "Completed" 
                            ? "bg-gradient-to-r from-emerald-400 to-green-400"
                            : "bg-gradient-to-r from-blue-400 to-cyan-400"
                        }`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(course.status)}`}>
                      {getStatusIcon(course.status)}
                      {course.status}
                    </span>
                    {course.certificate && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 rounded text-xs font-medium border border-amber-200">
                        🏆 Certificate
                      </span>
                    )}
                  </div>
                </td>

                {/* Actions */}
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Link href={`/course/${course.slug}`}>
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2">
                        {course.status === "Completed" ? (
                          <>
                            <Eye className="w-4 h-4" />
                            Review
                          </>
                        ) : (
                          <>
                            <PlayCircle className="w-4 h-4" />
                            Continue
                          </>
                        )}
                      </button>
                    </Link>
                    
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default CourseTable;