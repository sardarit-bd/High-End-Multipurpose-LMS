"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import { toast } from "react-toastify";

/* Fetch lessons of a unit */
export const useLessons = (unitId) =>
  useQuery({
    queryKey: ["lessons", unitId],
    queryFn: async () => {
      if (!unitId) return [];
      const res = await api.get(`/lessons/${unitId}`);
      return res.data?.data || [];
    },
    enabled: !!unitId,
  });

/* Add or Update lesson */
export const useSaveLesson = (unitId) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      if (payload._id) {
        const res = await api.put(`/lessons/${payload._id}`, payload);
        return res.data?.data;
      } else {
        const res = await api.post("/lessons/create", payload);
        return res.data?.data;
      }
    },
    onSuccess: () => {
      toast.success("Lesson saved!");
      qc.invalidateQueries(["lessons", unitId]);
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Failed to save lesson"),
  });
};
