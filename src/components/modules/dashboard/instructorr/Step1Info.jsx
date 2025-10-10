"use client";

import { useCourseStore } from "@/store/useCourseStore";
import { Trash2, Plus } from "lucide-react";

export default function Step1Info() {
  const course = useCourseStore((s) => s.course);
  const updateCourse = useCourseStore((s) => s.updateCourse);

   const { setOutcome, addOutcome, removeOutcome, setRequirement, addRequirement, removeRequirement } = useCourseStore();
   console.log(useCourseStore());

  return (
    <div className="space-y-4 text-[var(--color-text)]">
      <h3 className="text-lg font-semibold mb-2">Basic Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <label className="text-sm font-medium">Course Title *</label>
          <input value={course.title} onChange={(e) => updateCourse({ title: e.target.value })} className="w-full mt-2 border border-gray-200 rounded px-3 py-2 text-sm" placeholder="Enter course title" />
        </div>

        <div>
          <label className="text-sm font-medium">Course Category</label>
          <select value={course.category} onChange={(e) => updateCourse({ category: e.target.value })} className="w-full mt-2 border border-gray-200 rounded px-3 py-2 text-sm">
            <option value="">Select</option>
            <option>Design</option>
            <option>Development</option>
            <option>Marketing</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Course Level</label>
          <select value={course.level} onChange={(e) => updateCourse({ level: e.target.value })} className="w-full mt-2 border border-gray-200 rounded px-3 py-2 text-sm">
            <option value="">Select</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Language</label>
          <select value={course.language} onChange={(e) => updateCourse({ language: e.target.value })} className="w-full mt-2 border border-gray-200 rounded px-3 py-2 text-sm">
            <option value="">Select</option>
            <option>English</option>
            <option>Spanish</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Max Number of Students</label>
          <input value={course.maxStudents} onChange={(e) => updateCourse({ maxStudents: e.target.value })} className="w-full mt-2 border border-gray-200 rounded px-3 py-2 text-sm" placeholder="e.g. 500" />
        </div>

        <div>
          <label className="text-sm font-medium">Public / Private Course</label>
          <select value={course.publicPrivate} onChange={(e) => updateCourse({ publicPrivate: e.target.value })} className="w-full mt-2 border border-gray-200 rounded px-3 py-2 text-sm">
            <option>Public</option>
            <option>Private</option>
          </select>
        </div>

        <div className="md:col-span-3">
          <label className="text-sm font-medium">Short Description</label>
          <input value={course.shortDescription} onChange={(e) => updateCourse({ shortDescription: e.target.value })} className="w-full mt-2 border border-gray-200 rounded px-3 py-2 text-sm" />
        </div>

        <div className="md:col-span-3">
          <label className="text-sm font-medium">Course Description</label>
          <textarea value={course.description} onChange={(e) => updateCourse({ description: e.target.value })} rows={6} className="w-full mt-2 border border-gray-200 rounded px-3 py-2 text-sm" />
        </div>

        <div className="md:col-span-2 bg-white border rounded p-4">
          <h4 className="font-medium mb-2">What will students learn in your course?</h4>
          <div className="space-y-2">
            {course.outcomes.map((o, i) => (
              <div key={i} className="flex items-center gap-2">
                <input value={o} onChange={(e) => setOutcome(i, e.target.value)} className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm" placeholder={`Outcome ${i + 1}`} />
                {course.outcomes.length > 1 && <button onClick={() => removeOutcome(i)} className="text-red-500 p-2"><Trash2 size={16} /></button>}
              </div>
            ))}
            <button onClick={() => addOutcome()} className="text-[var(--color-primary)] text-sm mt-2 flex items-center gap-2"><Plus size={14} /> Add New Item</button>
          </div>
        </div>

        <div className="bg-white border rounded p-4">
          <h4 className="font-medium mb-2">Requirements</h4>
          <div className="space-y-2">
            {course.requirements.map((r, i) => (
              <div key={i} className="flex items-center gap-2">
                <input value={r} onChange={(e) => setRequirement(i, e.target.value)} className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm" placeholder={`Requirement ${i + 1}`} />
                {course.requirements.length > 1 && <button onClick={() => removeRequirement(i)} className="text-red-500 p-2"><Trash2 size={16} /></button>}
              </div>
            ))}
            <button onClick={() => addRequirement()} className="text-[var(--color-primary)] text-sm mt-2 flex items-center gap-2"><Plus size={14} /> Add New Item</button>
          </div>
        </div>

        <div className="md:col-span-3">
          <label className="inline-flex items-center gap-2 mt-2">
            <input type="checkbox" checked={course.featured} onChange={(e) => updateCourse({ featured: e.target.checked })} />
            <span className="text-sm"> Check this for featured course</span>
          </label>
        </div>
      </div>
    </div>
  );
}
