"use client";
import React from "react";

export default function QuestionCard({ question }) {
  const { prompt, type, options } = question;

  return (
    <div className="border rounded-lg px-3 py-2 my-2 bg-white shadow-sm">
      <p className="font-medium text-sm mb-1">
        {prompt}
        <span className="ml-2 text-[10px] uppercase tracking-wide text-gray-400">
          ({type})
        </span>
      </p>

      {/* Render MCQ options */}
      {type === "mcq" && (
        <ul className="ml-3 space-y-1">
          {options?.map((opt, idx) => (
            <li
              key={idx}
              className={`px-2 py-1 rounded-md text-sm ${
                opt.isCorrect
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {opt.text}
            </li>
          ))}
        </ul>
      )}

      {/* Render short-answer */}
      {type === "short" && (
        <div className="mt-2">
          <input
            type="text"
            placeholder="Write your answer..."
            className="w-full border border-gray-200 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
          />
        </div>
      )}
    </div>
  );
}
