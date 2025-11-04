"use client";
import { useEffect, useRef, useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useSlugCourses, useUnitsByCourse } from "@/hooks/useCourse";
import UnitAccordion from "./UnitAccordion";

export default function CourseLearningPage() {
  const { courseId } = useParams();
  const { data: course, isLoading: courseLoading } = useSlugCourses(courseId);
  const { data: units, isLoading: unitsLoading } = useUnitsByCourse(course?._id);

  const [currentLesson, setCurrentLesson] = useState(null);
  const [openModules, setOpenModules] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const nextBtnRef = useRef(null);

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

  const toggleModule = (index) =>
    setOpenModules(openModules === index ? null : index);

  if (courseLoading || unitsLoading) {
    return <h2 className="text-center py-10">Loading...</h2>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[--color-background] text-[var(--color-text)]">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-[var(--color-background)]/70 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center md:hidden rounded-[--radius-default]"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <Menu size={18} />
            </button>
            <h1 className="mt-2 text-lg font-semibold leading-tight">
              {course?.title}
            </h1>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-[--radius-default] px-4 py-2 transition text-[var(--color-text)]"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to Dashboard</span>
            <span className="sm:hidden">Dashboard</span>
          </Link>
        </div>
      </header>

      {/* Main */}
      <div className="container mx-auto flex w-full flex-1 gap-0 px-4 py-6 md:gap-6">
        {/* Video section */}
        <main className="flex min-w-0 flex-1 flex-col">
          <div
            className="rounded-2xl shadow-sm"
            style={{
              background: "rgba(255,255,255,var(--container-opacity))",
              boxShadow: "var(--shadow-medium)",
            }}
          >
            <div className="relative w-full overflow-hidden rounded-t-[var(--radius-card)]">
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                {currentLesson ? (
                  <iframe
                    className="absolute left-0 top-0 h-full w-full"
                    src={currentLesson.contentUrl}
                    title={currentLesson.title}
                    allowFullScreen
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    Select a lesson to start learning
                  </div>
                )}
              </div>
            </div>

            {/* Lesson info */}
            <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm opacity-70">Now Playing</p>
                <h2 className="text-lg font-semibold">
                  {currentLesson?.title || "No lesson selected"}
                </h2>
              </div>

              {/* <div className="flex items-center gap-2">
                <button
                  className="inline-flex items-center gap-2 rounded-[--radius-default] px-4 py-2 text-sm transition hover:bg-white/70"
                  style={{ background: "white", boxShadow: "var(--shadow-soft)" }}
                >
                  <ChevronLeft size={16} />
                  Prev
                </button>

                <button
                  ref={nextBtnRef}
                  className="inline-flex items-center gap-2 rounded-[--radius-default] px-4 py-2 text-sm text-white transition"
                  style={{
                    background: "var(--color-secondary)",
                    boxShadow: "var(--shadow-medium)",
                  }}
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div> */}
            </div>
          </div>
        </main>

        {/* Sidebar */}
        <aside
          className="sticky top-[96px] hidden h-[calc(100vh-215px)] w-full max-w-80 flex-col overflow-y-auto rounded-2xl shadow-sm md:flex"
          style={{
            background: "rgba(255,255,255,var(--container-opacity))",
            boxShadow: "var(--shadow-medium)",
          }}
        >
          <div className="p-4">
            <h3 className="text-sm font-semibold">Course Modules</h3>
          </div>
          <nav className="flex-1">
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
          </nav>
        </aside>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/40"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              className="absolute left-0 top-0 h-full w-11/12 max-w-[340px] overflow-hidden rounded-r-2xl bg-white shadow-lg"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
            >
              <div className="flex items-center justify-between px-4 py-3">
                <h3 className="text-sm font-semibold">Course Modules</h3>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-[--radius-default] bg-white"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <X size={18} />
                </button>
              </div>
              <nav className="h-[calc(100%-56px)] overflow-y-auto px-2 pb-3">
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

      <footer className="px-4 pb-6 pt-2 text-center text-xs opacity-70">
        Tip: Use <kbd className="rounded px-1 py-0.5 bg-white shadow">←</kbd> /{" "}
        <kbd className="rounded px-1 py-0.5 bg-white shadow">→</kbd> to navigate lessons.
      </footer>
    </div>
  );
}
