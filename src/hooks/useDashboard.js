// src/hooks/useDashboard.js
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import api from "@/lib/apiClient";
import { useAuth } from "@/hooks/useAuth";

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

export const useMyPoints = () => {
  return useQuery({
    queryKey: ["myPoints"],
    queryFn: async () => {
      const res = await api.get("/gamification/me");
      return res.data?.data || { wallet: { totalPoints: 0, byCourse: {} }, logs: [] };
    },
    refetchOnWindowFocus: false,
  });
};

export const useLeaderboard = (limit = 20) => {
  return useQuery({
    queryKey: ["leaderboard", limit],
    queryFn: async () => {
      const res = await api.get(`/gamification/leaderboard?limit=${limit}`);
      return res.data?.data || [];
    },
    refetchOnWindowFocus: false,
  });
};

export const useAdminStats = () => {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await api.get('/dashboard/admin-stats');
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
};
export const useMyRank = () => {
  const { data: leaderboard = [] } = useLeaderboard(100); // Get top 100 for rank calculation
  const { user } = useAuth();

  return useMemo(() => {
    if (!user || !leaderboard.length) return null;

    const myEntryIndex = leaderboard.findIndex(entry => entry.userId === user._id);
    return myEntryIndex !== -1 ? myEntryIndex + 1 : null;
  }, [leaderboard, user]);
};

