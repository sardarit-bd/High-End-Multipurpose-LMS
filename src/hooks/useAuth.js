import api from "@/lib/apiClient";
import { useAuthContext } from "@/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const { user, loading, login, register, logout,googleLogin, forgotPassword, resetPassword } = useAuthContext();
  // Get instructor by ID

  return { user, loading, login, register, logout, googleLogin, forgotPassword, resetPassword, useInstructorById, useInstructors };
};
export const useInstructorById = (instructorId) =>
  useQuery({
    queryKey: ["instructorById", instructorId],
    queryFn: async () => {
      const res = await api.get(`/user/instructor/${instructorId}`);
      return res.data?.data;
    },
    enabled: !!instructorId,
    refetchOnWindowFocus: false,
  });

export const useInstructors = (filters = {}) => {
  return useQuery({
    queryKey: ["instructors", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.search) params.append("q", filters.search);
      if (filters?.expertise?.length) params.append("expertise", filters.expertise.join(","));
      if (filters?.page) params.append("page", filters.page);
      if (filters?.limit) params.append("limit", filters.limit);

      const res = await api.get(`/user/instructor?${params.toString()}`);
      // Backend returns { instructors, total, page, totalPages }
      const result = res.data?.data || {};
      return {
        items: result.instructors || [],
        total: result.total || 0,
        page: result.page || 1,
        totalPages: result.totalPages || 1,
      };
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};