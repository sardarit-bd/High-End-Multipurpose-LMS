"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit2, GripVertical } from "lucide-react";
import { toast } from "react-toastify";
import api from "@/lib/apiClient";
import { useAddUnit, useUnits } from "@/hooks/useUnit";
import { useState } from "react";

export default function UnitManager({ courseId }) {
  const { register, handleSubmit, reset, setValue } = useForm();
  const { data: units = [], isLoading, refetch } = useUnits(courseId);
  const addUnit = useAddUnit(courseId);
  const [editingUnit, setEditingUnit] = useState(null);
  const [draggedUnit, setDraggedUnit] = useState(null);

  const onSubmit = (data) => {
    if (editingUnit) {
      // Update existing unit
      updateUnit(editingUnit._id, data.title);
    } else {
      // Add new unit
      const payload = {
        ...data,
        course: courseId,
        orderIndex: units.length + 1,
      };
      addUnit.mutate(payload);
      reset();
    }
  };

  const startEdit = (unit) => {
    setEditingUnit(unit);
    setValue("title", unit.title);
  };

  const cancelEdit = () => {
    setEditingUnit(null);
    reset();
  };

  const updateUnit = async (unitId, newTitle) => {
    try {
      await api.put(`/units/${unitId}`, { title: newTitle });
      toast.success("Unit updated");
      setEditingUnit(null);
      reset();
      refetch();
    } catch {
      toast.error("Failed to update unit");
    }
  };

  const deleteUnit = async (id) => {
    if (!confirm("Delete this unit?")) return;
    try {
      await api.delete(`/units/${id}`);
      toast.success("Unit deleted");
      refetch();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleDragStart = (e, unit) => {
    setDraggedUnit(unit);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e, targetUnit) => {
    e.preventDefault();
    if (!draggedUnit || draggedUnit._id === targetUnit._id) return;

    const draggedIndex = units.findIndex(u => u._id === draggedUnit._id);
    const targetIndex = units.findIndex(u => u._id === targetUnit._id);

    if (draggedIndex === targetIndex) return;

    // Reorder units locally
    const newUnits = [...units];
    newUnits.splice(draggedIndex, 1);
    newUnits.splice(targetIndex, 0, draggedUnit);

    // Update order indices in database
    try {
      const updatePromises = newUnits.map((unit, index) =>
        api.put(`/units/${unit._id}`, { orderIndex: index + 1 })
      );
      await Promise.all(updatePromises);
      toast.success("Unit order updated");
      refetch();
    } catch {
      toast.error("Failed to update order");
    }

    setDraggedUnit(null);
  };

  const handleDragEnd = () => {
    setDraggedUnit(null);
  };

  return (
    <div className="mx-auto bg-white/95 backdrop-blur-sm p-8 rounded-[var(--radius-card)] shadow-[var(--shadow-medium)] text-[var(--color-text)]">
      {/* Header */}
      <h2 className="text-2xl font-bold text-[var(--color-secondary)] mb-6 border-b border-gray-200 pb-3">
        Course Units
      </h2>

      {/* Add/Edit Unit Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col sm:flex-row gap-3 mb-8"
      >
        <input
          {...register("title", { required: true })}
          placeholder={editingUnit ? "Edit unit title" : "Enter new unit title"}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-[var(--radius-default)] text-[var(--color-text)] placeholder-gray-400 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={addUnit.isLoading}
            className="flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-5 py-2.5 rounded-[var(--radius-default)] font-medium shadow-[var(--shadow-soft)] transition-all active:scale-[0.98]"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">{editingUnit ? "Update" : "Add"}</span>
          </button>
          {editingUnit && (
            <button
              type="button"
              onClick={cancelEdit}
              className="flex items-center justify-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2.5 rounded-[var(--radius-default)] font-medium shadow-[var(--shadow-soft)] transition-all active:scale-[0.98]"
            >
              <span className="hidden sm:inline">Cancel</span>
            </button>
          )}
        </div>
      </form>

      {/* Units List */}
      {isLoading ? (
        <p className="text-gray-500 text-sm">Loading units...</p>
      ) : units.length ? (
        <>
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
            <GripVertical size={14} />
            <span>Drag units to reorder them</span>
          </div>
          <div className="space-y-3">
            {units.map((u, i) => (
              <motion.div
                key={u._id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                draggable
                onDragStart={(e) => handleDragStart(e, u)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, u)}
                onDragEnd={handleDragEnd}
                className={`flex justify-between items-center bg-[var(--color-background)] px-5 py-3.5 rounded-[var(--radius-default)] border border-gray-200 hover:shadow-[var(--shadow-soft)] transition cursor-move ${
                  draggedUnit?._id === u._id ? 'opacity-50' : ''
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing">
                    <GripVertical size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[var(--color-text)] tracking-tight">
                      {u.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Order #{u.orderIndex}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startEdit(u)}
                    className="text-blue-500 hover:text-blue-600 transition"
                    title="Edit unit"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => deleteUnit(u._id)}
                    className="text-rose-500 hover:text-rose-600 transition"
                    title="Delete unit"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-sm italic text-center py-6">
          No units yet. Add one to get started.
        </p>
      )}
    </div>
  );
}
