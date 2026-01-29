import api from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";


const fetchInstructorStats = async () => {
  const { data } = await api.get("/dashboard/dashboard/stats");
  return data.data;
};

const fetchTopCourses = async (limit) => {
  const { data } = await api.get(`/dashboard/dashboard/top-courses?limit=${limit}`);
  return data.data;
};

const fetchRecentSubmissions = async (limit) => {
  const { data } = await api.get(`/dashboard/dashboard/recent-submissions?limit=${limit}`);
  return data.data;
};

const fetchUnevaluatedTasks = async () => {
  const { data } = await api.get("/dashboard/dashboard/unevaluated-tasks");
  return data.data;
};

const fetchMonthlyEarnings = async (months) => {
  const { data } = await api.get(`/dashboard/dashboard/monthly-earnings?months=${months}`);
  return data.data;
};

const fetchDashboard = async () => {
  const { data } = await api.get("/dashboard/dashboard");
  return data.data;
};

const fetchStudentsWithPoints = async () => {
  const { data } = await api.get("/dashboard/students");
  return data.data;
};

export const useInstructorStats = () => {
  return useQuery({
    queryKey: ["instructor-stats"],
    queryFn: fetchInstructorStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

export const useTopCourses = (limit)=> {
  return useQuery({
    queryKey: ["top-courses", limit],
    queryFn: () => fetchTopCourses(limit),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useRecentSubmissions = (limit) => {
  return useQuery({
    queryKey: ["recent-submissions", limit],
    queryFn: () => fetchRecentSubmissions(limit),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: true,
  });
};

export const useUnevaluatedTasks = () => {
  return useQuery({
    queryKey: ["unevaluated-tasks"],
    queryFn: fetchUnevaluatedTasks,
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

export const useMonthlyEarnings = (months) => {
  return useQuery({
    queryKey: ["monthly-earnings", months],
    queryFn: () => fetchMonthlyEarnings(months),
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};

export const useInstructorDashboard = () => {
  return useQuery({
    queryKey: ["instructor-dashboard"],
    queryFn: fetchDashboard,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useStudentsWithPoints = () => {
  return useQuery({
    queryKey: ["students-with-points"],
    queryFn: fetchStudentsWithPoints,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};