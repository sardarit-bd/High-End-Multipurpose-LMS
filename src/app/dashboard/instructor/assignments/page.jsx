"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Trash2, Plus, ChevronDown } from "lucide-react";

// ===== Sample Static Data =====
const assignmentsData = [
  {
    id: 1,
    title: "Building Your First Landing Page",
    course: "Sketch from A to Z (2024): Become an app designer",
    totalMarks: 80,
    totalSubmit: 2,
    status: "Published",
  },
  {
    id: 2,
    title: "Building a Basic Angular Application",
    course: "Learn Angular Fundamentals Beginners Guide",
    totalMarks: 60,
    totalSubmit: 4,
    status: "Draft",
  },
  {
    id: 3,
    title: "Basic Arithmetic Operations",
    course: "Learn JavaScript and Express to become an Expert",
    totalMarks: 30,
    totalSubmit: 3,
    status: "Published",
  },
  {
    id: 4,
    title: "Basic Calculations",
    course: "Introduction to Programming - Python & Java",
    totalMarks: 50,
    totalSubmit: 5,
    status: "Published",
  },
];

// ===== Status Pill Component =====
function StatusPill({ status }) {
  const color =
    status === "Published"
      ? "bg-[var(--color-primary)]"
      : "bg-[var(--color-secondary)]";
  return (
    <span
      className={`text-white text-xs px-3 py-1 rounded-full ${color}`}
    >
      {status}
    </span>
  );
}

// ===== Modal Component =====
function AddAssignmentModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    course: "",
    title: "",
    description: "",
    instructions: "",
    lastDate: "",
    status: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Assignment submitted:", formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-white rounded-[var(--radius-card)] shadow-[var(--shadow-medium)] w-full max-w-2xl p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[var(--color-text)]">
                Add New Assignments
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-[var(--color-primary)]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Course */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Course <span className="text-red-500">*</span>
                </label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mt-1 text-sm focus:ring-2 focus:ring-[var(--color-primary)] outline-none  bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                >
                  <option value="">Select</option>
                  <option value="React Basics">React Basics</option>
                  <option value="JavaScript Advanced">
                    JavaScript Advanced
                  </option>
                  <option value="UI/UX Design">UI/UX Design</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Assignment Title <span className="text-red-500">*</span>
                </label>
                <input
                  name="title"
                  type="text"
                  placeholder="Enter title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mt-1 text-sm focus:ring-2 focus:ring-[var(--color-primary)] outline-none  bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Enter description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mt-1 text-sm focus:ring-2 focus:ring-[var(--color-primary)] outline-none  bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              {/* Instructions */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Instructions <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="instructions"
                  placeholder="Enter instructions"
                  rows={3}
                  value={formData.instructions}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mt-1 text-sm focus:ring-2 focus:ring-[var(--color-primary)] outline-none  bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              {/* Last Date & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Last Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="lastDate"
                    type="date"
                    value={formData.lastDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 text-sm focus:ring-2 focus:ring-[var(--color-primary)] outline-none  bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 text-sm focus:ring-2 focus:ring-[var(--color-primary)] outline-none  bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                  >
                    <option value="">Select</option>
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-md text-sm hover:bg-[var(--color-primary-hover)]"
                >
                  Submit
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ===== Main Page =====
export default function InstructorAssignments() {
  const [assignments, setAssignments] = useState(assignmentsData);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        <h1 className="text-lg font-semibold text-[var(--color-text)]">
          Assignments
        </h1>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-[var(--radius-default)] shadow-sm hover:bg-[var(--color-primary-hover)] transition"
        >
          <Plus size={16} /> Add Assignment
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[var(--radius-card)] shadow-sm overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-sm text-gray-500 border-b">
              <th className="py-3 px-4">Assignment Name</th>
              <th className="py-3 px-4">Total Marks</th>
              <th className="py-3 px-4">Total Submit</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr key={a.id} className="border-t hover:bg-gray-50 transition">
                <td className="py-4 px-4">
                  <div className="font-medium text-[var(--color-text)]">
                    {a.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Course: {a.course}
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-500">{a.totalMarks}</td>
                <td className="py-4 px-4 text-gray-500">{a.totalSubmit}</td>
                <td className="py-4 px-4">
                  <StatusPill status={a.status} />
                </td>
                <td className="py-4 px-4 text-right space-x-2">
                  <button className="p-1 text-[var(--color-primary)] hover:bg-gray-100 rounded">
                    <Edit size={16} />
                  </button>
                  <button className="p-1 text-red-500 hover:bg-gray-100 rounded">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <AddAssignmentModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
