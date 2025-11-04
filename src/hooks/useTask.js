"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import { toast } from "react-toastify";

export const useTasks = (unitId) =>
  useQuery({
    queryKey: ["tasks", unitId],
    queryFn: async () => {
      if (!unitId) return [];
      const res = await api.get(`/tasks/${unitId}`);
      return res.data?.data || [];
    },
    enabled: !!unitId,
  });

export const useSaveTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      if (data._id) {
        const res = await api.put(`/tasks/${data._id}`, data);
        return res.data;
      }
      const res = await api.post(`/tasks/create`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Task saved!");
      qc.invalidateQueries(["tasks"]);
    },
    onError: () => toast.error("Failed to save task"),
  });
};
