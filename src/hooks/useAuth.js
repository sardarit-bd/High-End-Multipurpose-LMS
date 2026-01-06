import api from "@/lib/apiClient";
import { useAuthContext } from "@/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const { user, loading, login, register, logout,googleLogin } = useAuthContext();
  // Get instructor by ID
 
  return { user, loading, login, register, logout, googleLogin, useInstructorById };
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
