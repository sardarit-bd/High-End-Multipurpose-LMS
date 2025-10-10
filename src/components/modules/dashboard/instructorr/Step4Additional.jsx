"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCourseStore } from "@/store/useCourseStore";

export default function Step4Additional() {
  const course = useCourseStore((s) => s.course);
  const addFaq = useCourseStore((s) => s.addFaq);
  const deleteFaq = useCourseStore((s) => s.deleteFaq);
  const addTag = useCourseStore((s) => s.addTag);
  const removeTag = useCourseStore((s) => s.removeTag);
  const updateCourse = useCourseStore((s) => s.updateCourse);

  const [q, setQ] = useState("");
  const [a, setA] = useState("");
  const [tagInput, setTagInput] = useState("");

  function handleTagKey(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (!tagInput.trim()) return;
      addTag(tagInput.trim().toLowerCase());
      setTagInput("");
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">FAQ's</h3>

      <div className="space-y-3">
        {course.faqs.map((f) => (
          <div key={f.id} className="border rounded p-3 flex justify-between items-start">
            <div>
              <div className="font-medium">{f.q}</div>
              <div className="text-sm text-gray-500 mt-1">{f.a}</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => deleteFaq(f.id)} className="text-red-500"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Question" className="border rounded px-3 py-2 text-sm" />
          <input value={a} onChange={(e) => setA(e.target.value)} placeholder="Answer" className="border rounded px-3 py-2 text-sm" />
        </div>
        <div>
          <button onClick={() => { if (!q.trim()) return alert("Enter question"); addFaq(q.trim(), a.trim()); setQ(""); setA(""); }} className="text-[var(--color-primary)] text-sm mt-2 flex items-center gap-2"><Plus size={14} /> Add FAQ</button>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Tags</label>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          {course.tags.map((t) => (
            <div key={t} className="bg-gray-100 px-2 py-1 rounded-full text-sm flex items-center gap-2">
              <span className="lowercase">{t}</span>
              <button onClick={() => removeTag(t)} className="text-gray-500">x</button>
            </div>
          ))}
          <input value={tagInput} onKeyDown={handleTagKey} onChange={(e) => setTagInput(e.target.value)} placeholder="Type & press Enter" className="border rounded px-3 py-2 text-sm" />
          <button onClick={() => { if (tagInput.trim()) { addTag(tagInput.trim().toLowerCase()); setTagInput(""); } }} className="text-[var(--color-primary)] text-sm">Add</button>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Message to a reviewer</label>
        <textarea value={course.messageToReviewer} onChange={(e) => updateCourse({ messageToReviewer: e.target.value })} rows={4} className="w-full border rounded px-3 py-2 text-sm mt-2" />
      </div>

      <div>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={course.licenseConfirmed} onChange={(e) => updateCourse({ licenseConfirmed: e.target.checked })} />
          <span className="text-sm"> Any images, sounds, or other assets that are not my own work, have been appropriately licensed...</span>
        </label>
      </div>
    </div>
  );
}
