"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import api from "@/lib/apiClient";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Image from "next/image";
import { Upload, XCircle, Sparkles, BookOpen, Tag, TrendingUp, DollarSign, Globe, FileText, Plus } from "lucide-react";

export default function AddCoursePage() {
  const { register, handleSubmit, setValue } = useForm();
  const [thumbnail, setThumbnail] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const router = useRouter();

  // ==== Upload thumbnail ====
  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    try {
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const url = res.data?.data?.url;
      setThumbnail(url);
      setValue("thumbnail", url);
      toast.success("Image uploaded successfully!");
    } catch (err) {
      toast.error("Upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  // ==== Create course ====
  const onSubmit = async (data) => {
    try {
      const price = isPaid ? parseInt(data.price, 10) : 0;
      const payload = { ...data, price };
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
          {/* Left Column - Thumbnail Upload */}
          <div className="lg:col-span-5">
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
                        onClick={() => setThumbnail(null)}
                        className="absolute top-3 right-3 bg-white/95 text-red-600 p-2 rounded-full hover:bg-white shadow-[var(--shadow-soft)] transition-all hover:scale-110"
                      >
                        <XCircle size={20} />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="thumbnailInput"
                      className={`flex flex-col items-center justify-center aspect-video rounded-[var(--radius-default)] border-3 border-dashed transition-all duration-300 cursor-pointer group
                        ${isUploading 
                          ? 'border-emerald-300 bg-emerald-50' 
                          : 'border-emerald-200 hover:border-[var(--color-primary)] hover:bg-emerald-50/50'
                        }`}
                    >
                      <div className={`p-4 rounded-full mb-4 transition-all duration-300
                        ${isUploading 
                          ? 'animate-pulse bg-emerald-100' 
                          : 'bg-emerald-100 group-hover:bg-emerald-200 group-hover:scale-110'
                        }`}
                      >
                        <Upload className={`w-8 h-8 transition-colors duration-300
                          ${isUploading ? 'text-[var(--color-primary)]' : 'text-emerald-400 group-hover:text-[var(--color-primary)]'}
                        `} />
                      </div>
                      <span className={`text-lg font-medium mb-2 transition-colors duration-300
                        ${isUploading ? 'text-[var(--color-primary)]' : 'text-[var(--color-text)] group-hover:text-[var(--color-primary)]'}
                      `}>
                        {isUploading ? "Uploading..." : "Upload Thumbnail"}
                      </span>
                      <span className="text-sm text-[var(--color-text)] opacity-70 text-center px-4">
                        Recommended: 1280×720px (16:9 aspect ratio)
                      </span>
                      <input
                        id="thumbnailInput"
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
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
                        <option value="web-development">Web Development</option>
                        <option value="data-science">Data Science</option>
                        <option value="design">Design</option>
                        <option value="business">Business</option>
                        <option value="marketing">Marketing</option>
                        <option value="programming">Programming</option>
                        <option value="mobile-development">Mobile Development</option>
                        <option value="artificial-intelligence">Artificial Intelligence</option>
                        <option value="cybersecurity">Cybersecurity</option>
                        <option value="cloud-computing">Cloud Computing</option>
                        <option value="devops">DevOps</option>
                        <option value="blockchain">Blockchain</option>
                        <option value="game-development">Game Development</option>
                        <option value="other">Other</option>
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
                  >
                    <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
                    <span className="text-lg">Create Course</span>
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