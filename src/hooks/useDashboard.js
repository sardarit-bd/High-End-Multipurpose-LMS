// src/hooks/useDashboard.js
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/apiClient";

export const useInstructorDashboard = () => {
  return useQuery({
    queryKey: ["instructorDashboard"],
    queryFn: async () => {
      const res = await api.get("/dashboard/instructor");
      return res.data?.data || {};
    },
    refetchOnWindowFocus: false,
  });
};

export const useInstructorStats = () => {
  return useQuery({
    queryKey: ["instructorStats"],
    queryFn: async () => {
      const res = await api.get("/dashboard/stats");
      return res.data?.data || {};
    },
    refetchOnWindowFocus: false,
  });
};

export const useEarningsChart = () => {
  return useQuery({
    queryKey: ["earningsChart"],
    queryFn: async () => {
      const res = await api.get("/dashboard/earnings-chart");
      return res.data?.data || [];
    },
    refetchOnWindowFocus: false,
  });
};

export const useCourseStats = (instructorId) => {
  return useQuery({
    queryKey: ["courseStats", instructorId],
    queryFn: async () => {
      const res = await api.get(`/dashboard/course-stats/${instructorId}`);
      return res.data?.data || {};
    },
    refetchOnWindowFocus: false,
    enabled: !!instructorId,
  });
};

export const useStudentDashboard = () => {
  return useQuery({
    queryKey: ["studentDashboard"],
    queryFn: async () => {
      const res = await api.get("/dashboard/student");
      return res.data?.data || {};
    },
    refetchOnWindowFocus: false,
  });
};