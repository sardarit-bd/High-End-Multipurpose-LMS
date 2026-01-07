"use client";
import React from "react";
import { BookOpen, FolderOpen, ChevronDown } from "lucide-react";

const QuizFilters = ({
  courses,
  units,
  selectedCourse,
  selectedUnit,
  onCourseChange,
  onUnitChange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Course Selector */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] mb-3">
          <div className="p-1.5 bg-emerald-100 rounded-lg">
            <BookOpen className="w-4 h-4 text-[var(--color-primary)]" />
          </div>
          Select Course
        </label>
        <div className="relative">
          <select
            className="w-full p-3 border border-emerald-200 rounded-xl bg-emerald-50/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all appearance-none cursor-pointer text-[var(--color-text)] pl-4 pr-10"
            value={selectedCourse}
            onChange={(e) => onCourseChange(e.target.value)}
          >
            <option value="" className="text-gray-400">Choose a course</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id} className="py-2">
                {c.title}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 pointer-events-none" size={18} />
        </div>
        {selectedCourse && (
          <p className="text-xs text-gray-500 mt-2 line-clamp-1">
            {courses.find(c => c._id === selectedCourse)?.description || "Selected course"}
          </p>
        )}
      </div>

      {/* Unit Selector */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] mb-3">
          <div className="p-1.5 bg-blue-100 rounded-lg">
            <FolderOpen className="w-4 h-4 text-blue-600" />
          </div>
          Select Unit
        </label>
        <div className="relative">
          <select
            className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all appearance-none cursor-pointer text-[var(--color-text)] pl-4 pr-10 ${selectedCourse
                ? "border-blue-200 bg-blue-50/30 focus:ring-blue-500"
                : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
              }`}
            value={selectedUnit}
            onChange={(e) => onUnitChange(e.target.value)}
            disabled={!selectedCourse}
          >
            <option value="" className="text-gray-400">
              {selectedCourse ? "Choose a unit" : "Select a course first"}
            </option>
            {units.map((u) => (
              <option key={u._id} value={u._id} className="py-2">
                {u.title}
              </option>
            ))}
          </select>
          <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${selectedCourse ? "text-blue-400" : "text-gray-300"}`} size={18} />
        </div>
        {selectedUnit && (
          <p className="text-xs text-gray-500 mt-2 line-clamp-1">
            {units.find(u => u._id === selectedUnit)?.description || `Unit from ${courses.find(c => c._id === selectedCourse)?.title}`}
          </p>
        )}
      </div>
    </div>
  );
};

export default QuizFilters;