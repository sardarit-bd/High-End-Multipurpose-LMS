// src/hooks/useCourses.js
import { useApi } from "./useApi";
export const useCoursesApi = () => useApi("/courses", "courses");
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
      if (filters?.instructor) params.append("instructor", filters.instructor);
      if (filters?.status) params.append("status", filters.status);

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

export const useUpdateProgress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ courseId, enrollmentId, progress }) => {
      const res = await api.patch(`/enrollments/courses/${courseId}/enrollments/${enrollmentId}/progress`, {
        progress: Math.min(100, Math.max(0, progress))
      });
      return res.data?.data;
    },
    onSuccess: () => {
      // Invalidate related queries to refresh dashboard and enrollment data
      queryClient.invalidateQueries({ queryKey: ["enrollmentCourse"] });
      queryClient.invalidateQueries({ queryKey: ["studentDashboard"] });
    },
    onError: (error) => {
      toast.error("Failed to update progress. Please try again.");
    }
  });
};

export const useCompleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ courseId, enrollmentId, totalPoints }) => {
      const res = await api.patch(`/enrollments/courses/enrollments/status`, {
        status: "completed",
        courseId,
        enrollmentId,
        totalPoints
      });
      return res.data?.data;
    },
    onSuccess: () => {
      toast.success("Course completed successfully!");
      // Invalidate related queries to refresh dashboard and enrollment data
      queryClient.invalidateQueries({ queryKey: ["enrollmentCourse"] });
      queryClient.invalidateQueries({ queryKey: ["studentDashboard"] });
    },
    onError: (error) => {
      toast.error("Failed to complete course. Please try again.");
    }
  });
};

export const useCompleteLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ courseId, enrollmentId, lessonId }) => {
      const res = await api.post(`/enrollments/courses/${courseId}/enrollments/${enrollmentId}/complete-lesson`, {
        lessonId
      });
      return res.data?.data;
    },
    onSuccess: () => {
      // Invalidate enrollment data to refresh progress
      queryClient.invalidateQueries({ queryKey: ["enrollmentCourse"] });
    },
    onError: (error) => {
      console.error("Failed to complete lesson:", error);
    }
  });
};

export const useUpdateTimeSpent = () => {
  return useMutation({
    mutationFn: async ({ courseId, enrollmentId, timeSpent }) => {
      const res = await api.patch(`/enrollments/courses/${courseId}/enrollments/${enrollmentId}/time-spent`, {
        timeSpent
      });
      return res.data?.data;
    },
    onError: (error) => {
      console.error("Failed to update time spent:", error);
    }
  });
};

export const useUserCoursePoints = (courseId) => {
  return useQuery({
    queryKey: ["userCoursePoints", courseId],
    queryFn: async () => {
      if (!courseId) return 0;
      const res = await api.get(`/enrollments/courses/${courseId}/points/me`);
      return res.data?.data?.points || 0;
    },
    enabled: !!courseId,
  });
};

// Get course stats (enrollments, tasks count)
export const useCourseStats = (courseId, unitIds = []) => {
  return useQuery({
    queryKey: ["courseStats", courseId, unitIds],
    queryFn: async () => {
      if (!courseId) return null;
      
      let enrollmentCount = null;
      let tasksCount = 0;
      
      // Try to get enrollment count (may require auth)
      try {
        // This endpoint requires auth, so it might fail for public users
        // We'll make it optional
        const enrollmentsRes = await api.get(`/enrollments/courses/${courseId}/enrollments`);
        const enrollments = enrollmentsRes.data?.data || [];
        enrollmentCount = enrollments.length;
      } catch (error) {
        // If auth is required, enrollment count will be null
        enrollmentCount = null;
      }
      
      // Get tasks count from all units
      if (unitIds.length > 0) {
        try {
          const taskPromises = unitIds.map(unitId => 
            api.get(`/tasks/${unitId}`).then(res => res.data?.data || []).catch(() => [])
          );
          const tasksArrays = await Promise.all(taskPromises);
          tasksCount = tasksArrays.flat().length;
        } catch (error) {
          tasksCount = 0;
        }
      }
      
      return {
        enrollmentCount,
        tasksCount
      };
    },
    enabled: !!courseId,
    refetchOnWindowFocus: false,
  });
};



export const useCategories = () => {
  return useQuery({
    queryKey: ['course-categories'],
    queryFn: async () => {
      const res = await api.get('/courses/categories', { params: { limit: 100 } });
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
};

