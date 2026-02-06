"use client";
import { useEffect, useRef, useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  Menu,
  X,
  Play,
  Clock,
  BookOpen,
  CheckCircle,
  TrendingUp,
  Target,
  Award,
  Maximize2,
  Volume2,
  Settings,
  Download,
  Share2,
  Bookmark,
  MoreVertical,
  BarChart3,
  Home,
  SkipBack,
  SkipForward
} from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useSlugCourses, useUnitsByCourse, useUpdateProgress, useCompleteCourse, useCompleteLesson, useUpdateTimeSpent } from "@/hooks/useCourse";
import { useAuth } from "@/hooks/useAuth";
import { useTasks, useTasksForUnits } from "@/hooks/useTask";
import { useMySubmissionsByUnit, useMySubmissionsByUnits } from "@/hooks/useSubmission";
import { toast } from "react-toastify";
import api from "@/lib/apiClient";
import UnitAccordion from "./UnitAccordion";

export default function CourseLearningPage() {
  const { courseId } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: course, isLoading: courseLoading } = useSlugCourses(courseId);
  const { data: units, isLoading: unitsLoading } = useUnitsByCourse(course?._id);
  const updateProgress = useUpdateProgress();
  const completeCourse = useCompleteCourse();
  const completeLesson = useCompleteLesson();
  const updateTimeSpentHook = useUpdateTimeSpent();

  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentUnitId, setCurrentUnitId] = useState(null);
  const [nextLesson, setNextLesson] = useState(null);
  const [openModules, setOpenModules] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [viewedLessons, setViewedLessons] = useState(new Set());
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [enrollmentData, setEnrollmentData] = useState(null);
  const [totalLessons, setTotalLessons] = useState(0);
  const [lessonStartTime, setLessonStartTime] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [lessonTimer, setLessonTimer] = useState(0);
  const [canProceedToNext, setCanProceedToNext] = useState(false);

  // Get unit IDs for fetching all tasks and submissions
  const unitIds = units?.map(unit => unit._id) || [];

  // Fetch tasks and submissions for all units (for progress calculation)
  const { data: allTasks = [] } = useTasksForUnits(unitIds);
  const { data: allSubmissions = [] } = useMySubmissionsByUnits(unitIds);

  // For current unit display
  const { data: currentUnitTasks } = useTasks(currentUnitId);
  const { data: currentUnitSubmissions } = useMySubmissionsByUnit(currentUnitId);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const nextBtnRef = useRef(null);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  // Fetch enrollment data
  const fetchEnrollment = async () => {
    if (user && course?._id) {
      try {
        const res = await api.get(`/enrollments/${course._id}/me`);
        const data = res.data;
        if (data.success) {
          setEnrollmentData(data.data);
          // Initialize completed lessons from enrollment data
          if (data.data.completedLessons) {
            setCompletedLessons(new Set(data.data.completedLessons));
          }
          // Set time spent
          setTimeSpent(data.data.timeSpent || 0);
        }
      } catch (err) {
        console.error("Failed to fetch enrollment:", err);
        // If enrollment not found (404), check if course is free for auto-enrollment
        if (err.response?.status === 404) {
          // Check if course is free (price = 0)
          if (course?.price === 0 || course?.price === undefined) {
            try {
              console.log("Free course detected, auto-enrolling...");
              const enrollRes = await api.post(`/enrollments/${course._id}/enroll`);
              const enrollData = enrollRes.data;
              if (enrollData.success) {
                console.log("Auto-enrolled successfully in free course, fetching enrollment data...");
                // Fetch enrollment again after enrolling
                const res = await api.get(`/enrollments/${course._id}/me`);
                const data = res.data;
                if (data.success) {
                  setEnrollmentData(data.data);
                  // Initialize completed lessons from enrollment data
                  if (data.data.completedLessons) {
                    setCompletedLessons(new Set(data.data.completedLessons));
                  }
                  // Set time spent
                  setTimeSpent(data.data.timeSpent || 0);
                  toast.success("Successfully enrolled in free course!");
                }
              }
            } catch (enrollErr) {
              console.error("Failed to auto-enroll in free course:", enrollErr);
              toast.error("Failed to enroll in free course. Please try again.");
            }
          } else {
            // Paid course - user needs to purchase first
            console.log("Paid course detected, enrollment not found - user needs to purchase");
            // Keep enrollmentData as null to show enrollment/purchase UI
          }
        } else {
          toast.error("Failed to fetch enrollment data. Please refresh the page.");
        }
      }
    }
  };

  useEffect(() => {
    fetchEnrollment();
  }, [user, course?._id]);

  // Calculate total lessons
  useEffect(() => {
    const calculateTotalLessons = async () => {
      if (units?.length) {
        let total = 0;
        for (const unit of units) {
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/${unit._id}`
            );
            const data = await res.json();
            if (data.success) {
              total += data.data?.length || 0;
            }
          } catch (err) {
            console.error("Failed to count lessons:", err);
          }
        }
        setTotalLessons(total);
      }
    };
    calculateTotalLessons();
  }, [units]);

  // Find next lesson function
  const findNextLesson = async (currentLessonId) => {
    if (!units?.length) return null;

    try {
      // Find all lessons across all units to determine sequence
      const allLessons = [];
      for (const unit of units) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/${unit._id}`
        );
        const data = await res.json();
        if (data.success && data.data) {
          allLessons.push(...data.data.map(lesson => ({
            ...lesson,
            unitId: unit._id,
            unitTitle: unit.title
          })));
        }
      }

      // Sort lessons by unit order and lesson orderIndex
      allLessons.sort((a, b) => {
        const unitAIndex = units.findIndex(u => u._id === a.unitId);
        const unitBIndex = units.findIndex(u => u._id === b.unitId);
        if (unitAIndex !== unitBIndex) return unitAIndex - unitBIndex;
        return (a.orderIndex || 0) - (b.orderIndex || 0);
      });

      // Find current lesson index and return next lesson
      const currentIndex = allLessons.findIndex(lesson => lesson._id === currentLessonId);
      if (currentIndex !== -1 && currentIndex < allLessons.length - 1) {
        return allLessons[currentIndex + 1];
      }
    } catch (error) {
      console.error("Failed to find next lesson:", error);
    }
    return null;
  };

  // Auto-load first lesson
  useEffect(() => {
    const fetchFirstLesson = async () => {
      if (!unitsLoading && units?.length && !currentLesson) {
        const firstUnit = units[0];
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/${firstUnit._id}`
          );
          const data = await res.json();
          if (data.success && data.data?.length > 0) {
            const lesson = data.data[0];
            setCurrentLesson(lesson);
            setCurrentUnitId(firstUnit._id);
          }
        } catch (err) {
          console.error("Failed to load first lesson:", err);
        }
      }
    };
    fetchFirstLesson();
  }, [unitsLoading, units, currentLesson]);

  // Find unit for current lesson
  useEffect(() => {
    if (currentLesson && units?.length) {
      // If lesson has unitId from findNextLesson, use it
      if (currentLesson.unitId) {
        setCurrentUnitId(currentLesson.unitId);
      } else {
        // Otherwise, find the unit that contains this lesson
        const findUnitForLesson = async () => {
          for (const unit of units) {
            try {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/${unit._id}`
              );
              const data = await res.json();
              if (data.success && data.data?.some(l => l._id === currentLesson._id)) {
                setCurrentUnitId(unit._id);
                break;
              }
            } catch (err) {
              console.error("Failed to check unit:", err);
            }
          }
        };
        findUnitForLesson();
      }
    }
  }, [currentLesson, units]);

  // Track lesson viewing and timer
  useEffect(() => {
    if (currentLesson && enrollmentData && !viewedLessons.has(currentLesson._id)) {
      setViewedLessons(prev => new Set([...prev, currentLesson._id]));
      setLessonStartTime(Date.now());
      setCanProceedToNext(false);

      // Find next lesson
      findNextLesson(currentLesson._id).then(nextLesson => {
        setNextLesson(nextLesson);
      });

      // Start lesson timer based on durationSec from database
      // If no duration set, allow immediate completion (no timer required)
      const lessonDuration = currentLesson.durationSec || 0;
      setLessonTimer(lessonDuration);
      // If no duration, set canProceedToNext immediately
      if (!currentLesson.durationSec) {
        setCanProceedToNext(true);
      }

      // Timer countdown
      timerRef.current = setInterval(() => {
        setLessonTimer(prev => {
          if (prev <= 1) {
            setCanProceedToNext(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [currentLesson, enrollmentData, viewedLessons]);

  // Auto-complete lesson disabled - students must manually click complete button
  // This ensures proper validation of task submissions

  // Progress calculation - dynamic based on completed lessons vs total lessons
  const completedLessonsCount = completedLessons.size;
  const overallProgress = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;
  const currentLessonIndex = completedLessonsCount + (viewedLessons.has(currentLesson?._id) ? 1 : 0);

  const toggleModule = (index) =>
    setOpenModules(openModules === index ? null : index);

  // Check if all tasks/quizzes are submitted for the current unit
  const checkAllTasksSubmitted = () => {
    if (!currentUnitTasks || currentUnitTasks.length === 0) return true; // No tasks means all are "submitted"

    if (!currentUnitSubmissions || currentUnitSubmissions.length === 0) return false; // Has tasks but no submissions

    // Create a set of submitted task IDs (handle both object and string IDs)
    const submittedTaskIds = new Set(
      currentUnitSubmissions.map(sub => {
        const taskId = sub.task?._id || sub.task;
        return String(taskId);
      })
    );

    // Check if all tasks have submissions
    const allTasksSubmitted = currentUnitTasks.every(task => submittedTaskIds.has(String(task._id)));

    return allTasksSubmitted;
  };

  // Check if all tasks and quizzes are submitted across ALL units for course completion
  const checkAllCourseTasksSubmitted = () => {
    if (!allTasks || allTasks.length === 0) return true; // No tasks means all are "submitted"

    if (!allSubmissions || allSubmissions.length === 0) return false; // Has tasks but no submissions

    // Create a set of submitted task IDs
    const submittedTaskIds = new Set(
      allSubmissions.map(sub => {
        const taskId = sub.task?._id || sub.task;
        return String(taskId);
      })
    );

    // Check if all tasks have submissions
    const allTasksSubmitted = allTasks.every(task => submittedTaskIds.has(String(task._id)));

    return allTasksSubmitted;
  };

  // Manual lesson completion
  const handleCompleteLesson = async (lessonId) => {
    if (!enrollmentData) {
      console.error("Cannot complete lesson: enrollmentData is missing");
      toast.error("Enrollment data not found. Please refresh the page.");
      return;
    }

    console.log("Starting lesson completion:", { lessonId, courseId: course?._id, enrollmentId: enrollmentData._id });
    console.log("Current unit tasks:", currentUnitTasks);
    console.log("Current unit submissions:", currentUnitSubmissions);
    console.log("All tasks submitted:", checkAllTasksSubmitted());

    // Check if all tasks are submitted before allowing completion
    const allTasksSubmitted = checkAllTasksSubmitted();
    // if (!allTasksSubmitted) {
    //   console.warn("Cannot complete lesson: not all tasks are submitted");
    //   toast.error("Please complete all tasks and quizzes in this unit before marking the lesson as complete.");
    //   return;
    // }

    if (!course?._id) {
      toast.error("Course data not available. Please refresh the page.");
      return;
    }

    try {
      console.log("Calling completeLesson mutation...");
      // Mark lesson as completed in backend (use mutateAsync to wait for response)
      const result = await completeLesson.mutateAsync({
        courseId: course._id,
        enrollmentId: enrollmentData._id,
        lessonId: lessonId
      });
      console.log("Lesson completion response:", result);

      // Update local state
      setCompletedLessons(prev => new Set([...prev, lessonId]));

      // Calculate actual time spent on this lesson
      const actualTimeSpent = lessonStartTime ? Math.floor((Date.now() - lessonStartTime) / 1000) : 0;
      setTimeSpent(prev => prev + actualTimeSpent);

      // Update time spent in backend
      updateTimeSpentHook.mutate({
        courseId: course._id,
        enrollmentId: enrollmentData._id,
        timeSpent: actualTimeSpent
      });

      // Invalidate queries to refresh progress and enrollment data
      queryClient.invalidateQueries({ queryKey: ["enrollmentCourse"] });
      queryClient.invalidateQueries({ queryKey: ["myPoints"] });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });

      // Refetch enrollment data to get updated progress from backend
      console.log("Refetching enrollment data...");
      await fetchEnrollment();
      console.log("Enrollment data refetched");

      toast.success("Lesson completed successfully! Progress updated.");
    } catch (error) {
      console.error("Failed to complete lesson:", error);
      console.error("Error details:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to complete lesson. Please try again.");
    }
  };

  // Navigate to next lesson
  const goToNextLesson = () => {
    console.log("nextLesson", nextLesson);  
    if (!nextLesson) return;

    // Also check if current lesson is completed
    if (!completedLessons.has(currentLesson?._id)) {
      toast.error("Please complete the current lesson before proceeding to the next one.");
      return;
    }

    setCurrentLesson(nextLesson);
    // Set unitId for the next lesson if it has one
    if (nextLesson.unitId) {
      setCurrentUnitId(nextLesson.unitId);
    }
    setDrawerOpen(false);
  };

  if (courseLoading || unitsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gradient-to-r from-blue-500 to-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading course content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="container mx-auto flex items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-white border border-gray-200 hover:shadow-md transition-all"
            >
              <Menu size={20} className="text-gray-700" />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 leading-tight line-clamp-1">
                  {course?.title}
                </h1>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {totalLessons} lessons • {overallProgress}% complete
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Progress Indicator */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500"
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
              <span className="text-sm font-semibold text-gray-700">{overallProgress}%</span>
            </div>

            <Link
              href="/dashboard"
              className="px-4 py-2.5 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Video Player Section */}
          <main className="lg:flex-1">
            {/* Enhanced Video Player */}
            <div className="bg-black rounded-2xl overflow-hidden shadow-xl">
              {/* Video Container */}
              <div className="relative w-full aspect-video bg-black">
                {currentLesson ? (
                  <iframe
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full"
                    src={currentLesson.contentUrl}
                    title={currentLesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                    <Play className="w-16 h-16 mb-4 text-gray-600" />
                    <p className="text-lg font-medium">Select a lesson to start learning</p>
                  </div>
                )}
              </div>

              {/* Lesson Info & Controls */}
              <div className="p-6 bg-white">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 text-xs font-semibold rounded-full">
                        Now Playing
                      </span>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          completedLessons.has(currentLesson?._id)
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                         Lesson {currentLessonIndex}
                         {completedLessons.has(currentLesson?._id) && ' ✓'}
                       </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {currentLesson?.title || "Select a lesson to begin"}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      {currentLesson?.description || "Choose a lesson from the course modules to start learning"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Complete Button - Always available */}
                    {!completedLessons.has(currentLesson?._id) && (
                      <button
                        onClick={() => handleCompleteLesson(currentLesson._id)}
                        className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 text-sm font-semibold"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Complete Lesson
                      </button>
                    )}

                    {/* Next Lesson Button - Only enabled after completion and all tasks submitted */}
            
                    {nextLesson && (
                      
                      <button
                        onClick={goToNextLesson}
                        disabled={!completedLessons.has(currentLesson?._id)}
                        className={`px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 text-sm font-semibold ${
                          completedLessons.has(currentLesson?._id)
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:-translate-y-0.5'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        title={!completedLessons.has(currentLesson?._id) 
                          ? "Complete the current lesson first" 
                          : !checkAllTasksSubmitted() 
                            ? "Complete all tasks and quizzes in this unit first"
                            : "Go to next lesson"}
                      >
                        Next Lesson
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
               
              </div>
            </div>

          </main>

          {/* Course Sidebar */}
          <aside className="lg:w-96 flex-shrink-0">
            {/* Course Modules Card */}
            <div className="bg-white h-full rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-500" />
                    Course Modules
                  </h3>
                  <div className="text-sm text-gray-500">
                    {overallProgress}% Complete
                  </div>
                </div>
                 
              </div>

              {/* Modules List */}
              <div className="h-[calc(100vh-300px)] overflow-y-auto p-2">
                {units?.map((module, moduleIndex) => (
                  <UnitAccordion
                    key={moduleIndex}
                    module={module}
                    moduleIndex={moduleIndex}
                    currentLesson={currentLesson}
                    setCurrentLesson={setCurrentLesson}
                    openModules={openModules}
                    toggleModule={toggleModule}
                    completedLessons={completedLessons}
                    submissions={allSubmissions}
                  />
                ))}
              </div>

              {/* Complete Course Button - Show when progress is 100%, disable if tasks/quizzes not submitted */}
              {enrollmentData && enrollmentData.status !== 'completed' && overallProgress === 100 && (
                <div className="p-6 border-t border-gray-200 bg-gradient-to-r from-emerald-50 to-green-50">
                  <button
                    onClick={async () => {
                      if (!course?._id) {
                        toast.error("Course data not available. Please refresh the page.");
                        return;
                      }

                      // Double-check all tasks are submitted before allowing completion
                      if (!checkAllCourseTasksSubmitted()) {
                        toast.error("Please complete all tasks and quizzes in all units before completing the course.");
                        return;
                      }

                      try {
                        // Fetch total points before completing course
                        const pointsResponse = await api.get(`/enrollments/courses/${course._id}/points/me`);
                        const totalPoints = pointsResponse.data?.data?.points || 0;
                        console.log(`🎓 Course Completion: User earned ${totalPoints} total points in this course`);

                        // Complete the course
                        await completeCourse.mutateAsync({
                          courseId: course._id,
                          enrollmentId: enrollmentData._id,
                          totalPoints: totalPoints
                        });

                        // Update enrollment status locally to show certificate button immediately
                        setEnrollmentData(prev => ({
                          ...prev,
                          status: 'completed',
                          completedAt: new Date()
                        }));

                        toast.success("Congratulations! Course completed successfully!");
                      } catch (error) {
                        console.error("Failed to complete course:", error);
                        toast.error("Failed to complete course. Please try again.");
                      }
                    }}
                    disabled={completeCourse.isLoading || !checkAllCourseTasksSubmitted()}
                    className={`w-full py-4 px-6 font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg transform hover:-translate-y-0.5 ${
                      !checkAllCourseTasksSubmitted()
                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                        : completeCourse.isLoading
                        ? 'bg-gray-500 text-gray-300 cursor-wait'
                        : 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white hover:shadow-xl'
                    }`}
                    title={!checkAllCourseTasksSubmitted() ? "Complete all tasks and quizzes first" : "Complete the course"}
                  >
                    {completeCourse.isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Completing Course...
                      </>
                    ) : !checkAllCourseTasksSubmitted() ? (
                      <>
                        <Award className="w-6 h-6" />
                        Complete All Tasks First
                      </>
                    ) : (
                      <>
                        <Award className="w-6 h-6" />
                        Complete Course
                      </>
                    )}
                  </button>
                  {!checkAllCourseTasksSubmitted() && (
                    <p className="text-sm text-amber-600 mt-2 text-center">
                      All tasks and quizzes must be submitted before completing the course.
                    </p>
                  )}
                </div>
              )}

              {/* Certificate Download Button - Show when course is completed */}
              {enrollmentData && enrollmentData.status === 'completed' && (
                <div className="p-6 border-t border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Course Completed!</h3>
                    <p className="text-sm text-gray-600">Congratulations on completing this course. Download your certificate below.</p>
                  </div>
                  <button
                    onClick={async () => {
                      try {
                        // Generate and download certificate
                        const response = await api.get(`/certificates/${course._id}/download`, {
                          responseType: 'blob'
                        });

                        // Create download link
                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', `${course.title}-Certificate.pdf`);
                        document.body.appendChild(link);
                        link.click();
                        link.remove();
                        window.URL.revokeObjectURL(url);

                        toast.success("Certificate downloaded successfully!");
                      } catch (error) {
                        console.error("Failed to download certificate:", error);
                        toast.error("Failed to download certificate. Please try again.");
                      }
                    }}
                    className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg transform hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Certificate
                  </button>
                </div>
              )}
            </div>

          </aside>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
            />
              <motion.div
                className="absolute left-0 top-0 h-full w-11/12 max-w-[380px] overflow-hidden bg-white shadow-xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="p-6 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Course Modules</h3>
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:shadow-md transition-all"
                  >
                    <X size={20} className="text-gray-700" />
                  </button>
                </div>
                
                {/* Mobile Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Your Progress</span>
                    <span className="font-semibold">{overallProgress}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                      style={{ width: `${overallProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <nav className="h-[calc(100%-140px)] overflow-y-auto p-4">
                {units?.map((module, moduleIndex) => (
                  <UnitAccordion
                    key={moduleIndex}
                    module={module}
                    moduleIndex={moduleIndex}
                    currentLesson={currentLesson}
                    setCurrentLesson={(lesson) => {
                      setCurrentLesson(lesson);
                      setDrawerOpen(false);
                    }}
                    openModules={openModules}
                    toggleModule={toggleModule}
                    completedLessons={completedLessons}
                  />
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}