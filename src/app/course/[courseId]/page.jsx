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

  const modules = useMemo(
    () => [
      {
        id: 1,
        title: "Module 1 · Introduction",
        videos: [
          { id: 1, title: "Welcome & Setup", duration: "5:23", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { id: 2, title: "What is React?", duration: "8:45", url: "https://www.youtube.com/embed/tgbNymZ7vqY" },
        ],
      },
      {
        id: 2,
        title: "Module 2 · Core Concepts",
        videos: [
          { id: 1, title: "JSX & Components", duration: "12:34", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { id: 2, title: "Props & State", duration: "18:22", url: "https://www.youtube.com/embed/tgbNymZ7vqY" },
          { id: 3, title: "Handling Events", duration: "9:45", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ],
      },
      {
        id: 3,
        title: "Module 3 · Hooks",
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

  const totalLessons = modules.reduce((n, m) => n + m.videos.length, 0);
  const currentIndex =
    modules.slice(0, activeVideo.module).reduce((n, m) => n + m.videos.length, 0) +
    activeVideo.video + 1;
  const progressPct = Math.round((currentIndex / totalLessons) * 100);

  const toggleModule = (index) =>
    setOpenModules((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));

  const handleNextVideo = () => {
    const { module, video } = activeVideo;
    if (video < modules[module].videos.length - 1) setActiveVideo({ module, video: video + 1 });
    else if (module < modules.length - 1) setActiveVideo({ module: module + 1, video: 0 });
  };

  const handlePrevVideo = () => {
    const { module, video } = activeVideo;
    if (video > 0) setActiveVideo({ module, video: video - 1 });
    else if (module > 0) {
      const prevLen = modules[module - 1].videos.length;
      setActiveVideo({ module: module - 1, video: prevLen - 1 });
    }
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); handleNextVideo(); nextBtnRef.current?.focus(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); handlePrevVideo(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeVideo, modules]);

  return (
    <div className="flex min-h-screen flex-col bg-[--color-background] text-[var(--color-text)]">
      {/* Header (card-like, no border) */}
      <header className="sticky top-0 z-40 w-full bg-[var(--color-background)]/70 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center md:hidden rounded-[--radius-default]"
              aria-label="Open modules"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <Menu size={18} />
            </button>

            <div>
              <h1 className="mt-2 text-lg font-semibold leading-tight">React for Beginners</h1>
            </div>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-[--radius-default] px-4 py-2  transition text-[var(--color-text)]"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to Dashboard</span>
            <span className="sm:hidden">Dashboard</span>
          </Link>
        </div>

        {/* Progress (thin, no border) */}
        <div className="h-1 w-full bg-black/10">
          <div className="h-1 transition-all" style={{ width: `${progressPct}%`, background: "var(--color-secondary)" }} />
        </div>
      </header>

      {/* Main */}
      <div className="container mx-auto flex w-full flex-1 gap-0 px-4 py-6 md:gap-6">
        {/* Video card */}
        <main className="flex min-w-0 flex-1 flex-col">
          <div
            className="rounded-2xl shadow-sm"
            style={{ background: "rgba(255,255,255,var(--container-opacity))", boxShadow: "var(--shadow-medium)" }}
          >
            {/* Player */}
            <div className="relative w-full overflow-hidden rounded-t-[var(--radius-card)]">
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  className="absolute left-0 top-0 h-full w-full"
                  src={currentVideo.url}
                  title={currentVideo.title}
                  allowFullScreen
                />
              </div>

              <div
                className="pointer-events-none absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-medium"
                style={{ background: "var(--color-accent)", color: "var(--color-text)", boxShadow: "var(--shadow-soft)" }}
              >
                {currentIndex} / {totalLessons}
              </div>
            </div>

            {/* Controls  */}
            <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm opacity-70">Now Playing</p>
                <h2 className="text-lg font-semibold">{currentVideo.title}</h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevVideo}
                  className="inline-flex items-center gap-2 rounded-[--radius-default] px-4 py-2 text-sm transition hover:bg-white/70"
                  title="Previous lesson (←)"
                  style={{ background: "white", boxShadow: "var(--shadow-soft)" }}
                >
                  <ChevronLeft size={16} />
                  Prev
                </button>

                <button
                  ref={nextBtnRef}
                  onClick={handleNextVideo}
                  className="inline-flex items-center gap-2 rounded-[--radius-default] px-4 py-2 text-sm text-white transition"
                  title="Next lesson (→)"
                  style={{ background: "var(--color-secondary)", boxShadow: "var(--shadow-medium)" }}
                  onMouseEnter={(e) => ((e.currentTarget).style.background = "var(--color-secondary-hover)")}
                  onMouseLeave={(e) => ((e.currentTarget).style.background = "var(--color-secondary)")}
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Sidebar card (desktop) */}
        <aside
          className="sticky top-[96px] hidden h-[calc(100vh-215px)] w-full max-w-80 flex-col overflow-y-auto rounded-2xl shadow-sm md:flex"
          style={{ background: "rgba(255,255,255,var(--container-opacity))", boxShadow: "var(--shadow-medium)" }}
        >
          <div className="p-4">
            <h3 className="text-sm font-semibold">Course Modules</h3>
          </div>

          <nav className="flex-1">
            {modules.map((module, moduleIndex) => (
              <div key={module.id} className="px-2">
                <button
                  className="mt-2 flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition hover:bg-white/70"
                  onClick={() => toggleModule(moduleIndex)}
                  aria-expanded={openModules.includes(moduleIndex)}
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <span className="font-bold">{module.title}</span>
                  {openModules.includes(moduleIndex) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                <AnimatePresence initial={false}>
                  {openModules.includes(moduleIndex) && (
                    <motion.ul
                      key={`ul-${module.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden pb-2 pt-1"
                    >
                      {module.videos.map((video, videoIndex) => {
                        const isActive = activeVideo.module === moduleIndex && activeVideo.video === videoIndex;
                        return (
                          <li key={video.id} className="p-1">
                            <button
                              onClick={() => setActiveVideo({ module: moduleIndex, video: videoIndex })}
                              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition ${
                                isActive ? "text-white" : "hover:bg-white/70 text-[var(--color-text)]"
                              }`}
                              style={{
                                background: isActive ? "var(--color-primary)" : "transparent",
                                boxShadow: "var(--shadow-soft)",
                              }}
                            >
                              <span className="flex items-center gap-2">
                                <PlayCircle size={16} className={isActive ? "opacity-90" : "opacity-70"} />
                                <span className="text-sm">{video.title}</span>
                              </span>
                              <span className="text-xs opacity-80">{video.duration}</span>
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

      {/* Mobile Drawer (card-style, no borders) */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div className="fixed inset-0 z-50 md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="absolute inset-0 bg-black/40"
              onClick={() => setDrawerOpen(false)}
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="absolute left-0 top-0 h-full w-11/12 max-w-[340px] overflow-hidden rounded-r-2xl"
              style={{ background: "white", boxShadow: "var(--shadow-medium)" }}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
            >
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full" style={{ background: "var(--color-accent)" }} />
                  <h3 className="text-sm font-semibold">Course Modules</h3>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-[--radius-default] bg-white"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                  aria-label="Close modules"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="h-[calc(100%-56px)] overflow-y-auto px-2 pb-3">
                {modules.map((module, moduleIndex) => (
                  <div key={module.id} className="pt-1">
                    <button
                      className="mt-2 flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition hover:bg-black/5"
                      onClick={() => toggleModule(moduleIndex)}
                      style={{ boxShadow: "var(--shadow-soft)" }}
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
                          className="overflow-hidden pb-2 pt-1"
                        >
                          {module.videos.map((video, videoIndex) => {
                            const isActive = activeVideo.module === moduleIndex && activeVideo.video === videoIndex;
                            return (
                              <li key={video.id} className="p-1">
                                <button
                                  onClick={() => { setActiveVideo({ module: moduleIndex, video: videoIndex }); setDrawerOpen(false); }}
                                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition ${
                                    isActive ? "text-white" : "hover:bg-black/5 text-[var(--color-text)]"
                                  }`}
                                  style={{
                                    background: isActive ? "var(--color-text)" : "transparent",
                                    boxShadow: "var(--shadow-soft)",
                                  }}
                                >
                                  <span className="flex items-center gap-2">
                                    <PlayCircle size={16} className={isActive ? "opacity-90" : "opacity-70"} />
                                    <span className="text-sm">{video.title}</span>
                                  </span>
                                  <span className="text-xs opacity-80">{video.duration}</span>
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

      <footer className="px-4 pb-6 pt-2 text-center text-xs opacity-70">
        Tip: Use <kbd className="rounded px-1 py-0.5 bg-white shadow">←</kbd> /{" "}
        <kbd className="rounded px-1 py-0.5 bg-white shadow">→</kbd> to navigate lessons.
      </footer>
    </div>
  );
}
