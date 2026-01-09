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
import { useSlugCourses, useUnitsByCourse, useUpdateProgress, useCompleteCourse, useCompleteLesson, useUpdateTimeSpent } from "@/hooks/useCourse";
import { useAuth } from "@/hooks/useAuth";
import UnitAccordion from "./UnitAccordion";

export default function CourseLearningPage() {
  const { courseId } = useParams();
  const { user } = useAuth();
  const { data: course, isLoading: courseLoading } = useSlugCourses(courseId);
  const { data: units, isLoading: unitsLoading } = useUnitsByCourse(course?._id);
  const updateProgress = useUpdateProgress();
  const completeCourse = useCompleteCourse();
  const completeLesson = useCompleteLesson();
  const updateTimeSpentHook = useUpdateTimeSpent();

  const [currentLesson, setCurrentLesson] = useState(null);
  const [openModules, setOpenModules] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [viewedLessons, setViewedLessons] = useState(new Set());
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [enrollmentData, setEnrollmentData] = useState(null);
  const [totalLessons, setTotalLessons] = useState(0);
  const [lessonStartTime, setLessonStartTime] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const nextBtnRef = useRef(null);
  const videoRef = useRef(null);

  // Fetch enrollment data
  useEffect(() => {
    const fetchEnrollment = async () => {
      if (user && courseId) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/enrollments/${courseId}/me`,
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              }
            }
          );
          const data = await res.json();
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
        }
      }
    };
    fetchEnrollment();
  }, [user, courseId]);

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
            setCurrentLesson(data.data[0]);
          }
        } catch (err) {
          console.error("Failed to load first lesson:", err);
        }
      }
    };
    fetchFirstLesson();
  }, [unitsLoading, units, currentLesson]);

  // Track lesson start time
  useEffect(() => {
    if (currentLesson && enrollmentData) {
      setLessonStartTime(Date.now());
    }
  }, [currentLesson, enrollmentData]);

  // Track lesson completion and progress
  useEffect(() => {
    if (currentLesson && enrollmentData && !viewedLessons.has(currentLesson._id)) {
      setViewedLessons(prev => new Set([...prev, currentLesson._id]));

      // Mark lesson as completed after minimum viewing time (30 seconds for demo)
      const timer = setTimeout(() => {
        if (!completedLessons.has(currentLesson._id)) {
          // Mark lesson as completed in backend
          completeLesson.mutate({
            courseId: courseId,
            enrollmentId: enrollmentData._id,
            lessonId: currentLesson._id
          });

          // Update local state
          setCompletedLessons(prev => new Set([...prev, currentLesson._id]));

          // Update time spent (add 5 minutes per lesson for demo)
          const lessonTime = 5 * 60; // 5 minutes in seconds
          setTimeSpent(prev => prev + lessonTime);

          // Update time spent in backend
          updateTimeSpentHook.mutate({
            courseId: courseId,
            enrollmentId: enrollmentData._id,
            timeSpent: lessonTime
          });

          // Calculate progress based on completed lessons
          const completedCount = completedLessons.size + 1;
          const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

          // Update progress in backend
          updateProgress.mutate({
            courseId: courseId,
            enrollmentId: enrollmentData._id,
            progress: Math.min(100, progress)
          });
        }
      }, 30000); // 30 seconds for demo

      return () => clearTimeout(timer);
    }
  }, [currentLesson, enrollmentData, viewedLessons, completedLessons, totalLessons, updateProgress, completeLesson, updateTimeSpentHook, courseId]);

  // Progress calculation
  const completedLessonsCount = completedLessons.size;
  const overallProgress = enrollmentData?.progress || 0;
  const currentLessonIndex = completedLessonsCount + (viewedLessons.has(currentLesson?._id) ? 1 : 0);

  const toggleModule = (index) =>
    setOpenModules(openModules === index ? null : index);

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
                    <button className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 text-sm font-semibold">
                      Next Lesson
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
               
              </div>
            </div>

          </main>

          {/* Course Sidebar */}
          <aside className="lg:w-96 flex-shrink-0">
            {/* Course Modules Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
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
              <div className="h-[calc(100vh-350px)] overflow-y-auto p-2">
                {units?.map((module, moduleIndex) => (
                  <UnitAccordion
                    key={moduleIndex}
                    module={module}
                    moduleIndex={moduleIndex}
                    currentLesson={currentLesson}
                    setCurrentLesson={setCurrentLesson}
                    openModules={openModules}
                    toggleModule={toggleModule}
                  />
                ))}
              </div>

              {/* Complete Course Button */}
              {enrollmentData && enrollmentData.status !== 'completed' && (
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <button
                    onClick={() => {
                      completeCourse.mutate({
                        courseId: courseId,
                        enrollmentId: enrollmentData._id
                      });
                    }}
                    disabled={completeCourse.isLoading}
                    className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {completeCourse.isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Completing...
                      </>
                    ) : (
                      <>
                        <Award className="w-5 h-5" />
                        Complete Course
                      </>
                    )}
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