"use client";

import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import api from "@/lib/apiClient";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Upload,
  XCircle,
  Sparkles,
  BookOpen,
  Tag,
  TrendingUp,
  DollarSign,
  Globe,
  FileText,
  Plus,
  PlayCircle,
  Video,
  Clock,
  FileVideo,
  Loader2
} from "lucide-react";
import { useCategories } from "@/hooks/useCourse";

export default function AddCoursePage() {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [thumbnail, setThumbnail] = useState(null);
  const [introVideo, setIntroVideo] = useState(null);
  const [videoDuration, setVideoDuration] = useState(null);
  const [videoFileName, setVideoFileName] = useState("");
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const videoRef = useRef(null);
  const router = useRouter();

  const { data: categories } = useCategories()

  // ==== Upload thumbnail ====
  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsUploadingThumbnail(true);
    try {
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const url = res.data?.data?.url;
      setThumbnail(url);
      setValue("thumbnail", url);
      toast.success("Thumbnail uploaded successfully!");
    } catch (err) {
      toast.error("Thumbnail upload failed!");
    } finally {
      setIsUploadingThumbnail(false);
    }
  };

  // ==== Upload intro video ====
  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['video/mp4', 'video/webm', 'video/ogg'];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload MP4, WebM, or OGG video files only");
      return;
    }

    // Validate file size (max 200MB)
    if (file.size > 200 * 1024 * 1024) {
      toast.error("Video size should be less than 200MB");
      return;
    }

    setVideoFileName(file.name);

    // Get video duration
    // const video = document.createElement('video');
    // video.preload = 'metadata';
    // video.onloadedmetadata = function() {
    //   window.URL.revokeObjectURL(video.src);
    //   const duration = Math.round(video.duration);
    //   setVideoDuration(duration);
    //   setValue("introVideoDuration", duration);

    //   // Format duration for display
    //   const minutes = Math.floor(duration / 60);
    //   const seconds = duration % 60;
    //   setVideoDuration(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    // };
    // video.src = URL.createObjectURL(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "video");

    setIsUploadingVideo(true);
    try {
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const url = res.data?.data?.url;
      setIntroVideo(url);
      setValue("introVideo", url);
      toast.success("Intro video uploaded successfully!");
    } catch (err) {
      toast.error("Video upload failed! " + (err.response?.data?.message || ""));
    } finally {
      setIsUploadingVideo(false);
    }
  };

  // ==== Create course ====
  const onSubmit = async (data) => {
    try {
      const price = isPaid ? parseInt(data.price, 10) : 0;
      const payload = {
        ...data,
        price,
        introVideo: introVideo || "",
      };
      console.log(payload);
      const res = await api.post("/courses/create", payload);
      toast.success("Course created successfully!");
      router.push(`/dashboard/instructor/courses/${res.data.data._id}/units`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create course");
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-special)] rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-[var(--color-text)]">
              Create New Course
            </h1>
          </div>
          <p className="text-[var(--color-text)] opacity-80 max-w-2xl">
            Fill in the details below to create your course. All fields are designed to help you structure the perfect learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Media Upload */}
          <div className="lg:col-span-5 space-y-8">
            {/* Thumbnail Upload Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-8"
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-[var(--radius-card)] shadow-[var(--shadow-medium)] border border-emerald-100/50 overflow-hidden">
                <div className="p-6 border-b border-emerald-50">
                  <h2 className="text-lg font-semibold text-[var(--color-text)] flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[var(--color-primary)]" />
                    Course Thumbnail
                  </h2>
                  <p className="text-sm text-[var(--color-text)] opacity-70 mt-1">
                    Upload a compelling image that represents your course
                  </p>
                </div>

                <div className="p-6">
                  {thumbnail ? (
                    <div className="group relative aspect-video rounded-[var(--radius-default)] overflow-hidden border-2 border-emerald-100">
                      <Image
                        src={thumbnail}
                        alt="Thumbnail Preview"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-text)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <button
                        type="button"
                        onClick={() => {
                          setThumbnail(null);
                          setValue("thumbnail", "");
                        }}
                        className="absolute top-3 right-3 bg-white/95 text-red-600 p-2 rounded-full hover:bg-white shadow-[var(--shadow-soft)] transition-all hover:scale-110"
                      >
                        <XCircle size={20} />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="thumbnailInput"
                      className={`flex flex-col items-center justify-center aspect-video rounded-[var(--radius-default)] border-3 border-dashed transition-all duration-300 cursor-pointer group
                        ${isUploadingThumbnail
                          ? 'border-emerald-300 bg-emerald-50'
                          : 'border-emerald-200 hover:border-[var(--color-primary)] hover:bg-emerald-50/50'
                        }`}
                    >
                      <div className={`p-4 rounded-full mb-4 transition-all duration-300
                        ${isUploadingThumbnail
                          ? 'animate-pulse bg-emerald-100'
                          : 'bg-emerald-100 group-hover:bg-emerald-200 group-hover:scale-110'
                        }`}
                      >
                        {isUploadingThumbnail ? (
                          <Loader2 className="w-8 h-8 text-[var(--color-primary)] animate-spin" />
                        ) : (
                          <Upload className="w-8 h-8 text-emerald-400 group-hover:text-[var(--color-primary)]" />
                        )}
                      </div>
                      <span className={`text-lg font-medium mb-2 transition-colors duration-300
                        ${isUploadingThumbnail ? 'text-[var(--color-primary)]' : 'text-[var(--color-text)] group-hover:text-[var(--color-primary)]'}
                      `}>
                        {isUploadingThumbnail ? "Uploading..." : "Upload Thumbnail"}
                      </span>
                      <span className="text-sm text-[var(--color-text)] opacity-70 text-center px-4">
                        Recommended: 1280×720px (16:9 aspect ratio). Max 5MB
                      </span>
                      <input
                        id="thumbnailInput"
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailUpload}
                        className="hidden"
                        disabled={isUploadingThumbnail}
                      />
                    </label>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Intro Video Upload Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/95 backdrop-blur-sm rounded-[var(--radius-card)] shadow-[var(--shadow-medium)] border border-blue-100/50 overflow-hidden"
            >
              <div className="p-6 border-b border-blue-50">
                <h2 className="text-lg font-semibold text-[var(--color-text)] flex items-center gap-2">
                  <Video className="w-5 h-5 text-[var(--color-secondary)]" />
                  Intro Video (Optional)
                </h2>
                <p className="text-sm text-[var(--color-text)] opacity-70 mt-1">
                  Add a welcome video to introduce your course
                </p>
              </div>

              <div className="p-6">
                {introVideo ? (
                  <div className="space-y-4">
                    <div className="group relative aspect-video rounded-[var(--radius-default)] overflow-hidden border-2 border-blue-100 bg-gray-900">
                      <video
                        ref={videoRef}
                        src={introVideo}
                        className="w-full h-full object-contain"
                        controls
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      <button
                        type="button"
                        onClick={() => {
                          setIntroVideo(null);
                          setValue("introVideo", "");
                          setVideoDuration(null);
                          setVideoFileName("");
                        }}
                        className="absolute top-3 right-3 bg-white/95 text-red-600 p-2 rounded-full hover:bg-white shadow-[var(--shadow-soft)] transition-all hover:scale-110"
                      >
                        <XCircle size={20} />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-[var(--color-text)]">
                          <FileVideo className="w-4 h-4" />
                          <span className="truncate">{videoFileName}</span>
                        </div>
                        {videoDuration && (
                          <div className="flex items-center gap-1 text-blue-600">
                            <Clock className="w-4 h-4" />
                            <span>{videoDuration}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-[var(--color-text)] opacity-70">
                        Video is ready! Students will see this when they enroll.
                      </div>
                    </div>
                  </div>
                ) : (
                  <label
                    htmlFor="videoInput"
                    className={`flex flex-col items-center justify-center aspect-video rounded-[var(--radius-default)] border-3 border-dashed transition-all duration-300 cursor-pointer group
                      ${isUploadingVideo
                        ? 'border-blue-300 bg-blue-50'
                        : 'border-blue-200 hover:border-[var(--color-secondary)] hover:bg-blue-50/50'
                      }`}
                  >
                    <div className={`p-4 rounded-full mb-4 transition-all duration-300
                      ${isUploadingVideo
                        ? 'animate-pulse bg-blue-100'
                        : 'bg-blue-100 group-hover:bg-blue-200 group-hover:scale-110'
                      }`}
                    >
                      {isUploadingVideo ? (
                        <Loader2 className="w-8 h-8 text-[var(--color-secondary)] animate-spin" />
                      ) : (
                        <PlayCircle className="w-8 h-8 text-blue-400 group-hover:text-[var(--color-secondary)]" />
                      )}
                    </div>
                    <span className={`text-lg font-medium mb-2 transition-colors duration-300
                      ${isUploadingVideo ? 'text-[var(--color-secondary)]' : 'text-[var(--color-text)] group-hover:text-[var(--color-secondary)]'}
                    `}>
                      {isUploadingVideo ? "Uploading Video..." : "Upload Intro Video"}
                    </span>
                    <span className="text-sm text-[var(--color-text)] opacity-70 text-center px-4 mb-1">
                      MP4, WebM, or OGG format. Max 200MB
                    </span>
                    <span className="text-xs text-[var(--color-text)] opacity-50">
                      Optional but highly recommended
                    </span>
                    <input
                      id="videoInput"
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                      disabled={isUploadingVideo}
                    />
                  </label>
                )}

                {/* Video Requirements Info */}
                {!introVideo && !isUploadingVideo && (
                  <div className="mt-6 p-4 bg-blue-50/50 rounded-[var(--radius-default)] border border-blue-100">
                    <h4 className="text-sm font-semibold text-[var(--color-text)] mb-2 flex items-center gap-2">
                      <Video className="w-4 h-4" />
                      Video Recommendations:
                    </h4>
                    <ul className="text-xs text-[var(--color-text)] opacity-70 space-y-1">
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
                        <span>Keep it under 5 minutes for best engagement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
                        <span>Introduce yourself and course objectives</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
                        <span>Use clear audio and good lighting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
                        <span>16:9 aspect ratio (1920×1080 recommended)</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Form Fields */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/95 backdrop-blur-sm rounded-[var(--radius-card)] shadow-[var(--shadow-medium)] border border-emerald-100/50 overflow-hidden"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
                <div className="space-y-6">
                  {/* Hidden fields for video data */}
                  <input type="hidden" {...register("thumbnail")} />
                  <input type="hidden" {...register("introVideo")} />
                  <input type="hidden" {...register("introVideoDuration")} />

                  {/* ==== Title ==== */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] mb-3">
                      <div className="p-1.5 bg-emerald-100 rounded-lg">
                        <BookOpen className="w-4 h-4 text-[var(--color-primary)]" />
                      </div>
                      Course Title
                    </label>
                    <input
                      {...register("title", { required: true })}
                      placeholder="Enter your course title"
                      className="w-full p-4 border border-emerald-200 rounded-[var(--radius-default)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all bg-emerald-50/30 hover:bg-emerald-50/50 text-[var(--color-text)] placeholder-emerald-400/70"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* ==== Category ==== */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] mb-3">
                        <div className="p-1.5 bg-blue-100 rounded-lg">
                          <Tag className="w-4 h-4 text-[var(--color-secondary)]" />
                        </div>
                        Category
                      </label>
                      <select
                        {...register("category")}
                        className="w-full p-4 border border-blue-200 rounded-[var(--radius-default)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent transition-all bg-blue-50/30 hover:bg-blue-50/50 text-[var(--color-text)]"
                      >
                        <option value="">Select a category</option>
                        {categories?.data?.categories && categories.data.categories.length > 0 ? (
                          categories.data.categories
                            .filter(cat => !cat.isDeleted)
                            .map((category) => (
                              <option key={category._id} value={category.title.toLowerCase().replace(/\s+/g, '_')}>
                                {category.title}
                              </option>
                            ))
                        ) : (
                          <option value="" disabled>No categories available</option>
                        )}
                      </select>
                    </div>

                    {/* ==== Level ==== */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] mb-3">
                        <div className="p-1.5 bg-emerald-100 rounded-lg">
                          <TrendingUp className="w-4 h-4 text-[var(--color-primary)]" />
                        </div>
                        Level
                      </label>
                      <select
                        {...register("level")}
                        className="w-full p-4 border border-emerald-200 rounded-[var(--radius-default)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all bg-emerald-50/30 hover:bg-emerald-50/50 text-[var(--color-text)] appearance-none cursor-pointer"
                      >
                        <option value="beginner" className="py-2">Beginner</option>
                        <option value="intermediate" className="py-2">Intermediate</option>
                        <option value="advanced" className="py-2">Advanced</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* ==== Pricing Type ==== */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] mb-3">
                        <div className="p-1.5 bg-yellow-100 rounded-lg">
                          <DollarSign className="w-4 h-4 text-[var(--color-accent)]" />
                        </div>
                        Pricing Type
                      </label>
                      <select
                        value={isPaid ? "paid" : "free"}
                        onChange={(e) => setIsPaid(e.target.value === "paid")}
                        className="w-full p-4 border border-yellow-200 rounded-[var(--radius-default)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all bg-yellow-50/30 hover:bg-yellow-50/50 text-[var(--color-text)] appearance-none cursor-pointer"
                      >
                        <option value="free" className="py-2">Free Course</option>
                        <option value="paid" className="py-2">Paid Course</option>
                      </select>
                    </div>

                    {/* ==== Price ==== */}
                    {isPaid && (
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] mb-3">
                          <div className="p-1.5 bg-cyan-100 rounded-lg">
                            <DollarSign className="w-4 h-4 text-[var(--color-accent-special)]" />
                          </div>
                          Price (USD)
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-500">$</span>
                          <input
                            type="number"
                            {...register("price", { required: isPaid })}
                            placeholder="e.g. 30"
                            className="w-full pl-10 pr-4 py-4 border border-cyan-200 rounded-[var(--radius-default)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-special)] focus:border-transparent transition-all bg-cyan-50/30 hover:bg-cyan-50/50 text-[var(--color-text)] placeholder-cyan-400/70"
                          />
                        </div>
                      </div>
                    )}

                    {/* ==== Status ==== */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] mb-3">
                        <div className="p-1.5 bg-blue-100 rounded-lg">
                          <Globe className="w-4 h-4 text-[var(--color-secondary)]" />
                        </div>
                        Status
                      </label>
                      <select
                        {...register("status")}
                        className="w-full p-4 border border-blue-200 rounded-[var(--radius-default)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent transition-all bg-blue-50/30 hover:bg-blue-50/50 text-[var(--color-text)] appearance-none cursor-pointer"
                      >
                        <option value="draft" className="py-2">Draft</option>
                        <option value="published" className="py-2">Published</option>
                      </select>
                    </div>
                  </div>

                  {/* ==== Description ==== */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] mb-3">
                      <div className="p-1.5 bg-emerald-100 rounded-lg">
                        <FileText className="w-4 h-4 text-[var(--color-primary)]" />
                      </div>
                      Short Description
                    </label>
                    <textarea
                      {...register("description")}
                      placeholder="Briefly describe your course content, objectives, and target audience..."
                      className="w-full p-4 border border-emerald-200 rounded-[var(--radius-default)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all bg-emerald-50/30 hover:bg-emerald-50/50 text-[var(--color-text)] placeholder-emerald-400/70 min-h-[140px] resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* ==== Submit ==== */}
                <div className="mt-10 pt-6 border-t border-emerald-100">
                  <button
                    type="submit"
                    className="group w-full md:w-auto px-8 py-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-special)] text-white font-semibold rounded-[var(--radius-default)] shadow-[var(--shadow-medium)] hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 hover:from-[var(--color-primary-hover)] hover:to-[var(--color-accent-special)]"
                    disabled={isUploadingThumbnail || isUploadingVideo}
                  >
                    {isUploadingThumbnail || isUploadingVideo ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="text-lg">Processing Uploads...</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
                        <span className="text-lg">Create Course</span>
                      </>
                    )}
                  </button>
                  <p className="text-sm text-[var(--color-text)] opacity-70 mt-4 text-center">
                    You'll be able to add course units and lessons after creation
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}