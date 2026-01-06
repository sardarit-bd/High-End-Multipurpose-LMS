"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlayCircle, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useLessonsByUnit } from "@/hooks/useCourse";

export default function CourseContent({ units = [] }) {
  const [openUnit, setOpenUnit] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);

  return (
    <>
      <section className="bg-white shadow-sm rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold text-[var(--color-secondary)] mb-4">
          Course Content
        </h2>

        {!units?.length ? (
          <p className="text-gray-500">No units found for this course.</p>
        ) : (
          <div className="divide-y">
            {units.map((unit, idx) => (
              <UnitAccordion
                key={unit._id || idx}
                unit={unit}
                isOpen={openUnit === idx}
                onToggle={() => setOpenUnit(openUnit === idx ? null : idx)}
                setPreviewVideo={setPreviewVideo}
              />
            ))}
          </div>
        )}
      </section>

      {/* ==== Preview Video Modal ==== */}
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
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-end p-2">
                <button
                  onClick={() => setPreviewVideo(null)}
                  className="text-gray-600 hover:text-red-500 text-xl"
                >
                  ✕
                </button>
              </div>
              <div className="aspect-video">
                <iframe
                  src={previewVideo}
                  title="Preview Video"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------ Sub Component ------------------------------ */
function UnitAccordion({ unit, isOpen, onToggle, setPreviewVideo }) {
  const { data: lessons = [], isLoading } = useLessonsByUnit(unit._id);

  return (
    <div className="py-3">
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full text-left font-medium text-[var(--color-text)]"
      >
        {unit.title}
        {isOpen ? (
          <FiChevronUp className="text-[var(--color-secondary)]" />
        ) : (
          <FiChevronDown className="text-gray-500" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 space-y-2 overflow-hidden"
          >
            {isLoading ? (
              <li className="text-gray-500 italic text-sm py-2 px-4">
                Loading lessons...
              </li>
            ) : lessons.length ? (
              lessons.map((lesson) => (
                <li
                  key={lesson._id}
                  className="flex justify-between items-center text-sm p-3 rounded-lg bg-[var(--color-background)] hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-2">
                    <FiPlayCircle className="text-[var(--color-primary)]" />
                    <span className="text-[var(--color-text)] font-medium">
                      {lesson.title}
                    </span>

                    {lesson.contentType === "video" && (
                      <button
                        onClick={() => setPreviewVideo(lesson.contentUrl)}
                        className="ml-2 text-[var(--color-accent)] text-xs font-semibold underline hover:text-[var(--color-secondary)]"
                      >
                        Preview
                      </button>
                    )}
                  </div>
                  <span className="text-gray-500 text-xs">
                    {lesson.contentType === "pdf" ? "PDF" : "Video"}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-gray-500 italic text-sm py-2 px-4">
                No lessons found for this unit.
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
