"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import api from "@/lib/apiClient";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Image from "next/image";
import { Upload, XCircle, Sparkles, BookOpen, Tag, TrendingUp, DollarSign, Globe, FileText, Plus } from "lucide-react";
import { useCategories } from "@/hooks/useCourse";

export default function EditCoursePage() {
  const { register, handleSubmit, setValue, reset } = useForm();
  const [thumbnail, setThumbnail] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { courseId } = useParams();

  // Fetch categories
  const { data: categories } = useCategories();

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${courseId}`);
        const course = res.data.data;
        
        // Pre-populate form
        reset({
          title: course.title,
          category: course.category,
          level: course.level,
          price: course.price > 0 ? course.price : '',
          status: course.status,
          description: course.description,
          thumbnail: course.thumbnail
        });
        
        setThumbnail(course.thumbnail);
        setIsPaid(course.price > 0);
        setIsLoading(false);
      } catch (err) {
        toast.error("Failed to load course data");
        // router.push("/dashboard/instructor/courses");
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId, reset, router]);

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

  // ==== Update course ====
  const onSubmit = async (data) => {
    try {
      const price = isPaid ? parseInt(data.price, 10) : 0;
      const payload = { ...data, price };
      await api.patch(`/courses/${courseId}`, payload);
      toast.success("Course updated successfully!");
      router.push("/dashboard/instructor/courses");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update course");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6 text-[var(--color-text)] min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto mb-4"></div>
          <p>Loading course data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-6 text-[var(--color-text)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full container bg-white/90 backdrop-blur-lg shadow-[var(--shadow-medium)] rounded-[var(--radius-card)] p-8"
      >
        <h1 className="text-3xl font-bold text-[var(--color-secondary)] mb-6">
          Edit Course
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ==== Thumbnail Upload ==== */}
          <div className="">

            {thumbnail ? (
              <div className="relative w-full h-full rounded-[var(--radius-default)] overflow-hidden border border-gray-300">
                <Image
                  src={thumbnail}
                  alt="Thumbnail Preview"
                  fill
                  className="object-cover rounded-[var(--radius-default)]"
                />
                <button
                  type="button"
                  onClick={() => setThumbnail(null)}
                  className="absolute top-2 right-2 bg-white/80 text-red-600 p-1 rounded-full hover:bg-white transition"
                >
                  <XCircle size={18} />
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ==== Title ==== */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] mb-3">
                <div className="p-1.5 bg-purple-100 rounded-lg">
                  <BookOpen className="w-4 h-4 text-[var(--color-primary)]" />
                </div>
                Course Title
              </label>
              <input
                {...register("title", { required: true })}
                placeholder="Enter your course title"
                className="w-full p-4 border border-purple-200 rounded-[var(--radius-default)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all bg-purple-50/30 hover:bg-purple-50/50 text-[var(--color-text)] placeholder-purple-400/70"
              />
            </div>

            {/* ==== Category ==== */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] mb-3">
                <div className="p-1.5 bg-blue-100 rounded-lg">
                  <Tag className="w-4 h-4 text-[var(--color-secondary)]" />
                </div>
                Category
              </label>
              <select
                {...register("category", { required: true })}
                className="w-full p-4 border border-blue-200 rounded-[var(--radius-default)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent transition-all bg-blue-50/30 hover:bg-blue-50/50 text-[var(--color-text)]"
                disabled={!categories || categories.data?.categories.length === 0}
              >
                <option value="">
                  {!categories ? "Loading categories..." : "Select a category"}
                </option>
                {categories?.data?.categories && categories.data.categories.length > 0 ? (
                  categories.data.categories
                    .filter(cat => !cat.isDeleted)
                    .map((category) => (
                      <option 
                        key={category._id} 
                        value={category.title.toLowerCase().replace(/\s+/g, '_')}
                      >
                        {category.title}
                      </option>
                    ))
                ) : (
                  categories && <option value="" disabled>No categories available</option>
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
                className="w-full p-4 border border-emerald-200 rounded-[var(--radius-default)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all bg-emerald-50/30 hover:bg-emerald-50/50 text-[var(--color-text)]"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* ==== Pricing Type ==== */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] mb-3">
                <div className="p-1.5 bg-amber-100 rounded-lg">
                  <DollarSign className="w-4 h-4 text-amber-600" />
                </div>
                Pricing Type
              </label>
              <select
                value={isPaid ? "paid" : "free"}
                onChange={(e) => setIsPaid(e.target.value === "paid")}
                className="w-full p-4 border border-amber-200 rounded-[var(--radius-default)] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-amber-50/30 hover:bg-amber-50/50 text-[var(--color-text)]"
              >
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            {/* ==== Price ==== */}
            {isPaid && (
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] mb-3">
                  <div className="p-1.5 bg-amber-100 rounded-lg">
                    <DollarSign className="w-4 h-4 text-amber-600" />
                  </div>
                  Price (USD)
                </label>
                <input
                  type="number"
                  {...register("price", { required: isPaid })}
                  placeholder="e.g. 30"
                  className="w-full p-4 border border-amber-200 rounded-[var(--radius-default)] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-amber-50/30 hover:bg-amber-50/50 text-[var(--color-text)] placeholder-amber-400/70"
                />
              </div>
            )}

            {/* ==== Status ==== */}
            <div className={isPaid ? "" : "md:col-span-2"}>
              <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] mb-3">
                <div className="p-1.5 bg-indigo-100 rounded-lg">
                  <Globe className="w-4 h-4 text-indigo-600" />
                </div>
                Status
              </label>
              <select
                {...register("status")}
                className="w-full p-4 border border-indigo-200 rounded-[var(--radius-default)] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-indigo-50/30 hover:bg-indigo-50/50 text-[var(--color-text)]"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {/* ==== Description ==== */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] mb-3">
                <div className="p-1.5 bg-rose-100 rounded-lg">
                  <FileText className="w-4 h-4 text-rose-600" />
                </div>
                Short Description
              </label>
              <textarea
                {...register("description")}
                placeholder="Briefly describe your course"
                className="w-full p-4 border border-rose-200 rounded-[var(--radius-default)] focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all bg-rose-50/30 hover:bg-rose-50/50 text-[var(--color-text)] placeholder-rose-400/70 min-h-[120px] resize-none"
              ></textarea>
            </div>

            {/* ==== Submit ==== */}
            <div className="md:col-span-2 flex justify-end mt-6">
              <button
                type="submit"
                className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold px-8 py-4 rounded-[var(--radius-default)] shadow-[var(--shadow-soft)] transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Update Course
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}