"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Edit, ClipboardList } from "lucide-react";
import { useTasks } from "@/hooks/useTask";
import TaskFormModal from "./TaskFormModal";

export default function TaskManager({ unitId }) {
  const { data: tasks = [], isLoading } = useTasks(unitId);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-[1fr_1.5fr] gap-6">
      {/* Left: Task list */}
      <div className="bg-white p-5 rounded-[var(--radius-card)] shadow-[var(--shadow-medium)]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-[var(--color-secondary)] flex items-center gap-2">
            <ClipboardList size={18} /> Tasks
          </h2>
          <button
            onClick={() => {
              setSelectedTask(null);
              setShowModal(true);
            }}
            className="flex items-center gap-1 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-semibold text-sm"
          >
            <PlusCircle size={16} /> Add
          </button>
        </div>

        {isLoading ? (
          <p className="text-sm text-gray-500">Loading tasks...</p>
        ) : tasks.length ? (
          <div className="space-y-2">
            {tasks.map((t) => (
              <button
                key={t._id}
                onClick={() => setSelectedTask(t)}
                className={`block w-full text-left px-4 py-2 rounded-[var(--radius-default)] ${
                  selectedTask?._id === t._id
                    ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                {t.title}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm italic">No tasks yet.</p>
        )}
      </div>

      {/* Right: Task preview */}
      <div className="bg-white p-5 rounded-[var(--radius-card)] shadow-[var(--shadow-medium)]">
        {selectedTask ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[var(--color-text)]">
                {selectedTask.title}
              </h2>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-1 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
              >
                <Edit size={16} /> Edit
              </button>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Due:</strong>{" "}
              {selectedTask.dueDate
                ? new Date(selectedTask.dueDate).toLocaleDateString()
                : "No deadline"}
            </p>
            <div className="text-gray-700 whitespace-pre-line">
              {selectedTask.description}
            </div>
            {selectedTask.attachment && (
              <a
                href={selectedTask.attachment}
                target="_blank"
                className="inline-block mt-4 text-[var(--color-secondary)] hover:underline"
              >
                📎 View Attachment
              </a>
            )}
          </>
        ) : (
          <p className="text-gray-500 italic text-center py-20">
            Select a task to preview or click “Add Task”.
          </p>
        )}
      </div>

      <TaskFormModal
        open={showModal}
        onClose={() => setShowModal(false)}
        unitId={unitId}
        task={selectedTask}
      />
    </div>
  );
}
