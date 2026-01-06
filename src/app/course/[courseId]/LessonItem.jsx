"use client";
import { PlayCircle } from "lucide-react";

export default function LessonItem({ lesson, currentLesson, setCurrentLesson }) {
  const isActive = currentLesson?._id === lesson._id;

  return (
    <li className="p-1">
      <button
        onClick={() => setCurrentLesson(lesson)}
        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition ${
          isActive ? "text-white" : "hover:bg-white/70 text-[var(--color-text)]"
        }`}
        style={{
          background: isActive ? "var(--color-primary)" : "transparent",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <span className="flex items-center gap-2">
          <PlayCircle size={16} className={isActive ? "opacity-90" : "opacity-70"} />
          <span className="text-sm">{lesson?.title}</span>
        </span>
        <span className="text-xs opacity-80">{lesson?.contentType}</span>
      </button>
    </li>
  );
}
