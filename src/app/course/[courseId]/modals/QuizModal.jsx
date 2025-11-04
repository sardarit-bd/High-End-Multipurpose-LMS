"use client";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

export default function QuizModal({ quizzes, onClose }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qIdx, optionIdx) => {
    setAnswers({ ...answers, [qIdx]: optionIdx });
  };

  const handleShort = (qIdx, val) => {
    setAnswers({ ...answers, [qIdx]: val });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const quiz = quizzes[0]; // assuming one quiz per unit

  const score = quiz?.questions?.reduce((sum, q, i) => {
    if (q.type === "mcq") {
      const correctIndex = q.options.findIndex((o) => o.isCorrect);
      return sum + (answers[i] === correctIndex ? q.perCorrectPoint : 0);
    }
    return sum;
  }, 0);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-2xl w-full max-w-2xl p-6 relative shadow-xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        <h2 className="text-xl font-semibold mb-3">{quiz?.title}</h2>
        <p className="text-sm text-gray-600 mb-4">Answer the questions below:</p>

        <div className="space-y-5">
          {quiz?.questions?.map((q, qIdx) => (
            <div key={qIdx} className="border rounded-lg p-3">
              <p className="font-medium text-sm mb-2">
                {q.prompt}{" "}
                <span className="text-[10px] uppercase text-gray-400 ml-1">
                  ({q.type})
                </span>
              </p>

              {q.type === "mcq" && (
                <ul className="space-y-1">
                  {q.options.map((opt, optIdx) => (
                    <li
                      key={optIdx}
                      onClick={() => !submitted && handleSelect(qIdx, optIdx)}
                      className={`px-3 py-1 rounded-md cursor-pointer text-sm border ${
                        answers[qIdx] === optIdx
                          ? "bg-[var(--color-primary)] text-white"
                          : "hover:bg-gray-100"
                      } ${
                        submitted && opt.isCorrect
                          ? "border-green-500"
                          : "border-gray-200"
                      }`}
                    >
                      {opt.text}
                    </li>
                  ))}
                </ul>
              )}

              {q.type === "short" && (
                <input
                  type="text"
                  placeholder="Write your answer..."
                  className="w-full border rounded-md px-2 py-1 text-sm"
                  value={answers[qIdx] || ""}
                  disabled={submitted}
                  onChange={(e) => handleShort(qIdx, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>

        {!submitted ? (
          <div className="mt-5 flex justify-end">
            <button
              onClick={handleSubmit}
              className="px-5 py-2 rounded-lg text-white"
              style={{ background: "var(--color-primary)" }}
            >
              Submit Quiz
            </button>
          </div>
        ) : (
          <div className="mt-5 text-center">
            <p className="text-lg font-semibold text-green-600">
              Your score: {score} points 🎉
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
