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
