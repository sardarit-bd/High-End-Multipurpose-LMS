"use client";
import api from "@/lib/apiClient";
import { motion } from "framer-motion";
import { X, UploadCloud, Calendar, FileText, Award, Clock, AlertCircle, PlayCircle, File, CheckCircle, Eye, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient, useQuery } from "@tanstack/react-query";

export default function TaskModal({ task, onClose }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Check if task is already submitted
  const { data: existingSubmission, isLoading: submissionLoading } = useQuery({
    queryKey: ["taskSubmission", task?._id],
    queryFn: async () => {
      if (!task?._id) return null;
      try {
        const res = await api.get(`/submissions/tasks/${task._id}/me`);
        return res.data?.data;
      } catch (error) {
        // If no submission found, return null
        return null;
      }
    },
    enabled: !!task?._id,
  });

  const isAlreadySubmitted = !!existingSubmission;

  // Handle different task types
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file type based on task type
      if (task?.type === "video" && !selectedFile.type.startsWith("video/")) {
        alert("Please select a video file.");
        return;
      }
      if (task?.type === "pdf" && selectedFile.type !== "application/pdf") {
        alert("Please select a PDF file.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    // Handle quiz type - redirect to quiz
    if (task?.type === "quiz") {
      onClose();
      router.push(`/course/${task.course}/quiz/${task.quizId}`);
      return;
    }

    // Handle file submission for video/pdf types
    if (!file) {
      alert("Please upload a file before submitting.");
      return;
    }

    setUploading(true);

    try {
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

      // Invalidate queries to refresh progress and submissions
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      queryClient.invalidateQueries({ queryKey: ["enrollmentCourse"] });
      queryClient.invalidateQueries({ queryKey: ["myPoints"] });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });

      alert("Task submitted successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit task. Please try again.");
    } finally {
      setUploading(false);
      onClose();
    }
  };

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString() : "—";

  if (submissionLoading) {
    return (
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden p-8"
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Checking submission status...</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-[9999]  flex items-center justify-center bg-black/60 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl max-h-[95vh] overflow-y-auto"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-50 to-white px-8 py-6 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{task?.title}</h2>
              <p className="text-sm text-gray-600">
                {isAlreadySubmitted ? "Your submission results" : task?.description || "Submit your completed task"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Task Meta Cards */}
        <div className="px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <Calendar size={18} className="text-[var(--color-primary)]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Due Date</p>
                  <p className="font-semibold text-gray-900">{formatDate(task?.dueDate)}</p>
                </div>
              </div>
              {task?.dueDate && new Date(task.dueDate) < new Date() && (
                <span className="inline-flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
                  <AlertCircle size={10} />
                  Overdue
                </span>
              )}
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl border border-emerald-100 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Award size={18} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Max Points</p>
                  <p className="font-bold text-2xl text-emerald-700">{task?.maxPoints ?? 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl border border-amber-100 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <FileText size={18} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Type</p>
                  <p className="font-semibold text-gray-900 capitalize">{task?.type || "File"}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-100 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Clock size={18} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Created</p>
                  <p className="font-semibold text-gray-900">{formatDate(task?.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Submission Section */}
          <div className="mb-6">
            {isAlreadySubmitted ? (
              /* Already Submitted - Show Results */
              <div className="space-y-6">
                {/* Status Message Based on Review Status */}
                {existingSubmission?.status === 'pending_review' ? (
                  /* Under Review */
                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-6 border border-yellow-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-yellow-800">Task Under Review</h3>
                        <p className="text-sm text-yellow-600">Your task has been submitted and is currently being reviewed by the instructor.</p>
                      </div>
                    </div>
                  </div>
                ) : existingSubmission?.status === 'reviewed' ? (
                  /* Reviewed - Show Results */
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-emerald-800">Task Reviewed!</h3>
                        <p className="text-sm text-emerald-600">Your task has been reviewed by the instructor. Check your results below.</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Fallback */
                  <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                        <FileText className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">Task Submitted</h3>
                        <p className="text-sm text-gray-600">Your task has been submitted successfully.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submission Details */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Submission Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Submitted On</p>
                        <p className="text-sm text-gray-600">{formatDate(existingSubmission?.createdAt)}</p>
                      </div>
                    </div>
                    {/* Show points if reviewed */}
                    {existingSubmission?.status === 'reviewed' && existingSubmission?.pointsAwarded > 0 && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                          <Award className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Points Earned</p>
                          <p className="text-sm text-gray-600">{existingSubmission.pointsAwarded} points</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Review Feedback */}
                {existingSubmission?.reviewNote && (
                  <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-100">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-purple-600" />
                      Instructor Feedback
                    </h4>
                    <div className="bg-white rounded-xl p-4 border border-purple-200">
                      <p className="text-gray-700">{existingSubmission.reviewNote}</p>
                    </div>
                  </div>
                )}

                {/* Submitted File */}
                {existingSubmission?.artifactUrl && (
                  <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Your Submission</h4>
                    <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Submitted File</p>
                        <p className="text-xs text-gray-500">Click to view your submission</p>
                      </div>
                      <a
                        href={existingSubmission.artifactUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <Eye className="w-4 h-4 inline mr-2" />
                        View
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ) : task?.type === "quiz" ? (
              <>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Take Quiz</h3>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                    <PlayCircle size={32} className="text-blue-600" />
                  </div>
                  <p className="text-gray-800 font-semibold text-lg mb-2">Ready to take the quiz?</p>
                  <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
                    Complete this quiz to submit your task. Your answers will be automatically graded.
                  </p>
                  <button
                    onClick={handleSubmit}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                  >
                    <PlayCircle size={18} />
                    Start Quiz
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Upload {task?.type === "video" ? "Video" : task?.type === "pdf" ? "PDF" : "File"}
                </h3>

                <div
                  className={`border-3 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                    file
                      ? "border-emerald-200 bg-emerald-50"
                      : "border-gray-200 hover:border-[var(--color-primary)] hover:bg-gray-50"
                  }`}
                >
                  {!file ? (
                    <>
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-primary)]/5 flex items-center justify-center">
                        {task?.type === "video" ? (
                          <PlayCircle size={32} className="text-[var(--color-primary)]" />
                        ) : task?.type === "pdf" ? (
                          <File size={32} className="text-[var(--color-primary)]" />
                        ) : (
                          <UploadCloud size={32} className="text-[var(--color-primary)]" />
                        )}
                      </div>
                      <p className="text-gray-800 font-semibold text-lg mb-2">
                        {task?.type === "video" ? "Upload your video" :
                         task?.type === "pdf" ? "Upload your PDF document" :
                         "Drag & drop or click to upload"}
                      </p>
                      <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
                        {task?.type === "video" ?
                          "Supports MP4, AVI, MOV, WMV • Max size 100MB" :
                         task?.type === "pdf" ?
                          "Supports PDF files • Max size 25MB" :
                          "Supports PDF, DOCX, JPG, PNG, ZIP • Max size 25MB"}
                      </p>
                      <label className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/90 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                        {task?.type === "video" ? <PlayCircle size={18} /> :
                         task?.type === "pdf" ? <File size={18} /> :
                         <UploadCloud size={18} />}
                        Choose {task?.type === "video" ? "Video" : task?.type === "pdf" ? "PDF" : "File"}
                        <input
                          type="file"
                          accept={task?.type === "video" ?
                            "video/*" :
                           task?.type === "pdf" ?
                            ".pdf" :
                            ".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"}
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-emerald-100 to-green-50 flex items-center justify-center">
                        {task?.type === "video" ? (
                          <PlayCircle size={24} className="text-emerald-600" />
                        ) : task?.type === "pdf" ? (
                          <File size={24} className="text-emerald-600" />
                        ) : (
                          <FileText size={24} className="text-emerald-600" />
                        )}
                      </div>
                      <p className="text-gray-800 font-semibold mb-2">File Ready</p>
                      <p className="text-sm text-gray-600 mb-2">{file.name}</p>
                      <p className="text-xs text-gray-500 mb-6">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => setFile(null)}
                          className="px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium hover:bg-red-50 rounded-lg transition-colors"
                        >
                          Remove
                        </button>
                        <button
                          onClick={handleSubmit}
                          disabled={uploading}
                          className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-70"
                        >
                          {uploading ? "Uploading..." : "Submit Now"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-gray-700 hover:text-gray-900 font-medium hover:bg-gray-100 rounded-xl transition-colors"
            >
              {isAlreadySubmitted ? "Close" : "Cancel"}
            </button>

            {isAlreadySubmitted ? (
              /* Already submitted - just close button */
              <div className="flex items-center gap-4">
                <span className="text-sm text-emerald-600 font-medium">✓ Task completed</span>
              </div>
            ) : (
              /* Not submitted - show submission options */
              <div className="flex items-center gap-4">
                {task?.type === "quiz" ? (
                  <button
                    onClick={handleSubmit}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-xl hover:shadow-xl transition-all"
                  >
                    Start Quiz
                  </button>
                ) : (
                  <>
                    {!file && (
                      <label className="cursor-pointer inline-flex items-center gap-2 px-6 py-2.5 border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-semibold rounded-xl hover:bg-[var(--color-primary)]/5 transition-colors">
                        {task?.type === "video" ? <PlayCircle size={18} /> :
                         task?.type === "pdf" ? <File size={18} /> :
                         <UploadCloud size={18} />}
                        Select {task?.type === "video" ? "Video" : task?.type === "pdf" ? "PDF" : "File"}
                        <input
                          type="file"
                          accept={task?.type === "video" ?
                            "video/*" :
                           task?.type === "pdf" ?
                            ".pdf" :
                            ".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"}
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    )}
                    <button
                      onClick={handleSubmit}
                      disabled={!file || uploading}
                      className="px-8 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/90 text-white font-bold rounded-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {uploading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Uploading...
                        </span>
                      ) : (
                        "Submit Task"
                      )}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}