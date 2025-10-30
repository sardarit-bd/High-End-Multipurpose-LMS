"use client";

import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Save, X } from "lucide-react";
import { useSaveLesson } from "@/hooks/useLessons";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import api from "@/lib/apiClient";

export default function LessonFormModal({ open, onClose, unitId, units = [], lesson }) {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [fileUrl, setFileUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const saveLesson = useSaveLesson(unitId);

  // Initialize / Reset form
  useEffect(() => {
    if (lesson) {
      reset(lesson);
      setFileUrl(lesson.contentUrl);
    } else {
      reset({ title: "", durationSec: "", contentType: "video", unit: unitId });
      setFileUrl(null);
    }
  }, [lesson, unitId, reset]);

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
      setValue("contentUrl", url);
      toast.success("File uploaded successfully!");
    } catch {
      toast.error("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = (data) => {
    if (!fileUrl) return toast.warn("Please upload a file first!");
    const payload = {
      ...data,
      contentUrl: fileUrl,
      durationSec: parseInt(data.durationSec || "0"),
    };
    if (lesson?._id) payload._id = lesson._id;
    saveLesson.mutate(payload);
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
            className="bg-white w-full max-w-lg rounded-[var(--radius-card)] shadow-[var(--shadow-medium)] p-6 relative"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[var(--color-secondary)]">
                {lesson ? "Edit Lesson" : "Add New Lesson"}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X size={22} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-[var(--color-text)]">
              
              {/* Unit Select */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Select Unit
                </label>
                <select
                  {...register("unit", { required: true })}
                  className="w-full border border-gray-300 rounded-[var(--radius-default)] px-3 py-2 focus:border-[var(--color-primary)] outline-none"
                  defaultValue={unitId}
                >
                  {units.map((u) => (
                    <option key={u._id} value={u._id}>
                      {u.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Lesson title */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Lesson Title
                </label>
                <input
                  {...register("title", { required: true })}
                  placeholder="Enter lesson title"
                  className="w-full border border-gray-300 rounded-[var(--radius-default)] px-3 py-2 focus:border-[var(--color-primary)] outline-none"
                />
              </div>

              {/* Duration + Type */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Duration (sec)
                  </label>
                  <input
                    {...register("durationSec")}
                    type="number"
                    placeholder="0"
                    className="w-full border border-gray-300 rounded-[var(--radius-default)] px-3 py-2 focus:border-[var(--color-primary)] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Content Type
                  </label>
                  <select
                    {...register("contentType")}
                    className="w-full border border-gray-300 rounded-[var(--radius-default)] px-3 py-2 focus:border-[var(--color-primary)] outline-none"
                  >
                    <option value="video">Video</option>
                    <option value="pdf">PDF</option>
                    <option value="audio">Audio</option>
                  </select>
                </div>
              </div>

              {/* Upload / Preview */}
              {fileUrl ? (
                <div className="relative border rounded-[var(--radius-default)] overflow-hidden">
                  {fileUrl.endsWith(".mp4") ? (
                    <video src={fileUrl} controls className="w-full h-60 object-cover" />
                  ) : fileUrl.endsWith(".pdf") ? (
                    <iframe src={fileUrl} className="w-full h-60" />
                  ) : (
                    <iframe src={fileUrl} className="w-full h-60 bg-gray-50" />
                  )}
                  <button
                    type="button"
                    onClick={() => setFileUrl(null)}
                    className="absolute top-2 right-2 bg-white/90 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-semibold px-2 py-1 rounded text-xs transition"
                  >
                    Replace
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="upload"
                  className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-[var(--color-primary)] rounded-[var(--radius-default)] cursor-pointer hover:bg-[var(--color-background)] transition"
                >
                  <Upload className="text-[var(--color-primary)] mb-2" size={28} />
                  <span className="text-sm text-gray-600">
                    {uploading ? "Uploading..." : "Click to upload file"}
                  </span>
                  <input
                    id="upload"
                    type="file"
                    onChange={handleUpload}
                    className="hidden"
                  />
                </label>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={saveLesson.isLoading}
                className="flex items-center justify-center gap-2 w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white py-3 rounded-[var(--radius-default)] font-semibold transition"
              >
                <Save size={18} />
                {saveLesson.isLoading ? "Saving..." : "Save Lesson"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
