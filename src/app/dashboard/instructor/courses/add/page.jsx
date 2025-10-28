"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import api from "@/lib/apiClient";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Image from "next/image";
import { Upload, XCircle } from "lucide-react";

export default function AddCoursePage() {
  const { register, handleSubmit, setValue } = useForm();
  const [thumbnail, setThumbnail] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
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
      const payload = { ...data, price: parseInt(data.price, 10) };
      const res = await api.post("/courses/create", payload);
      toast.success("Course created successfully!");
      router.push(`/dashboard/instructor/courses/${res.data.data._id}/units`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create course");
    }
  };

  return (
    <div className="flex items-center justify-center p-6 text-[var(--color-text)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full container bg-white/90 backdrop-blur-lg shadow-[var(--shadow-medium)] rounded-[var(--radius-card)] p-8"
      >
        <h1 className="text-3xl font-bold text-[var(--color-secondary)] mb-6">
          Create a New Course
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2  gap-8">
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
                className="flex flex-col items-center justify-center w-full h-full mb-5 border-2 border-dashed border-[var(--color-primary)] rounded-[var(--radius-default)] cursor-pointer hover:bg-[var(--color-background)] transition"
              >
                <Upload className="text-[var(--color-primary)] mb-2" size={28} />
                <span className="text-sm text-gray-500">
                  {isUploading ? "Uploading..." : "Click to upload image"}
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

          <div>
            {/* ==== Title ==== */}
          <div className="">
            <label className="text-sm font-medium">Course Title</label>
            <input
              {...register("title", { required: true })}
              placeholder="Enter your course title"
              className="mt-1 w-full p-3 border border-gray-300 rounded-[var(--radius-default)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          {/* ==== Category ==== */}
          <div>
            <label className="text-sm font-medium">Category</label>
            <input
              {...register("category")}
              placeholder="e.g. SDG 11"
              className="mt-1 w-full p-3 border border-gray-300 rounded-[var(--radius-default)]"
            />
          </div>

          {/* ==== Level ==== */}
          <div>
            <label className="text-sm font-medium">Level</label>
            <select
              {...register("level")}
              className="mt-1 w-full p-3 border border-gray-300 rounded-[var(--radius-default)]"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* ==== Price ==== */}
          <div>
            <label className="text-sm font-medium">Price (USD)</label>
            <input
              type="number"
              {...register("price", { required: true })}
              placeholder="e.g. 30"
              className="mt-1 w-full p-3 border border-gray-300 rounded-[var(--radius-default)]"
            />
          </div>

          {/* ==== Status ==== */}
          <div>
            <label className="text-sm font-medium">Status</label>
            <select
              {...register("status")}
              className="mt-1 w-full p-3 border border-gray-300 rounded-[var(--radius-default)]"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          {/* ==== Description ==== */}
          <div className="col-span-2">
            <label className="text-sm font-medium">Short Description</label>
            <textarea
              {...register("description")}
              placeholder="Briefly describe your course"
              className="mt-1 w-full p-3 border border-gray-300 rounded-[var(--radius-default)] min-h-[100px]"
            ></textarea>
          </div>

          {/* ==== Submit ==== */}
          <div className="col-span-2 flex justify-end mt-6">
            <button
              type="submit"
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold px-6 py-3 rounded-[var(--radius-default)] shadow-[var(--shadow-soft)] transition-all"
            >
              Create Course
            </button>
          </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
