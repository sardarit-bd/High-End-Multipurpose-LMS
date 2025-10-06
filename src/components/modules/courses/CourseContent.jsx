"use client";
import { useState } from "react";
import { FiPlayCircle, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const courseContent = [
  {
    module: "Getting Started",
    lectures: [
      {
        title: "Introduction to the User Experience Course",
        duration: "02:53",
        preview: true,
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example
      },
      {
        title: "Exercise: Your first design challenge",
        duration: "05:12",
        preview: true,
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
    ],
  },
  {
    module: "Module 1: Basics of UX",
    lectures: [
      { title: "Understanding Users", duration: "08:30" },
      { title: "Personas and Scenarios", duration: "10:45" },
    ],
  },
  {
    module: "Module 2: Advanced Design",
    lectures: [
      { title: "Wireframes & Prototypes", duration: "12:00" },
      { title: "Usability Testing", duration: "07:25" },
    ],
  },
];

export default function CourseContent() {
  const [openModule, setOpenModule] = useState(0);
  const [previewVideo, setPreviewVideo] = useState(null);

  return (
    <>
      <section className="bg-white shadow-sm rounded-[var(--radius-card)] p-6 mb-6">
        <h2 className="text-xl font-semibold text-[var(--color-secondary)] mb-4">
          Course Content
        </h2>

        <div className="divide-y">
          {courseContent.map((module, idx) => (
            <div key={idx} className="py-3">
              {/* Module Header */}
              <button
                onClick={() => setOpenModule(openModule === idx ? null : idx)}
                className="flex justify-between items-center w-full text-left font-medium text-[var(--color-text)]"
              >
                {module.module}
                {openModule === idx ? (
                  <FiChevronUp className="text-[var(--color-secondary)]" />
                ) : (
                  <FiChevronDown className="text-gray-500" />
                )}
              </button>

              {/* Lectures */}
              {openModule === idx && (
                <ul className="mt-3 space-y-2">
                  {module.lectures.map((lec, lIdx) => (
                    <li
                      key={lIdx}
                      className="flex justify-between items-center text-sm p-3 rounded-lg bg-[var(--color-background)]"
                    >
                      <div className="flex items-center gap-2">
                        <FiPlayCircle className="text-[var(--color-primary)]" />
                        <span className="text-[var(--color-primary)]">
                          {lec.title}
                        </span>
                        {lec.preview && (
                          <button
                            onClick={() => setPreviewVideo(lec.videoUrl || null)}
                            className="ml-2 text-[var(--color-accent)] text-xs font-semibold underline hover:text-[var(--color-secondary)]"
                          >
                            Preview
                          </button>
                        )}
                      </div>
                      <span className="text-gray-600">{lec.duration}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ==== Popup Modal ==== */}
      <AnimatePresence>
        {previewVideo && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg w-full max-w-3xl overflow-hidden"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close button */}
              <div className="flex justify-end p-2">
                <button
                  onClick={() => setPreviewVideo(null)}
                  className="text-gray-600 hover:text-red-500 text-xl"
                >
                  ✕
                </button>
              </div>

              {/* Responsive iframe */}
              <div className="aspect-video">
                <iframe
                  src={previewVideo}
                  title="Preview Video"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
