"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import { toast } from "react-toastify";

export const useUnits = (courseId) => {
  return useQuery({
    queryKey: ["units", courseId],
    queryFn: async () => {
      const res = await api.get(`/units/${courseId}`);
      return res.data?.data || [];
    },
  });
};

export const useAddUnit = (courseId) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const res = await api.post("/units/create", payload);
      return res.data?.data;
    },
    onSuccess: () => {
      toast.success("Unit added!");
      qc.invalidateQueries(["units", courseId]);
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Failed to add unit"),
  });
};
