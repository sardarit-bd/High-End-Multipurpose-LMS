"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, PlusCircle, Edit, Video, FileText } from "lucide-react";
import { useLessons } from "@/hooks/useLessons";
import LessonFormModal from "./LessonFormModal";
import Link from "next/link";

export default function LessonManager({ courseUnits }) {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);

  // Auto-select first unit and lesson
  useEffect(() => {
    if (courseUnits?.length && !selectedUnit) setSelectedUnit(courseUnits[0]);
  }, [courseUnits]);

  const { data: lessons = [], isLoading } = useLessons(selectedUnit?._id);

  useEffect(() => {
    if (lessons?.length && !selectedLesson) setSelectedLesson(lessons[0]);
  }, [lessons]);


  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
      {/* LEFT: Units and Lessons */}
      <div className="bg-white/95 p-4 rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] overflow-y-auto max-h-[80vh]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[var(--color-secondary)] flex items-center gap-2">
            <BookOpen size={18} /> Course Units
          </h2>
          <button
            onClick={() => {
              setEditingLesson(null);
              setShowModal(true);
            }}
            className="flex items-center gap-1 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-semibold text-sm"
          >
            <PlusCircle size={16} /> Add Lesson
          </button>
           {/* <Link
          href={`/dashboard/instructor/courses/${id}/units/${unitId}/quizzes`}
          className="text-[var(--color-primary)] hover:underline text-sm"
        >
          Manage Quizzes →
        </Link> */}
        </div>
          {console.log(courseUnits)}
        {courseUnits?.map((unit) => (
          <motion.div
            key={unit._id}
            layout
            className={`border rounded-[var(--radius-default)] mb-3 transition ${
              selectedUnit?._id === unit._id
                ? "border-[var(--color-primary)] bg-[var(--color-background)]"
                : "border-gray-200"
            }`}
          >
            <button
              onClick={() => {
                setSelectedUnit(unit);
                setSelectedLesson(null);
              }}
              className="w-full text-left p-3 font-medium text-[var(--color-text)]"
            >
              {unit.title}
            </button>

            <AnimatePresence>
              {selectedUnit?._id === unit._id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t p-2 space-y-2"
                >
                  {isLoading ? (
                    <p className="text-sm text-gray-500">Loading lessons...</p>
                  ) : lessons?.length ? (
                    lessons.map((lesson) => (
                      <button
                        key={lesson._id}
                        onClick={() => setSelectedLesson(lesson)}
                        className={`block w-full text-left px-3 py-2 rounded-[var(--radius-default)] ${
                          selectedLesson?._id === lesson._id
                            ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        {lesson.title}
                      </button>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 italic px-2">
                      No lessons yet.
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* RIGHT: Lesson Preview */}
      <div className="bg-white/95 p-6 rounded-[var(--radius-card)] shadow-[var(--shadow-medium)] overflow-y-auto max-h-[80vh]">
        {selectedLesson ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-[var(--color-text)]">
                {selectedLesson.title}
              </h2>
              <button
                onClick={() => {
                  setEditingLesson(selectedLesson);
                  setShowModal(true);
                }}
                className="flex items-center gap-1 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-semibold"
              >
                <Edit size={16} /> Edit
              </button>
            </div>

            <p className="text-sm text-gray-700 mb-2">
              <strong>Duration:</strong> {selectedLesson.durationSec}s
            </p>
            <p className="text-sm text-gray-700 mb-4">
              <strong>Type:</strong> {selectedLesson.contentType}
            </p>

            <div className="rounded-[var(--radius-default)] overflow-hidden border border-gray-200">
              {selectedLesson.contentType === "video" ? (
                <video
                  src={selectedLesson.contentUrl}
                  controls
                  className="w-full h-72 object-cover"
                />
              ) : selectedLesson.contentType === "pdf" ? (
                <iframe src={selectedLesson.contentUrl} className="w-full h-72" />
              ) : (
                <iframe src={selectedLesson.contentUrl} className="w-full h-72 bg-gray-50" />
              )}
            </div>
          </>
        ) : (
          <div className="text-gray-500 italic text-center py-20">
            Select a lesson to preview or click “Add Lesson”.
          </div>
        )}
      </div>

      {/* POPUP FORM */}
      <LessonFormModal
        open={showModal}
        onClose={() => setShowModal(false)}
        unitId={selectedUnit?._id}
        units={courseUnits}
        lesson={editingLesson}
      />
    </div>
  );
}
