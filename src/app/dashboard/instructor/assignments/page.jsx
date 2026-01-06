"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, Upload, X } from "lucide-react";
import api from "@/lib/apiClient";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";

export default function TaskManagerPage() {
  const {user} = useAuth()
  const [courses, setCourses] = useState([]);
  const [units, setUnits] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // === Fetch all courses ===
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/courses?instructor=${user._id}`);
        setCourses(res.data?.data || []);
      } catch {
        toast.error("Failed to load courses");
      }
    })();
  }, []);

  // === Fetch units for selected course ===
  useEffect(() => {
    if (!selectedCourse) return;
    (async () => {
      try {
        const res = await api.get(`/units/${selectedCourse}`);
        setUnits(res.data?.data || []);
      } catch {
        toast.error("Failed to load units");
      }
    })();
  }, [selectedCourse]);

  // === Fetch tasks for selected unit ===
  const fetchTasks = async (unitId) => {
    if (!unitId) return;
    setLoading(true);
    try {
      const res = await api.get(`/tasks/${unitId}`);
      console.log(res)
      setTasks(res.data?.data || []);
    } catch {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  // === Delete task ===
  const deleteTask = async (id) => {
    if (!confirm("Delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      toast.success("Task deleted");
      fetchTasks(selectedUnit);
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-[var(--color-secondary)]">
          Manage Tasks
        </h1>
        <button
          disabled={!selectedUnit}
          onClick={() => {
            setSelectedTask(null);
            setShowModal(true);
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-[var(--radius-default)] text-white shadow-sm transition ${selectedUnit
              ? "bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]"
              : "bg-gray-300 cursor-not-allowed"
            }`}
        >
          <Plus size={16} /> Add Task
        </button>
      </div>

      {/* Course & Unit Select */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
            Select Course
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => {
              setSelectedCourse(e.target.value);
              setSelectedUnit("");
              setUnits([]);
              setTasks([]);
            }}
            className="w-full px-3 py-2 bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-[var(--radius-default)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
          >
            <option value="">-- Select Course --</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
            Select Unit
          </label>
          <select
            value={selectedUnit}
            onChange={(e) => {
              setSelectedUnit(e.target.value);
              fetchTasks(e.target.value);
            }}
            className="w-full px-3 py-2 bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-[var(--radius-default)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
          >
            <option value="">-- Select Unit --</option>
            {units.map((u) => (
              <option key={u._id} value={u._id}>
                {u.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[var(--radius-card)] shadow-[var(--shadow-medium)] overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-sm text-gray-500 border-b">
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4 text-center">Max Points</th>
              <th className="py-3 px-4 text-center">Per Correct Point</th>
              <th className="py-3 px-4 text-center">Created</th>
              <th className="py-3 px-4 text-center">Due Date</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="py-6 text-center text-gray-500 italic">
                  Loading tasks...
                </td>
              </tr>
            ) : tasks.length ? (
              tasks.map((t) => (
                <tr
                  key={t._id}
                  className="border-t hover:bg-[var(--color-background)] transition"
                >
                  {/* ===== Title + Description ===== */}
                  <td className="py-4 px-4 font-medium text-[var(--color-text)]">
                    {t.title || <span className="text-gray-400 italic">Untitled</span>}
                    {t.description && (
                      <div className="text-xs text-gray-500">{t.description}</div>
                    )}
                  </td>

                  {/* ===== Type ===== */}
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${t.type === "quiz"
                          ? "bg-blue-100 text-blue-700"
                          : t.type === "video"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {t.type ? t.type.charAt(0).toUpperCase() + t.type.slice(1) : "N/A"}
                    </span>
                  </td>

                  {/* ===== Max Points ===== */}
                  <td className="py-4 px-4 text-center text-[var(--color-text)]">
                    {t.maxPoints ?? "—"}
                  </td>

                  {/* ===== Per Correct Point ===== */}
                  <td className="py-4 px-4 text-center text-[var(--color-text)]">
                    {t.perCorrectPoint ?? "—"}
                  </td>

                  {/* ===== Created At ===== */}
                  <td className="py-4 px-4 text-center text-gray-500 text-sm">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </td>

                  <td className="py-4 px-4 text-center text-gray-500 text-sm">
                    {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "-"}
                  </td>

                  {/* ===== Actions ===== */}
                  <td className="py-4 px-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setSelectedTask(t);
                        setShowModal(true);
                      }}
                      className="p-1 text-[var(--color-primary)] hover:bg-gray-100 rounded"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => deleteTask(t._id)}
                      className="p-1 text-red-500 hover:bg-gray-100 rounded"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-6 text-center text-gray-400 italic">
                  No tasks found for this unit.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      <AddEditTaskModal
        open={showModal}
        onClose={() => setShowModal(false)}
        unitId={selectedUnit}
        task={selectedTask}
        refresh={() => fetchTasks(selectedUnit)}
      />
    </div>
  );
}

/* =====================================
   Add / Edit Task Modal
===================================== */
function AddEditTaskModal({ open, onClose, unitId, task, refresh }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    maxPoints: "",
    perCorrectPoint: "",
    type: "",
  });

  useEffect(() => {
    if (task) setForm(task);
    else
      setForm({
        title: "",
        description: "",
        dueDate: "",
        maxPoints: "",
        perCorrectPoint: "",
        type: "",
      });
  }, [task]);

  if (!open) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: form.title,
        description: form.description,
        dueDate: form.dueDate,
        maxPoints: parseInt(form.maxPoints || 0),
        perCorrectPoint: parseInt(form.perCorrectPoint || 0),
        type: form.type,
        unitId,
      };

      console.log(payload)
      if (task?._id) await api.put(`/tasks/${task._id}`, payload);
      else await api.post("/tasks/create", payload);

      toast.success("Task saved!");
      onClose();
      refresh();
    } catch (err) {
      toast.error("Failed to save task");
    }
  };

  return (
    <AnimatePresence>
  {open && (
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
        transition={{ duration: 0.25 }}
        className="bg-white rounded-[var(--radius-card)] shadow-[var(--shadow-medium)] w-full max-w-lg p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[var(--color-secondary)]">
            {task ? "Edit Task" : "Add Task"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-[var(--color-text)]">
          {/* Title */}
          <div>
            <label className="text-sm font-semibold">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter title"
              className="w-full border border-gray-300 rounded-[var(--radius-default)] px-3 py-2 mt-1"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-semibold">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Enter description"
              className="w-full border border-gray-300 rounded-[var(--radius-default)] px-3 py-2 mt-1"
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="text-sm font-semibold">Deadline</label>
            <input
              name="dueDate"
              type="date"
              value={form.dueDate?.split("T")[0] || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-[var(--radius-default)] px-3 py-2 mt-1"
            />
          </div>

          {/* Max Point */}
          <div>
            <label className="text-sm font-semibold">Max Points</label>
            <input
              name="maxPoints"
              type="number"
              min="0"
              value={form.maxPoints}
              onChange={handleChange}
              placeholder="e.g. 100"
              className="w-full border border-gray-300 rounded-[var(--radius-default)] px-3 py-2 mt-1"
            />
          </div>

          {/* Assignment Type */}
          <div>
            <label className="text-sm font-semibold">Assignment Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-[var(--radius-default)] px-3 py-2 mt-1"
            >
              <option value="">Select type</option>
              <option value="quiz">Quiz</option>
              <option value="video">Video</option>
              <option value="pdf">PDF</option>
            </select>
          </div>

          {/* Point per Question (only for quiz) */}
          {form.type === "quiz" && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <label className="text-sm font-semibold">Point Per Question</label>
              <input
                name="perCorrectPoint"
                type="number"
                min="0"
                value={form.perCorrectPoint || ""}
                onChange={handleChange}
                placeholder="e.g. 5"
                className="w-full border border-gray-300 rounded-[var(--radius-default)] px-3 py-2 mt-1"
              />
            </motion.div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-[var(--radius-default)] font-semibold"
          >
            Save Task
          </button>
        </form>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

  );
}

