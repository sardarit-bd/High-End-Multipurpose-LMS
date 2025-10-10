"use client";

import { Plus, Trash2, List } from "lucide-react";
import { useState } from "react";
import { useCourseStore } from "@/store/useCourseStore";
import TopicModal from "./TopicModal";
import LessonModal from "./LessionModal";

export default function Step3Curriculum() {
  const course = useCourseStore((s) => s.course);
  const deleteTopic = useCourseStore((s) => s.deleteTopic);
  const deleteLesson = useCourseStore((s) => s.deleteLesson);

  const [showTopicModal, setShowTopicModal] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [currentTopicId, setCurrentTopicId] = useState(null);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Curriculum</h3>
        <button onClick={() => setShowTopicModal(true)} className="bg-[var(--color-secondary)] text-white px-3 py-2 rounded text-sm flex items-center gap-2">
          <Plus size={14} /> Add New Topic
        </button>
      </div>

      <div className="space-y-3">
        {course.topics.length === 0 && <div className="text-sm text-gray-500">No topics yet. Add one to start building curriculum.</div>}

        {course.topics.map((t) => (
          <div key={t.id} className="border rounded p-4 bg-white">
            <div className="flex justify-between items-center">
              <div className="font-medium">{t.title}</div>
              <div className="flex items-center gap-2">
                <button onClick={() => { setCurrentTopicId(t.id); setShowLessonModal(true); }} className="text-sm bg-[var(--color-secondary)] text-white px-3 py-1 rounded">Add Lesson</button>
                <button onClick={() => deleteTopic(t.id)} className="text-red-500"><Trash2 size={16} /></button>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              {t.lessons.length === 0 && <div className="text-sm text-gray-500">No lessons yet.</div>}
              {t.lessons.map((l) => (
                <div key={l.id} className="flex items-center justify-between border rounded px-3 py-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${l.free ? "bg-[var(--color-primary)] text-white" : "bg-gray-200 text-gray-700"}`}>
                      <List size={14} />
                    </div>
                    <div>
                      <div className="font-medium">{l.title}</div>
                      <div className="text-xs text-gray-500">{l.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => deleteLesson(t.id, l.id)} className="text-red-500"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showTopicModal && <TopicModal onClose={() => setShowTopicModal(false)} />}
      {showLessonModal && <LessonModal onClose={() => setShowLessonModal(false)} topicId={currentTopicId} />}
    </div>
  );
}
