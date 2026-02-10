"use client";
import { ChevronLeft, ChevronRight, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import { useInstructorss } from "@/hooks/useUser";
import { useState } from "react";

const useApproveInstructor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      const res = await api.patch('/user/make-instructor', { userId });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['instructors']);
    }
  });
};

export default function InstructorsTable({ search, page, limit, onPageChange }) {
  const [successMessage, setSuccessMessage] = useState("");

  const { data: instructorsData, isLoading, error } = useInstructorss({
    q: search,
    page,
    limit
  });

  const approveInstructor = useApproveInstructor();

  const instructors = instructorsData?.data?.instructors || [];
  const total = instructorsData?.data?.total || 0;
  const totalPages = instructorsData?.data?.totalPages || 1;

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const handleApprove = async (userId) => {
    try {
      await approveInstructor.mutateAsync(userId);
      setSuccessMessage("Instructor approved successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Failed to approve instructor:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-[--radius-card] shadow-md bg-white p-4">
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center gap-4 p-4 border-b animate-pulse">
              <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
              <div className="h-8 bg-gray-200 rounded w-24"></div>
              <div className="h-8 bg-gray-200 rounded w-20"></div>
              <div className="h-8 bg-gray-200 rounded w-28"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-[--radius-card]">
        Error loading instructors data
      </div>
    );
  }

  return (
    <>
      {/* Success Message */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-emerald-100 text-emerald-700 rounded-[--radius-card] flex items-center gap-2"
        >
          <CheckCircle className="w-5 h-5" />
          {successMessage}
        </motion.div>
      )}

      {/* Instructors Table */}
      <div className="rounded-[--radius-card] shadow-md bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr className="text-left">
                <th className="p-4 font-semibold text-gray-700">Instructor</th>
                <th className="p-4 font-semibold text-gray-700">Courses</th>
                <th className="p-4 font-semibold text-gray-700">Students</th>
                <th className="p-4 font-semibold text-gray-700">Status</th>
                <th className="p-4 font-semibold text-gray-700">Joined</th>
                <th className="p-4 font-semibold text-gray-700 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {instructors.map((instructor, index) => (
                <motion.tr
                  key={instructor._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                        <span className="font-bold text-blue-700">
                          {instructor.userId?.name?.charAt(0).toUpperCase() || '?'}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-[--color-text]">
                          {instructor.userId?.name || 'Unknown'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {instructor.userId?.email || 'No email'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-center font-semibold text-blue-700 bg-blue-50 py-2 px-3 rounded-lg">
                      {instructor.noOfCourse || 0}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-center font-semibold text-emerald-700 bg-emerald-50 py-2 px-3 rounded-lg">
                      {instructor.enrolledStudent || 0}
                    </div>
                  </td>
                  <td className="p-4">
                    {instructor.userId?.instructorRequest?.status === "pending" ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                        Pending Approval
                      </span>
                    ) : instructor.userId?.isVerified ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        <XCircle className="w-3 h-3" />
                        Not Verified
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-gray-600">
                    {instructor.userId?.createdAt ? new Date(instructor.userId.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      {console.log(instructor.userId?.instructorRequest?.status)}
                      {instructor.userId?.instructorRequest?.status === "pending" ? (
                        <button
                          onClick={() => handleApprove(instructor.userId?._id)}
                          disabled={approveInstructor.isLoading}
                          className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm hover:shadow"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                      ) : (
                        <div className="text-sm text-gray-400 px-2">Approved</div>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No Instructors Message */}
        {instructors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">No instructors found</div>
            {search && (
              <p className="text-gray-500 mt-2">Try a different search term</p>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
          <div className="text-sm text-gray-500">
            Showing {instructors.length} of {total} instructors
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