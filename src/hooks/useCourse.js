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

            const res = await api.get(`/courses?${params.toString()}`);
            return res.data?.data || [];
        },
        refetchOnWindowFocus: false,
    });
};