"use client";

import { useState } from "react";
import { useCourseStore } from "@/store/useCourseStore";
import Modal from "@/components/shared/Modal";

export default function TopicModal({ onClose }) {
  const [title, setTitle] = useState("");
  const addTopic = useCourseStore((s) => s.addTopic);

  return (
    <Modal title="Add New Topic" onClose={onClose}>
      <div className="space-y-3">
        <label className="text-sm">Topic Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded px-3 py-2 text-sm" />
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-3 py-2 border rounded">Cancel</button>
          <button
            onClick={() => {
              if (!title.trim()) return alert("Enter a title");
              addTopic(title.trim());
              onClose();
            }}
            className="px-3 py-2 bg-[var(--color-primary)] text-white rounded"
          >
            Add Topic
          </button>
        </div>
      </div>
    </Modal>
  );
}
