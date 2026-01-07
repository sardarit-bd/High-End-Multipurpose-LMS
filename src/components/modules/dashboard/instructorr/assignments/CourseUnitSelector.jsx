import { ChevronRight, BookOpen, FolderOpen } from "lucide-react";

export default function CourseUnitSelector({
  courses,
  units,
  selectedCourse,
  selectedUnit,
  onCourseChange,
  onUnitChange
}) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 border border-emerald-100 shadow-[var(--shadow-medium)] mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] mb-3">
            <div className="p-1.5 bg-emerald-100 rounded-lg">
              <BookOpen className="w-4 h-4 text-[var(--color-primary)]" />
            </div>
            Select Course
          </label>
          <select
            value={selectedCourse}
            onChange={onCourseChange}
            className="w-full p-3 border border-emerald-200 rounded-xl bg-emerald-50/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all appearance-none cursor-pointer text-[var(--color-text)]"
          >
            <option value="">-- Select a Course --</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id} className="py-2">
                {c.title}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-2">
            {courses.find(c => c._id === selectedCourse)?.description || "Select a course to view its units"}
          </p>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] mb-3">
            <div className="p-1.5 bg-blue-100 rounded-lg">
              <FolderOpen className="w-4 h-4 text-blue-600" />
            </div>
            Select Unit
          </label>
          <select
            value={selectedUnit}
            onChange={onUnitChange}
            className="w-full p-3 border border-blue-200 rounded-xl bg-blue-50/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer text-[var(--color-text)]"
            disabled={!selectedCourse}
          >
            <option value="">-- Select a Unit --</option>
            {units.map((u) => (
              <option key={u._id} value={u._id} className="py-2">
                {u.title}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-2">
            {units.find(u => u._id === selectedUnit)?.description || units.length > 0 ? "Select a unit to manage its tasks" : "No units available for this course"}
          </p>
        </div>
      </div>

      {/* Course/Unit Info */}
      {(selectedCourse || selectedUnit) && (
        <div className="mt-6 pt-6 border-t border-emerald-100">
          <div className="flex items-center gap-4">
            {selectedCourse && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">
                  {courses.find(c => c._id === selectedCourse)?.title}
                </span>
              </div>
            )}
            {selectedUnit && (
              <>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">
                    {units.find(u => u._id === selectedUnit)?.title}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}