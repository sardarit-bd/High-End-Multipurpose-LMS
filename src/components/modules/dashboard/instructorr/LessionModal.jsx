
"use client";

import { useState } from "react";
import { useCourseStore } from "@/store/useCourseStore";
import Modal from "@/components/shared/Modal";

export default function LessonModal({ onClose, topicId }) {
    const addLesson = useCourseStore((s) => s.addLesson);
    const [form, setForm] = useState({ title: "", videoUrl: "", description: "", free: true });

    return (
        <Modal title="New Lesson" onClose={onClose}>
            <div className="space-y-3">
                <label className="text-sm">Add Lesson *</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" />

                <label className="text-sm">Video link *</label>
                <input value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" />

                <label className="text-sm">Course Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="w-full border rounded px-3 py-2 text-sm" />

                <div className="flex items-center gap-4">
                    <label className="inline-flex items-center gap-2">
                        <input type="radio" name="lessonFree" checked={form.free === true} onChange={() => setForm({ ...form, free: true })} /> free
                    </label>
                    <label className="inline-flex items-center gap-2">
                        <input type="radio" name="lessonFree" checked={form.free === false} onChange={() => setForm({ ...form, free: false })} /> Premium
                    </label>
                </div>

                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="px-3 py-2 border rounded">Cancel</button>
                    <button
                        onClick={() => {
                            if (!form.title.trim()) return alert("Enter lesson title");
                            addLesson(topicId, form);
                            onClose();
                        }}
                        className="px-3 py-2 bg-[var(--color-primary)] text-white rounded"
                    >
                        Add New
                    </button>
                </div>
            </div>
        </Modal>
    );
}
