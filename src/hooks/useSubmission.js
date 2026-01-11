"use client";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/apiClient";

export const useMySubmissionsByUnit = (unitId) =>
  useQuery({
    queryKey: ["submissions", "unit", unitId],
    queryFn: async () => {
      if (!unitId) return [];
      const res = await api.get(`/submissions/units/${unitId}/me`);
      return res.data?.data || [];
    },
    enabled: !!unitId,
  });

// Hook to get submissions for multiple units
export const useMySubmissionsByUnits = (unitIds) =>
  useQuery({
    queryKey: ["submissions", "units", unitIds?.sort()?.join(",")],
    queryFn: async () => {
      if (!unitIds || unitIds.length === 0) return [];

      // Fetch submissions for all units
      const submissionPromises = unitIds.map(unitId =>
        api.get(`/submissions/units/${unitId}/me`).then(res => res.data?.data || []).catch(() => [])
      );

      const submissionArrays = await Promise.all(submissionPromises);
      return submissionArrays.flat();
    },
    enabled: !!unitIds && unitIds.length > 0,
  });
