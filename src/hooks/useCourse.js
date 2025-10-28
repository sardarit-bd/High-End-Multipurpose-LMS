// src/hooks/useCourses.js
import { useApi } from "./useApi";
export const useCoursesApi = () => useApi("/courses", "courses");
