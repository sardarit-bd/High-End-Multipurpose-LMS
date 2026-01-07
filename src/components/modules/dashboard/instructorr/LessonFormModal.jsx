"use client";

import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Save, X, FileVideo, FileText, Music, Clock, FolderOpen, Sparkles, Plus, File, CheckCircle } from "lucide-react";
import { useSaveLesson } from "@/hooks/useLessons";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import api from "@/lib/apiClient";

export default function LessonFormModal({ open, onClose, unitId, units = [], lesson }) {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [fileUrl, setFileUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const saveLesson = useSaveLesson(unitId);

  // Watch the content type to conditionally show duration
  const contentType = watch("contentType", lesson?.contentType || "video");

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

  const getContentTypeIcon = (type) => {
    switch (type) {
      case "video": return <FileVideo className="w-5 h-5 text-blue-500" />;
      case "pdf": return <FileText className="w-5 h-5 text-rose-500" />;
      case "audio": return <Music className="w-5 h-5 text-purple-500" />;
      default: return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  const getContentTypeOptions = () => [
    { value: "video", label: "Video Lesson", icon: <FileVideo className="w-4 h-4" /> },
    { value: "pdf", label: "PDF Document", icon: <FileText className="w-4 h-4" /> },
    { value: "audio", label: "Audio Lesson", icon: <Music className="w-4 h-4" /> },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.25, type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-white to-emerald-50/30 w-full container rounded-2xl shadow-2xl border border-emerald-100 relative overflow-hidden"
          >
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[var(--color-accent-special)]/10 to-transparent rounded-full -translate-x-12 translate-y-12"></div>

            {/* Header */}
            <div className="relative p-6 border-b border-emerald-100 bg-white/80 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-special)] rounded-xl">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--color-text)]">
                      {lesson ? "Edit Lesson" : "Create New Lesson"}
                    </h2>
                    <p className="text-sm text-[var(--color-text)]/70">
                      {lesson ? "Update your lesson content" : "Add a new lesson to your course"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="p-6 max-h-[70vh] bg-white overflow-y-auto">
              <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Form Fields */}
                <div className="space-y-6">
                  {/* Unit Selection */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] mb-3">
                      <div className="p-1.5 bg-emerald-100 rounded-lg">
                        <FolderOpen className="w-4 h-4 text-[var(--color-primary)]" />
                      </div>
                      Select Unit
                    </label>
                    <select
                      {...register("unit", { required: true })}
                      className="w-full p-3 border border-emerald-200 rounded-xl bg-emerald-50/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all appearance-none cursor-pointer text-[var(--color-text)]"
                      defaultValue={unitId}
                    >
                      {units.map((u) => (
                        <option key={u._id} value={u._id} className="py-2">
                          {u.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Lesson Title */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] mb-3">
                      <div className="p-1.5 bg-blue-100 rounded-lg">
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      Lesson Title
                    </label>
                    <input
                      {...register("title", { required: true })}
                      placeholder="Enter a descriptive lesson title"
                      className="w-full p-3 border border-blue-200 rounded-xl bg-blue-50/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-[var(--color-text)] placeholder-blue-400/50"
                    />
                  </div>

                  {/* Content Type and Duration */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Content Type */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] mb-3">
                        <div className="p-1.5 bg-purple-100 rounded-lg">
                          {getContentTypeIcon(contentType)}
                        </div>
                        Content Type
                      </label>
                      <div className="relative">
                        <select
                          {...register("contentType")}
                          className="w-full p-3 border border-purple-200 rounded-xl bg-purple-50/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none cursor-pointer text-[var(--color-text)]"
                        >
                          {getContentTypeOptions().map((option) => (
                            <option key={option.value} value={option.value} className="flex items-center gap-2 py-2">
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          {getContentTypeIcon(contentType)}
                        </div>
                      </div>
                    </div>

                    {/* Duration (always visible, dynamic label) */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] mb-3">
                        <div className="p-1.5 bg-amber-100 rounded-lg">
                          <Clock className="w-4 h-4 text-amber-600" />
                        </div>
                        {contentType === 'pdf' ? 'Read Time (minutes)' : 'Duration (minutes)'}
                      </label>
                      <div className="relative">
                        <input
                          {...register("durationSec")}
                          type="number"
                          placeholder={contentType === 'pdf' ? 'Estimated reading time in minutes' : 'Duration in minutes'}
                          className="w-full p-3 pl-10 border border-amber-200 rounded-xl bg-amber-50/30 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-[var(--color-text)]"
                        />
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400" size={18} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: File Upload */}
                <div className="space-y-6">
                  {/* File Upload / Preview */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] mb-3">
                      <div className="p-1.5 bg-cyan-100 rounded-lg">
                        <Upload className="w-4 h-4 text-cyan-600" />
                      </div>
                      Lesson Content
                    </label>

                    {fileUrl ? (
                      <div className="group relative rounded-xl overflow-hidden border-2 border-emerald-200 shadow-lg">
                        <div className="relative aspect-video bg-gray-900">
                          {contentType === "video" ? (
                            <video
                              src={fileUrl}
                              controls
                              className="w-full h-full object-contain"
                              preload="metadata"
                            />
                          ) : contentType === "pdf" ? (
                            <div className="w-full h-full bg-white flex items-center justify-center">
                              <FileText className="w-16 h-16 text-blue-400" />
                            </div>
                          ) : (
                            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                              <Music className="w-16 h-16 text-purple-400" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="absolute top-3 right-3 flex gap-2">
                          <button
                            type="button"
                            onClick={() => setFileUrl(null)}
                            className="px-3 py-2 bg-white/90 text-[var(--color-primary)] hover:bg-white rounded-lg font-medium text-sm shadow-lg transition-all hover:scale-105"
                          >
                            Change File
                          </button>
                          <button
                            type="button"
                            className="p-2 bg-white/90 text-green-600 hover:bg-white rounded-full shadow-lg transition-all hover:scale-105"
                            title="File uploaded successfully"
                          >
                            <CheckCircle size={18} />
                          </button>
                        </div>
                        <div className="absolute bottom-3 left-3 bg-white/90 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700">
                          {fileUrl.split('/').pop()}
                        </div>
                      </div>
                    ) : (
                      <label
                        htmlFor="upload"
                        className={`flex flex-col items-center justify-center aspect-video rounded-xl border-3 border-dashed cursor-pointer transition-all duration-300 ${uploading
                            ? 'border-emerald-300 bg-emerald-50'
                            : 'border-emerald-200 hover:border-[var(--color-primary)] hover:bg-emerald-50/50'
                          }`}
                      >
                        <div className={`p-4 rounded-full mb-4 transition-all duration-300 ${uploading
                            ? 'animate-pulse bg-emerald-100'
                            : 'bg-emerald-100 group-hover:bg-emerald-200 group-hover:scale-110'
                          }`}>
                          <Upload className={`w-8 h-8 transition-colors duration-300 ${uploading
                              ? 'text-[var(--color-primary)]'
                              : 'text-emerald-400 group-hover:text-[var(--color-primary)]'
                            }`} />
                        </div>
                        <span className={`text-lg font-medium mb-2 transition-colors duration-300 ${uploading
                            ? 'text-[var(--color-primary)]'
                            : 'text-gray-600 group-hover:text-[var(--color-primary)]'
                          }`}>
                          {uploading ? "Uploading..." : "Upload Lesson File"}
                        </span>
                        <span className="text-sm text-gray-500 text-center px-4">
                          Supports video, PDF, audio formats
                        </span>
                        <input
                          id="upload"
                          type="file"
                          onChange={handleUpload}
                          className="hidden"
                          accept={contentType === 'video' ? 'video/*' : contentType === 'pdf' ? '.pdf' : 'audio/*'}
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Form Actions - Spans both columns */}
                <div className="col-span-1 lg:col-span-2 pt-6 border-t border-emerald-100">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saveLesson.isLoading || !fileUrl}
                      className={`flex-1 px-4 py-3 rounded-xl font-medium shadow-lg transition-all flex items-center justify-center gap-2 group ${saveLesson.isLoading || !fileUrl
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-special)] hover:from-[var(--color-primary-hover)] hover:to-[var(--color-accent-special)] text-white hover:shadow-xl hover:scale-105'
                        }`}
                    >
                      {saveLesson.isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          {lesson ? 'Update Lesson' : 'Create Lesson'}
                        </>
                      )}
                    </button>
                  </div>
                  {!fileUrl && (
                    <p className="text-amber-600 text-sm mt-3 text-center">
                      Please upload a file before saving
                    </p>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}