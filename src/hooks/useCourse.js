// src/hooks/useCourses.js
import { useApi } from "./useApi";
export const useCoursesApi = () => useApi("/courses", "courses");
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import { toast } from "react-toastify";

export const useCreateCourse = () =>
  useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/courses/create", data);
      return res.data?.data;
    },
    onSuccess: (data) => toast.success("Course created successfully!"),
    onError: (err) =>
      toast.error(err.response?.data?.message || "Failed to create course"),
  });
export const useInstructorCourses = (filters) => {
  return useQuery({
    queryKey: ["instructorCourses", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.status && filters.status !== "All") params.append("status", filters.status);
      if (filters?.search) params.append("q", filters.search);
      if (filters.instructor) params.append("instructor", filters.instructor)


      const res = await api.get(`/courses?${params.toString()}`);
      return res.data?.data || [];
    },
    refetchOnWindowFocus: false,
  });
};

export const useSlugCourses = (slug) => {
  return useQuery({
    queryKey: ["slugCourse", slug],
    queryFn: async () => {
      const res = await api.get(`/courses/${slug}`);
      return res.data?.data || [];
    },
    refetchOnWindowFocus: false,
  });
};

export const usePublicCourses = (filters) => {
  return useQuery({
    queryKey: ["publicCourses", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.page) params.append("page", filters.page);
      if (filters?.limit) params.append("limit", filters.limit);
      if (filters?.search) params.append("q", filters.search);
      if (filters?.categories?.length)
        params.append("categories", filters.categories.join(","));
      if (filters?.price && filters.price !== "all")
        params.append("price", filters.price); // 'free' | 'paid'

      const res = await api.get(`/courses?${params.toString()}`);
      const data = res.data;
      return {
        items: data?.data || [],
        total: data?.meta?.total || 0,
        page: data?.meta?.page || 1,
        totalPages: data?.meta?.totalPages || 1,
      };
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};


// Get units by course ID
export const useUnitsByCourse = (courseId) =>
  useQuery({
    queryKey: ["unitsByCourse", courseId],
    queryFn: async () => {
      const res = await api.get(`/units/${courseId}`);
      return res.data?.data;
    },
    enabled: !!courseId,
    refetchOnWindowFocus: false,
  });

// Fetch lessons by unit ID
export const useLessonsByUnit = (unitId) =>
  useQuery({
    queryKey: ["lessonsByUnit", unitId],
    queryFn: async () => {
      const res = await api.get(`/lessons/${unitId}`);
      return res.data?.data || [];
    },
    enabled: !!unitId,
    refetchOnWindowFocus: false,
  });

  export const useEnrollmentCourses = (studentId) => {
    return useQuery({
        queryKey: ["enrollmentCourse", studentId],
        queryFn: async () => {
            const res = await api.get(`/enrollments/me`);
            return res.data?.data || [];
        },
        refetchOnWindowFocus: false,
    });
};