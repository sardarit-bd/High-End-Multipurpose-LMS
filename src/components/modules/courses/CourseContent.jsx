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
      <section className="bg-gradient-to-br from-white to-emerald-50/50 rounded-2xl border border-emerald-100 shadow-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-[var(--color-primary)] to-emerald-500 rounded-lg">
            <FiPlayCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[var(--color-text)]">
              Course Content
            </h2>
            <p className="text-sm text-gray-600">
              {units.length} units • Click to expand lessons
            </p>
          </div>
        </div>

        {!units?.length ? (
          <div className="text-center py-8">
            <div className="inline-block p-4 bg-emerald-50 rounded-full mb-3">
              <FiPlayCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <p className="text-gray-600">No units found for this course.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {units.map((unit, idx) => (
              <UnitAccordion
                key={unit._id || idx}
                unit={unit}
                index={idx}
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
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden border border-gray-200"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring" }}
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <h3 className="font-bold text-lg text-gray-900">Lesson Preview</h3>
                <button
                  onClick={() => setPreviewVideo(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <span className="text-xl">×</span>
                </button>
              </div>
              <div className="aspect-video bg-black">
                <iframe
                  src={previewVideo}
                  title="Preview Video"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="text-sm text-gray-600">
                  Press <kbd className="px-2 py-1 bg-white border rounded mx-1">ESC</kbd> to close
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------ Sub Component ------------------------------ */
function UnitAccordion({ unit, index, isOpen, onToggle, setPreviewVideo }) {
  const { data: lessons = [], isLoading } = useLessonsByUnit(unit._id);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`rounded-xl border transition-all duration-300 ${isOpen
          ? "border-emerald-200 bg-gradient-to-br from-white to-emerald-50/30 shadow-md"
          : "border-gray-200 hover:border-emerald-200 hover:shadow-sm"
        }`}
    >
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full text-left p-4 hover:bg-emerald-50/20 rounded-xl transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${isOpen
              ? "bg-gradient-to-r from-[var(--color-primary)] to-emerald-500 text-white"
              : "bg-gray-100 text-gray-700"
            }`}>
            {index + 1}
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-900">{unit.title}</h3>
            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
              <span>{lessons.length} lessons</span>
              {unit.duration && <span>• {unit.duration}</span>}
            </div>
          </div>
        </div>
        <div className={`p-1.5 rounded-lg transition-colors ${isOpen
            ? "bg-emerald-100 text-[var(--color-primary)]"
            : "bg-gray-100 text-gray-500"
          }`}>
          {isOpen ? (
            <FiChevronUp className="w-5 h-5" />
          ) : (
            <FiChevronDown className="w-5 h-5" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-100 overflow-hidden"
          >
            <div className="p-4">
              {isLoading ? (
                <div className="flex items-center justify-center gap-2 py-8">
                  <div className="w-4 h-4 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-gray-600">Loading lessons...</span>
                </div>
              ) : lessons.length ? (
                <div className="space-y-3">
                  {lessons.map((lesson, lessonIdx) => (
                    
                    <motion.div
                      key={lesson._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: lessonIdx * 0.05 }}
                      className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-gray-50/50 to-gray-50/30 hover:bg-gray-100/50 border border-gray-100 transition-all group"
                    >
                     
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md bg-gradient-to-r from-blue-50 to-blue-50/50 border border-blue-100">
                          <FiPlayCircle className="w-4 h-4 text-blue-500" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover:text-[var(--color-primary)] transition-colors">
                            {lesson.title}
                          </h4>
                          <div className="flex items-center gap-3 mt-1">
                            {lesson.contentType === "video" && index === 0 && (
                              <button
                                onClick={() => setPreviewVideo(lesson.contentUrl)}
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                              >
                                Preview
                              </button>
                            )}
                            <span className="text-xs text-gray-500 capitalize">
                              {lesson.contentType}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-medium">
                        {lesson.durationSec ? `${lesson.durationSec}s` : "5m"}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 bg-gradient-to-br from-gray-50 to-gray-50/30 rounded-lg border border-dashed border-gray-300">
                  <FiPlayCircle className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">No lessons found for this unit.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}