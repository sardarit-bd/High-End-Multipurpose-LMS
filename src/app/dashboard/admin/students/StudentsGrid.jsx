"use client";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useStudents } from "@/hooks/useUser";

export default function StudentsGrid({ search, page, limit, onPageChange }) {
  const { data: studentsData, isLoading, error } = useStudents({
    q: search,
    page,
    limit
  });

  const students = studentsData?.data?.students || [];
  const total = studentsData?.data?.total || 0;
  const totalPages = studentsData?.data?.totalPages || 1;

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-sm text-gray-500 text-right">
          Loading...
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="rounded-[--radius-card] shadow-md bg-white p-6 animate-pulse">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-200"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-6 bg-gray-200 rounded w-full"></div>
                <div className="h-6 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-[--radius-card]">
        Error loading students data
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Total: {total} students
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {students.map((student, index) => (
          <motion.div
            key={student._id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="rounded-[--radius-card] shadow-md bg-white overflow-hidden hover:shadow-lg transition border border-gray-100"
          >
            {/* Student Header with Avatar */}
            <div className="p-6 border-b">
              <div className="flex items-center gap-4">
                {student.picture ? (
                  <img 
                    src={student.picture} 
                    alt={student.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center border-2 border-white shadow">
                    <span className="text-2xl font-bold text-blue-600">
                      {student.name?.charAt(0).toUpperCase() || '?'}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-[--color-text] truncate">
                    {student.name || 'Unknown'}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">{student.email || 'No email'}</p>
                </div>
              </div>
            </div>

            {/* Student Stats */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700">
                    {student.totalEnrolledCourses || 0}
                  </div>
                  <div className="text-xs text-blue-600 mt-1 font-medium">Courses</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-700">
                    {student.points || 0}
                  </div>
                  <div className="text-xs text-emerald-600 mt-1 font-medium">Points</div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">Joined Date</div>
                  <div className="text-sm font-medium text-[--color-text]">
                    {student.joinedDate ? new Date(student.joinedDate).toLocaleDateString() : 'N/A'}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Students Message */}
      {students.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">No students found</div>
          {search && (
            <p className="text-gray-500 mt-2">Try a different search term</p>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
          <div className="text-sm text-gray-500">
            Showing {students.length} of {total} students
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className={`p-2 rounded-lg ${page === 1 ? 'text-gray-400 bg-gray-100' : 'text-blue-600 hover:bg-blue-50'}`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
                    onClick={() => goToPage(pageNum)}
                    className={`w-9 h-9 rounded-lg text-sm ${page === pageNum 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow' 
                      : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              className={`p-2 rounded-lg ${page === totalPages ? 'text-gray-400 bg-gray-100' : 'text-blue-600 hover:bg-blue-50'}`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}