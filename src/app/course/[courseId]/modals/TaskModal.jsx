"use client";
import api from "@/lib/apiClient";
import { on } from "events";
import { motion } from "framer-motion";
import { X, UploadCloud } from "lucide-react";
import { useState } from "react";

export default function TaskModal({ task, onClose }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a file before submitting.");
      return;
    }
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    const fileUploadRes = await api.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const url = fileUploadRes.data?.data?.url;
    
    const payload = {
      artifactUrl: url,
    };
    const taskSubmitRes = await api.post(`/submissions/${task._id}/create`, payload);
    console.log("Task submission response:", taskSubmitRes);
    setUploading(true);
    onClose();
    return  
  };

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString() : "—";

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold mb-1 text-[var(--color-text)]">
          {task?.title}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          {task?.description || "Please complete and submit this task."}
        </p>

        {/* Task Meta Info */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 text-sm text-gray-700">
          <div>
            <p className="font-medium text-gray-600">Assigned Date:</p>
            <p>{formatDate(task?.createdAt)}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Due Date:</p>
            <p className="text-red-500 font-medium">{formatDate(task?.dueDate)}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Marks:</p>
            <p>{task?.maxPoints ?? 0}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Submission Type:</p>
            <p className="capitalize">{task?.type || "file"}</p>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center transition hover:border-[var(--color-primary)] hover:bg-gray-50">
          {!file ? (
            <>
              <UploadCloud
                size={48}
                className="mx-auto mb-2 text-[var(--color-primary)] opacity-80"
              />
              <p className="text-gray-700 font-medium mb-1">
                Upload your submission
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Supported formats: PDF, DOCX, JPG, PNG, ZIP (max 25MB)
              </p>
              <label className="cursor-pointer inline-block px-5 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition">
                Choose File
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </>
          ) : (
            <div className="text-center">
              <p className="text-gray-700 font-medium mb-1">Selected File:</p>
              <p className="text-sm text-gray-600 mb-4">{file.name}</p>
              <button
                onClick={() => setFile(null)}
                className="text-xs text-red-500 hover:underline"
              >
                Remove File
              </button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={uploading}
            className="px-6 py-2.5 rounded-lg text-white font-medium shadow-md transition disabled:opacity-70"
            style={{ background: "var(--color-primary)" }}
          >
            {uploading ? "Uploading..." : "Submit Task"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
