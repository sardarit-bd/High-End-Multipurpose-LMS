"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import { toast } from "react-toastify";

export const useQuizzes = (unitId) =>
  useQuery({
    queryKey: ["quizzes", unitId],
    queryFn: async () => {
      if (!unitId) return [];
      const res = await api.get(`/units/${unitId}/quizzes`);
      return res.data?.data || [];
    },
    enabled: !!unitId,
  });

export const useSaveQuiz = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      if (data._id) {
        const res = await api.put(`/quizzes/${data._id}`, data);
        return res.data;
      }
      const res = await api.post(`/quizzes/create`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Quiz saved!");
      qc.invalidateQueries(["quizzes"]);
    },
    onError: () => toast.error("Failed to save quiz"),
  });
};
