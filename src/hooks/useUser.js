"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import { toast } from "react-toastify";

/* Fetch instructor profile */
export const useProfileInstructor = (userId) =>
  useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      if (!userId) return null;
      const res = await api.get(`/user/instructor/${userId}`);
      return res.data?.data || null;
    },
    enabled: !!userId,
  });

/* Update instructor profile */
export const useUpdateProfile = (userId) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const res = await api.patch(`/user/${userId}`, payload);
      return res.data?.data;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      qc.invalidateQueries(["profile", userId]);
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Failed to Update Profile"),
  });
};

export const useStudents = (query = {}) => {
  return useQuery({
    queryKey: ['students', query],
    queryFn: async () => {
      const res = await api.get('/user/students', { params: query });
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
};

export const useInstructorss = (query = {}) => {
  return useQuery({
    queryKey: ['instructors', query],
    queryFn: async () => {
      const res = await api.get('/user/instructor', { params: query });
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
};

export const useEnrolledStudentsByInstructor = (query = {}) => {
  return useQuery({
    queryKey: ['enrolled-student', query],
    queryFn: async () => {
      const res = await api.get('enrollments/courses/students', { params: query });
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
};