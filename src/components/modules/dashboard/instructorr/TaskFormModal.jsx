"use client";

import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Save, X, Upload } from "lucide-react";
import { useSaveTask } from "@/hooks/useTask";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import api from "@/lib/apiClient";

export default function TaskFormModal({ open, onClose, unitId, task }) {
  const { register, handleSubmit, reset, setValue } = useForm();
  const saveTask = useSaveTask();
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    if (task) {
      reset(task);
      setFileUrl(task.attachment || null);
    } else {
      reset({ title: "", description: "", dueDate: "" });
      setFileUrl(null);
    }
  }, [task, reset]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);
    try {
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const url = res.data?.data?.url;
      setFileUrl(url);
      setValue("attachment", url);
      toast.success("File uploaded!");
    } catch {
      toast.error("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = (data) => {
    const payload = { ...data, unit: unitId, attachment: fileUrl };
    if (task?._id) payload._id = task._id;
    saveTask.mutate(payload);
    onClose();
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-[var(--radius-card)] w-full max-w-lg p-6 shadow-[var(--shadow-medium)]"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[var(--color-secondary)]">
                {task ? "Edit Task" : "Add Task"}
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-[var(--color-text)]">
              <input
                {...register("title", { required: true })}
                placeholder="Task title"
                className="w-full border border-gray-300 rounded-[var(--radius-default)] px-3 py-2"
              />

              <textarea
                {...register("description")}
                rows={4}
                placeholder="Task description"
                className="w-full border border-gray-300 rounded-[var(--radius-default)] px-3 py-2"
              />

              <input
                type="date"
                {...register("dueDate")}
                className="w-full border border-gray-300 rounded-[var(--radius-default)] px-3 py-2"
              />

              {fileUrl ? (
                <div className="relative border rounded-[var(--radius-default)] px-3 py-2 text-sm text-gray-700">
                  📎 {fileUrl.split("/").pop()}
                  <button
                    type="button"
                    onClick={() => setFileUrl(null)}
                    className="absolute top-2 right-2 text-rose-500 hover:text-rose-600 text-xs"
                  >
                    Replace
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="upload"
                  className="flex flex-col items-center justify-center h-28 border-2 border-dashed border-[var(--color-primary)] rounded-[var(--radius-default)] cursor-pointer hover:bg-[var(--color-background)] transition"
                >
                  <Upload className="text-[var(--color-primary)] mb-2" size={24} />
                  <span className="text-sm text-gray-600">
                    {uploading ? "Uploading..." : "Click to upload attachment"}
                  </span>
                  <input id="upload" type="file" onChange={handleUpload} className="hidden" />
                </label>
              )}

              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white py-3 rounded-[var(--radius-default)] font-semibold"
              >
                <Save size={18} /> Save Task
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
