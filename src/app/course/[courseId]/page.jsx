"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  PlayCircle,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function CourseLearningPage() {
  const [activeVideo, setActiveVideo] = useState({ module: 0, video: 0 });
  const [openModules, setOpenModules] = useState([0]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const nextBtnRef = useRef(null);

  // ---- Demo data ----
  const modules = useMemo(
    () => [
      {
        id: 1,
        title: "Module 1: Introduction",
        videos: [
          { id: 1, title: "Welcome & Setup", duration: "5:23", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { id: 2, title: "What is React?", duration: "8:45", url: "https://www.youtube.com/embed/tgbNymZ7vqY" },
        ],
      },
      {
        id: 2,
        title: "Module 2: Core Concepts",
        videos: [
          { id: 1, title: "JSX & Components", duration: "12:34", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { id: 2, title: "Props & State", duration: "18:22", url: "https://www.youtube.com/embed/tgbNymZ7vqY" },
          { id: 3, title: "Handling Events", duration: "9:45", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ],
      },
      {
        id: 3,
        title: "Module 3: Hooks",
        videos: [
          { id: 1, title: "useState Hook", duration: "10:12", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { id: 2, title: "useEffect Hook", duration: "15:20", url: "https://www.youtube.com/embed/tgbNymZ7vqY" },
        ],
      },
    ],
    []
  );

  const currentVideo =
    modules[activeVideo.module]?.videos[activeVideo.video] ?? modules[0].videos[0];

  const toggleModule = (index) => {
    setOpenModules((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleNextVideo = () => {
    const { module, video } = activeVideo;
    if (video < modules[module].videos.length - 1) {
      setActiveVideo({ module, video: video + 1 });
    } else if (module < modules.length - 1) {
      setActiveVideo({ module: module + 1, video: 0 });
    }
  };

  const handlePrevVideo = () => {
    const { module, video } = activeVideo;
    if (video > 0) {
      setActiveVideo({ module, video: video - 1 });
    } else if (module > 0) {
      const prevLen = modules[module - 1].videos.length;
      setActiveVideo({ module: module - 1, video: prevLen - 1 });
    }
  };

  // Keyboard shortcuts: left/right to navigate
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNextVideo();
        nextBtnRef.current?.focus();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevVideo();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeVideo, modules]);

  return (
    <div className="flex min-h-screen flex-col bg-[--color-background] text-[var(--color-text)]">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 w-full border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex container items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            {/* Mobile menu button */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-[--radius-default] border md:hidden"
              aria-label="Open modules"
            >
              <Menu size={18} />
            </button>

            <h1 className="text-base font-semibold sm:text-lg">Course: React for Beginners</h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Go to Dashboard button */}
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-[--radius-default] bg-[--color-primary] px-4 py-2 text-[var(--color-text)] transition hover:opacity-90"
              aria-label="Go to Dashboard"
              title="Go to Dashboard"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Go to Dashboard</span>
              <span className="sm:hidden">Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="mx-auto flex w-full container flex-1 gap-0 md:gap-6 px-4 p-6 lg:px-0 md:p-12">
        {/* Video Column */}
        <main className="flex min-w-0 flex-1 flex-col">
          {/* Clean video player: 16:9 responsive box with soft radius & shadow */}
          <div className="relative w-full overflow-hidden rounded-2xl bg-black shadow-md">
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                className="absolute left-0 top-0 h-full w-full"
                src={currentVideo.url}
                title={currentVideo.title}
                allowFullScreen
              />
            </div>
          </div>

          {/* Meta / Controls */}
          <div className="mt-4 flex flex-col justify-between gap-3 rounded-2xl border bg-white p-4 shadow-sm md:flex-row md:items-center">
            <div className="space-y-0.5">
              <p className="text-sm opacity-70">Now Playing</p>
              <h2 className="text-lg font-semibold">{currentVideo.title}</h2>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={handlePrevVideo}
                className="inline-flex items-center gap-2  px-3 py-2 text-sm hover:bg-gray-50"
                title="Previous lesson (←)"
              >
                <ChevronLeft size={16} />
                Prev
              </button>
              <button
                ref={nextBtnRef}
                onClick={handleNextVideo}
                className="inline-flex items-center gap-2 rounded-[--radius-default] bg-[--color-secondary] px-3 py-2 text-sm text-[var(--color-text)] hover:opacity-90"
                title="Next lesson (→)"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </main>

        {/* Sidebar (Desktop) */}
        <aside className="sticky top-[72px] hidden h-[calc(100vh-200px)] w-full max-w-80 flex-col overflow-y-auto rounded-2xl border bg-white shadow-sm md:flex">
          <h3 className="border-b p-4 text-sm font-semibold">Course Modules</h3>
          <nav className="flex-1">
            {modules.map((module, moduleIndex) => (
              <div key={module.id} className="border-b last:border-0">
                {/* Module Header */}
                <button
                  className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50"
                  onClick={() => toggleModule(moduleIndex)}
                  aria-expanded={openModules.includes(moduleIndex)}
                >
                  <span className="font-medium">{module.title}</span>
                  {openModules.includes(moduleIndex) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {/* Animated Videos */}
                <AnimatePresence initial={false}>
                  {openModules.includes(moduleIndex) && (
                    <motion.ul
                      key={`ul-${module.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="px-2 pb-2 overflow-hidden"
                    >
                      {module.videos.map((video, videoIndex) => {
                        const isActive = activeVideo.module === moduleIndex && activeVideo.video === videoIndex;
                        return (
                          <li key={video.id} className="p-1">
                            <button
                              onClick={() => setActiveVideo({ module: moduleIndex, video: videoIndex })}
                              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition ${
                                isActive
                                  ? "bg-[var(--color-text)] text-white"
                                  : "hover:bg-gray-100 text-[var(--color-text)]"
                              }`}
                            >
                              <span className="flex items-center gap-2">
                                <PlayCircle size={16} className={isActive ? "opacity-90" : "opacity-70"} />
                                <span className="text-sm">{video.title}</span>
                              </span>
                              <span className="text-xs">{video.duration}</span>
                            </button>
                          </li>
                        );
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>
        </aside>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/40"
              onClick={() => setDrawerOpen(false)}
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            {/* Panel */}
            <motion.div
              className="absolute left-0 top-0 h-full w-10/12 max-w-[320px] overflow-hidden rounded-r-2xl bg-white shadow-xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
            >
              <div className="flex items-center justify-between border-b px-4 py-3">
                <h3 className="text-sm font-semibold">Course Modules</h3>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-[--radius-default] border"
                  aria-label="Close modules"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="h-[calc(100%-56px)] overflow-y-auto">
                {modules.map((module, moduleIndex) => (
                  <div key={module.id} className="border-b last:border-0">
                    <button
                      className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50"
                      onClick={() => toggleModule(moduleIndex)}
                    >
                      <span className="font-medium">{module.title}</span>
                      {openModules.includes(moduleIndex) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    <AnimatePresence initial={false}>
                      {openModules.includes(moduleIndex) && (
                        <motion.ul
                          key={`m-ul-${module.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="px-2 pb-2 overflow-hidden"
                        >
                          {module.videos.map((video, videoIndex) => {
                            const isActive = activeVideo.module === moduleIndex && activeVideo.video === videoIndex;
                            return (
                              <li key={video.id} className="p-1">
                                <button
                                  onClick={() => {
                                    setActiveVideo({ module: moduleIndex, video: videoIndex });
                                    setDrawerOpen(false);
                                  }}
                                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition ${
                                    isActive
                                      ? "bg-[var(--color-text)] text-white"
                                      : "hover:bg-gray-100 text-[var(--color-text)]"
                                  }`}
                                >
                                  <span className="flex items-center gap-2">
                                    <PlayCircle size={16} className={isActive ? "opacity-90" : "opacity-70"} />
                                    <span className="text-sm">{video.title}</span>
                                  </span>
                                  <span className="text-xs">{video.duration}</span>
                                </button>
                              </li>
                            );
                          })}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
