"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import api from "@/lib/apiClient";
import { useAddUnit, useUnits } from "@/hooks/useUnit";

export default function UnitManager({ courseId }) {
  const { register, handleSubmit, reset } = useForm();
  const { data: units = [], isLoading } = useUnits(courseId);
  const addUnit = useAddUnit(courseId);

  const onSubmit = (data) => {
    const payload = {
      ...data,
      course: courseId,
      orderIndex: units.length + 1,
    };
    addUnit.mutate(payload);
    reset();
  };

  const deleteUnit = async (id) => {
    if (!confirm("Delete this unit?")) return;
    try {
      await api.delete(`/units/${id}`);
      toast.success("Unit deleted");
      window.location.reload();
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="mx-auto bg-white/95 backdrop-blur-sm p-8 rounded-[var(--radius-card)] shadow-[var(--shadow-medium)] text-[var(--color-text)]">
      {/* Header */}
      <h2 className="text-2xl font-bold text-[var(--color-secondary)] mb-6 border-b border-gray-200 pb-3">
        Course Units
      </h2>

      {/* Add Unit Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col sm:flex-row gap-3 mb-8"
      >
        <input
          {...register("title", { required: true })}
          placeholder="Enter new unit title"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-[var(--radius-default)] text-[var(--color-text)] placeholder-gray-400 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition"
        />
        <button
          type="submit"
          disabled={addUnit.isLoading}
          className="flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-5 py-2.5 rounded-[var(--radius-default)] font-medium shadow-[var(--shadow-soft)] transition-all active:scale-[0.98]"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">Add</span>
        </button>
      </form>

      {/* Units List */}
      {isLoading ? (
        <p className="text-gray-500 text-sm">Loading units...</p>
      ) : units.length ? (
        <div className="space-y-3">
          {units.map((u, i) => (
            <motion.div
              key={u._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
              className="flex justify-between items-center bg-[var(--color-background)] px-5 py-3.5 rounded-[var(--radius-default)] border border-gray-200 hover:shadow-[var(--shadow-soft)] transition"
            >
              <div>
                <p className="font-semibold text-[var(--color-text)] tracking-tight">
                  {u.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Order #{u.orderIndex}
                </p>
              </div>
              <button
                onClick={() => deleteUnit(u._id)}
                className="text-rose-500 hover:text-rose-600 transition"
                title="Delete unit"
              >
                <Trash2 size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm italic text-center py-6">
          No units yet. Add one to get started.
        </p>
      )}
    </div>
  );
}
