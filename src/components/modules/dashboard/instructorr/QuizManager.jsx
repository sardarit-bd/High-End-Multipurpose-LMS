"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Edit, HelpCircle } from "lucide-react";
import { useQuizzes } from "@/hooks/useQuiz";
import QuizFormModal from "./QuizFormModal";

export default function QuizManager({ unitId }) {
  const { data: quizzes = [], isLoading } = useQuizzes(unitId);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1.5fr] gap-6">
      {/* Left: Quiz list */}
      <div className="bg-white p-5 rounded-[var(--radius-card)] shadow-[var(--shadow-medium)]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-[var(--color-secondary)] flex items-center gap-2">
            <HelpCircle size={18} /> Quizzes
          </h2>
          <button
            onClick={() => {
              setSelectedQuiz(null);
              setShowModal(true);
            }}
            className="flex items-center gap-1 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-semibold text-sm"
          >
            <PlusCircle size={16} /> Add
          </button>
        </div>

        {isLoading ? (
          <p className="text-sm text-gray-500">Loading quizzes...</p>
        ) : quizzes.length ? (
          <div className="space-y-2">
            {quizzes.map((q) => (
              <button
                key={q._id}
                onClick={() => setSelectedQuiz(q)}
                className={`block w-full text-left px-4 py-2 rounded-[var(--radius-default)] ${
                  selectedQuiz?._id === q._id
                    ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                {q.title}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm italic">No quizzes yet.</p>
        )}
      </div>

      {/* Right: Preview */}
      <div className="bg-white p-5 rounded-[var(--radius-card)] shadow-[var(--shadow-medium)]">
        {selectedQuiz ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[var(--color-text)]">
                {selectedQuiz.title}
              </h2>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-1 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
              >
                <Edit size={16} /> Edit
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-2 italic">
              Type: {selectedQuiz.type || "MCQ"}
            </p>

            <div className="space-y-3">
              {selectedQuiz.questions?.map((q, i) => (
                <div
                  key={i}
                  className="border border-gray-200 p-3 rounded-[var(--radius-default)]"
                >
                  <p className="font-medium mb-2 text-[var(--color-text)]">
                    {i + 1}. {q.question}
                  </p>
                  {q.options?.length > 0 && (
                    <ul className="ml-4 space-y-1 text-sm">
                      {q.options.map((opt, j) => (
                        <li
                          key={j}
                          className={`${
                            opt === q.correctAnswer
                              ? "text-[var(--color-primary)] font-semibold"
                              : "text-gray-600"
                          }`}
                        >
                          {opt}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-500 italic text-center py-20">
            Select a quiz to preview or click “Add Quiz”.
          </p>
        )}
      </div>

      {/* Popup modal */}
      <QuizFormModal
        open={showModal}
        onClose={() => setShowModal(false)}
        unitId={unitId}
        quiz={selectedQuiz}
      />
    </div>
  );
}
