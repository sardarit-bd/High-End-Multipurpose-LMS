"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, PlusCircle, Edit, Video, FileText, PlayCircle, File, ChevronRight, ChevronDown, Clock, BarChart, Eye, X, Plus, Users, Globe, Lock } from "lucide-react";
import { useLessons } from "@/hooks/useLessons";
import LessonFormModal from "./LessonFormModal";
import Link from "next/link";

export default function LessonManager({ courseUnits }) {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [expandedUnits, setExpandedUnits] = useState(new Set());

  // Auto-select first unit and lesson
  useEffect(() => {
    if (courseUnits?.length && !selectedUnit) {
      setSelectedUnit(courseUnits[0]);
      setExpandedUnits(new Set([courseUnits[0]._id]));
    }
  }, [courseUnits]);

  const { data: lessons = [], isLoading } = useLessons(selectedUnit?._id);

  useEffect(() => {
    if (lessons?.length && !selectedLesson) setSelectedLesson(lessons[0]);
  }, [lessons]);

  const toggleUnit = (unitId) => {
    const newExpanded = new Set(expandedUnits);
    if (newExpanded.has(unitId)) {
      newExpanded.delete(unitId);
    } else {
      newExpanded.add(unitId);
    }
    setExpandedUnits(newExpanded);
  };

  const getLessonIcon = (contentType) => {
    switch (contentType) {
      case "video": return <PlayCircle className="w-4 h-4 text-[var(--color-text)]" />;
      case "pdf": return <FileText className="w-4 h-4 text-rose-500" />;
      case "quiz": return <BarChart className="w-4 h-4 text-amber-500" />;
      default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-special)] rounded-xl">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text)]">
              Lesson Management
            </h1>
            <p className="text-[var(--color-text)]/70">
              Organize and manage all course content
            </p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-emerald-100 shadow-[var(--shadow-soft)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-text)]/70">Total Units</p>
                <p className="text-2xl font-bold text-[var(--color-text)]">{courseUnits?.length || 0}</p>
              </div>
              <div className="p-2 bg-emerald-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-blue-100 shadow-[var(--shadow-soft)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-text)]/70">Total Lessons</p>
                <p className="text-2xl font-bold text-[var(--color-text)]">{lessons?.length || 0}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <PlayCircle className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-amber-100 shadow-[var(--shadow-soft)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-text)]/70">Active Unit</p>
                <p className="text-lg font-bold text-[var(--color-text)] truncate">{selectedUnit?.title || "None"}</p>
              </div>
              <div className="p-2 bg-amber-100 rounded-lg">
                <Eye className="w-5 h-5 text-amber-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Units and Lessons - 5 columns */}
        <div className="lg:col-span-5">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-emerald-100 shadow-[var(--shadow-medium)] overflow-hidden">
            <div className="p-6 border-b border-emerald-50">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[var(--color-text)] flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[var(--color-primary)]" />
                  Course Structure
                </h2>
                <button
                  onClick={() => {
                    setEditingLesson(null);
                    setShowModal(true);
                  }}
                  className="group bg-gradient-to-r from-[var(--color-primary)] to-emerald-500 hover:from-[var(--color-primary-hover)] hover:to-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-2 hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  New Lesson
                </button>
              </div>
              <p className="text-sm text-[var(--color-text)]/70 mt-1">
                Click on a unit to view its lessons
              </p>
            </div>

            <div className="p-4 overflow-y-auto max-h-[calc(100vh-300px)]">
              {courseUnits?.map((unit, index) => (
                <motion.div
                  key={unit._id}
                  layout
                  className={`mb-3 transition-all duration-300`}
                >
                  <div
                    className={`rounded-xl p-4 cursor-pointer transition-all duration-300 ${selectedUnit?._id === unit._id
                        ? "bg-gradient-to-r from-emerald-50 to-emerald-50/50 border border-emerald-200"
                        : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                      }`}
                    onClick={() => {
                      setSelectedUnit(unit);
                      toggleUnit(unit._id);
                      setSelectedLesson(null);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedUnit?._id === unit._id
                            ? "bg-[var(--color-primary)] text-white"
                            : "bg-gray-200 text-gray-700"
                          }`}>
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-medium text-[var(--color-text)]">{unit.title}</h3>
                          <div className="flex items-center gap-3 text-xs text-[var(--color-text)]/60 mt-1">
                            <span className="flex items-center gap-1">
                              <PlayCircle className="w-3 h-3" />
                              {unit.lessonCount || 0} lessons
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {unit.duration || "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${expandedUnits.has(unit._id) ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedUnits.has(unit._id) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-8 mt-2 space-y-2 border-l-2 border-emerald-200 pl-4"
                      >
                        {isLoading && selectedUnit?._id === unit._id ? (
                          <div className="py-3 text-center">
                            <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-[var(--color-primary)]"></div>
                            <p className="text-xs text-gray-500 mt-2">Loading lessons...</p>
                          </div>
                        ) : lessons?.length && selectedUnit?._id === unit._id ? (
                          lessons.map((lesson, lessonIndex) => (
                            <motion.button
                              key={lesson._id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: lessonIndex * 0.05 }}
                              onClick={() => setSelectedLesson(lesson)}
                              className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-start gap-3 ${selectedLesson?._id === lesson._id
                                  ? "bg-gradient-to-r from-blue-50 to-blue-50/50 border border-blue-200 shadow-sm"
                                  : "hover:bg-gray-50 border border-transparent"
                                }`}
                            >
                              <div className={`p-2 rounded-md ${selectedLesson?._id === lesson._id
                                  ? "bg-blue-100"
                                  : "bg-gray-100"
                                }`}>
                                {getLessonIcon(lesson.contentType)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <h4 className={`font-medium ${selectedLesson?._id === lesson._id
                                      ? "text-blue-700"
                                      : "text-gray-700"
                                    }`}>
                                    {lesson.title}
                                  </h4>
                                  <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded-full">
                                    {lesson.contentType}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {lesson.durationSec ? `${lesson.durationSec} min` : "N/A"}
                                  </span>
                                </div>
                              </div>
                            </motion.button>
                          ))
                        ) : selectedUnit?._id === unit._id ? (
                          <div className="p-4 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <FileText className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                            <p className="text-sm text-gray-500 mb-3">No lessons in this unit</p>
                            <button
                              onClick={() => {
                                setSelectedUnit(unit);
                                setEditingLesson(null);
                                setShowModal(true);
                              }}
                              className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium flex items-center justify-center gap-1"
                            >
                              <PlusCircle className="w-4 h-4" />
                              Add First Lesson
                            </button>
                          </div>
                        ) : null}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Lesson Preview - 7 columns */}
        <div className="lg:col-span-7">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-emerald-100 shadow-[var(--shadow-medium)] overflow-hidden h-full">
            <div className="p-6 border-b border-emerald-50">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[var(--color-text)] flex items-center gap-2">
                  {selectedLesson ? (
                    <>
                      <PlayCircle className="w-5 h-5 text-blue-500" />
                      {selectedLesson.title}
                    </>
                  ) : (
                    <>
                      <Eye className="w-5 h-5 text-gray-400" />
                      Lesson Preview
                    </>
                  )}
                </h2>
                {selectedLesson && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingLesson(selectedLesson);
                        setShowModal(true);
                      }}
                      className="group px-4 py-2 bg-gradient-to-r from-[var(--color-primary)] to-emerald-500 hover:from-[var(--color-primary-hover)] hover:to-emerald-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-2 hover:scale-105"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Lesson
                    </button>
                  </div>
                )}
              </div>
              {selectedLesson && (
                <p className="text-sm text-[var(--color-text)]/70 mt-1">
                  Preview and manage your lesson content
                </p>
              )}
            </div>

            <div className="p-6 overflow-y-auto h-[calc(100vh-350px)]">
              {selectedLesson ? (
                <div className="space-y-6">
                  {/* Lesson Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                      <p className="text-xs text-[var(--color-text)]/70 mb-1">Lesson Type</p>
                      <p className="font-medium text-[var(--color-text)] flex items-center gap-2">
                        {getLessonIcon(selectedLesson.contentType)}
                        <span className="capitalize">{selectedLesson.contentType}</span>
                      </p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <p className="text-xs text-[var(--color-text)]/70 mb-1">Duration</p>
                      <p className="font-medium text-[var(--color-text)] flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[var(--color-primary)]" />
                        {selectedLesson.durationSec ? `${selectedLesson.durationSec} min` : "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Content Preview */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[var(--color-text)]">Content Preview</h3>
                    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg bg-gray-900">
                      {selectedLesson.contentType === "video" ? (
                        <div className="relative aspect-video bg-gray-900">
                          <video
                            src={selectedLesson.contentUrl}
                            controls
                            className="w-full h-full object-contain"
                            preload="metadata"
                          />
                        </div>
                      ) : selectedLesson.contentType === "pdf" ? (
                        <div className="aspect-video bg-white">
                          <iframe
                            src={selectedLesson.contentUrl}
                            className="w-full h-full"
                            title="PDF Preview"
                          />
                        </div>
                      ) : (
                        <div className="aspect-video bg-white p-8">
                          <div className="h-full flex flex-col items-center justify-center text-center">
                            <FileText className="w-12 h-12 text-gray-300 mb-4" />
                            <h4 className="text-lg font-medium text-gray-700 mb-2">{selectedLesson.title}</h4>
                            <p className="text-gray-500">Interactive content preview</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  {selectedLesson.description && (
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                      <h4 className="font-medium text-[var(--color-text)] mb-2">Description</h4>
                      <p className="text-gray-700">{selectedLesson.description}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                    <button className="px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg font-medium transition-colors ml-auto">
                      Delete Lesson
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="p-6 bg-emerald-50 rounded-2xl mb-6">
                    <PlayCircle className="w-12 h-12 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-medium text-[var(--color-text)] mb-2">Select a Lesson</h3>
                  <p className="text-[var(--color-text)]/70 mb-6 max-w-md">
                    Choose a lesson from the left panel to preview its content, or create a new lesson to get started.
                  </p>
                  <button
                    onClick={() => {
                      setEditingLesson(null);
                      setShowModal(true);
                    }}
                    className="group bg-gradient-to-r from-[var(--color-primary)] to-emerald-500 hover:from-[var(--color-primary-hover)] hover:to-emerald-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2 hover:scale-105"
                  >
                    <PlusCircle className="w-5 h-5" />
                    Create Your First Lesson
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
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