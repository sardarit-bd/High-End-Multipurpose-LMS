import { Plus, Award } from "lucide-react";

export default function AssignmentsHeader({ selectedUnit, onCreateTask }) {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-special)] rounded-xl">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-[var(--color-secondary)]">
              Task Management
            </h3>
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text)]">
              Manage Assignments & Tasks
            </h1>
          </div>
        </div>
        <button
          disabled={!selectedUnit}
          onClick={onCreateTask}
          className={`group flex items-center gap-2 px-5 py-3 rounded-xl font-medium shadow-lg transition-all duration-300 ${selectedUnit
              ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-special)] hover:from-[var(--color-primary-hover)] hover:to-[var(--color-accent-special)] text-white hover:shadow-xl hover:scale-105"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          <Plus className="w-5 h-5" />
          Create New Task
        </button>
      </div>
    </div>
  );
}