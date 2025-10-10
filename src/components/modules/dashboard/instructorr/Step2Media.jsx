"use client";

import { useCourseStore } from "@/store/useCourseStore";
import { UploadCloud, Video } from "lucide-react";

export default function Step2Media() {
  const course = useCourseStore((s) => s.course);
  const updateCourse = useCourseStore((s) => s.updateCourse);
  const setThumbnail = useCourseStore((s) => s.setThumbnail);

  function handleThumbnail(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setThumbnail(f, URL.createObjectURL(f));
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">Course Media</h3>
      <p className="text-sm text-gray-500">Intro Course overview provider type. (mp4, YouTube, Vimeo etc.)</p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Course Thumbnail</label>
          <div className="mt-2 flex gap-3">
            <input type="file" accept="image/*" onChange={handleThumbnail} className="hidden" id="thumbnailFileStep2" />
            <label htmlFor="thumbnailFileStep2" className="flex items-center gap-2 px-3 py-2  text-white rounded cursor-pointer">
              {/* <UploadCloud size={16} /> Upload File */}
               <div className="flex-1">
              {course.thumbnailPreview ? (
                <div className="mt-3 rounded overflow-hidden border">
                  <img src={course.thumbnailPreview} alt="preview" className="w-full object-cover" />
                  <h2 className="text-[var(--color-text)]">Click Here to change.</h2>
                </div>
              ) : (
                <div className="mt-3 border-dashed border-2 border-gray-200 rounded p-6 text-center text-gray-500">
                  <UploadCloud size={28} className="mx-auto" />
                  <div className="mt-2">Upload Image (JPEG, PNG, GIF, WebP up to 2 MB)</div>
                </div>
              )}
            </div>
            </label>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Course Video</label>
          <div className="mt-2 flex gap-2 items-center">
            <select value={course.videoSource} onChange={(e) => updateCourse({ videoSource: e.target.value })} className="border border-gray-200 rounded px-3 py-2 text-sm">
              <option value="external">External URL</option>
              <option value="youtube">YouTube</option>
            </select>
            <input value={course.videoURL} onChange={(e) => updateCourse({ videoURL: e.target.value })} placeholder="External URL Link" className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm" />
          </div>

          {course.videoURL && (
            <div className="mt-4 border rounded overflow-hidden">
              {course.videoSource === "youtube" ? (
                <iframe src={course.videoURL} title="preview" className="w-full h-48" frameBorder="0" allowFullScreen />
              ) : (
                <div className="w-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <Video size={36} /> Video URL provided
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
