"use client";
import api from "@/lib/apiClient";
import { motion } from "framer-motion";
import { X, RotateCcw, Clock } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function QuizModal({ quizzes, onClose }) {
  const quiz = quizzes[0];
  const questions = quiz?.questions || [];

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(questions.length * 60); // 1 min per question
  const timerRef = useRef();

  // 🕒 Timer countdown
  useEffect(() => {
    if (submitted) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleSubmit(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [submitted]);

  // 🚫 Detect tab change, minimize, blur, or close
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !submitted) handleSubmit(true);
    };
    const handleBlur = () => {
      if (!submitted) handleSubmit(true);
    };
    const handleBeforeUnload = (e) => {
      if (!submitted) {
        handleSubmit(true);
        e.preventDefault();
        e.returnValue =
          "⚠️ Your quiz will be auto-submitted if you leave or reload.";
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [submitted]);

  // 🧭 Helpers
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // ✅ Multi-select MCQ toggle
  const handleSelect = (qIdx, optIdx) => {
    if (submitted) return;
    const prev = answers[qIdx]?.selected || [];
    const alreadySelected = prev.includes(optIdx);
    const updated = alreadySelected
      ? prev.filter((i) => i !== optIdx)
      : [...prev, optIdx];

    setAnswers((a) => ({
      ...a,
      [qIdx]: { type: "mcq", selected: updated },
    }));
  };

  // ✍️ Short-answer
  const handleShort = (qIdx, val) => {
    if (submitted) return;
    setAnswers((a) => ({
      ...a,
      [qIdx]: { type: "short", text: val },
    }));
  };

  // ✅ Submit quiz (manual or auto)
  const handleSubmit = async (auto = false) => {
    clearInterval(timerRef.current);
    let total = 0;

    questions.forEach((q, i) => {
      if (q.type === "mcq") {
        const selected = answers[i]?.selected || [];
        const correctIndexes = q.options
          .map((o, idx) => (o.isCorrect ? idx : null))
          .filter((x) => x !== null);
        const isCorrect =
          selected.length === correctIndexes.length &&
          selected.every((s) => correctIndexes.includes(s));
        if (isCorrect) total += q.perCorrectPoint;
      }

      if (q.type === "short" && answers[i]?.text?.trim())
        total += q.perCorrectPoint;
    });

    // 🔥 Build JSON Payload
    const submissionData = {
      quizId: quiz?._id,
      answers: Object.values(answers),
    };
    console.log("📤 Quiz Submission JSON:", submissionData);
    const quizeSubmitRes = await api.post(`/quizzes/submit`, submissionData);
    console.log("Quiz submission response:", quizeSubmitRes);
    
    setScore(quizeSubmitRes.data?.data?.pointsAwarded || 0);
    setSubmitted(true);
    if (auto)
      alert("⏰ Quiz auto-submitted — you left or minimized the tab!");
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setTimeLeft(questions.length * 60);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {/* Close */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={() => {
            if (!submitted) handleSubmit(true);
            onClose();
          }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-[var(--color-text)]">
            {quiz?.title}
          </h2>
          {!submitted && (
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1">
              <Clock size={16} className="text-[var(--color-primary)]" />
              <span className="text-sm font-medium">
                {formatTime(timeLeft)}
              </span>
            </div>
          )}
        </div>

        {/* Warning */}
        {!submitted && (
          <div className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-md p-2 mb-4">
            ⚠️ Leaving or minimizing this tab will automatically submit your
            quiz. Stay focused until submission!
          </div>
        )}

        {/* Progress Bar */}
        {!submitted && (
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6 overflow-hidden">
            <motion.div
              className="h-2 bg-[var(--color-primary)]"
              animate={{
                width: `${
                  ((questions.length * 60 - timeLeft) /
                    (questions.length * 60)) *
                  100
                }%`,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        )}

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((q, qIdx) => (
            <div
              key={qIdx}
              className="border border-gray-200 rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition bg-white"
            >
              <p className="font-medium text-gray-800 text-sm mb-2">
                {qIdx + 1}. {q.prompt}
                <span className="text-[10px] uppercase text-gray-400 ml-2">
                  ({q.type})
                </span>
              </p>

              {/* ✅ Multi-select MCQ */}
              {q.type === "mcq" && (
                <ul className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const selected =
                      answers[qIdx]?.selected?.includes(optIdx) || false;
                    const correct = submitted && opt.isCorrect;
                    return (
                      <li
                        key={optIdx}
                        onClick={() => handleSelect(qIdx, optIdx)}
                        className={`px-4 py-2 border rounded-lg text-sm cursor-pointer transition 
                          ${
                            selected && !submitted
                              ? "bg-[var(--color-primary)] text-white"
                              : "hover:bg-gray-50"
                          }
                          ${
                            submitted
                              ? correct
                                ? "bg-green-100 border-green-400 text-green-700"
                                : selected
                                ? "bg-red-100 border-red-400 text-red-700"
                                : "border-gray-200"
                              : "border-gray-200"
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selected}
                            readOnly
                            className="w-4 h-4 accent-[var(--color-primary)]"
                          />
                          {opt.text}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}

              {/* ✍️ Short-answer */}
              {q.type === "short" && (
                <textarea
                  placeholder="Type your answer..."
                  rows={2}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                  value={answers[qIdx]?.text || ""}
                  disabled={submitted}
                  onChange={(e) => handleShort(qIdx, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-between items-center">
          {submitted ? (
            <div className="flex items-center gap-3">
              <p className="text-lg font-semibold text-green-600">
                Your MCQ Score: {score}
              </p>
              <button
                onClick={handleRetry}
                className="flex items-center gap-2 text-[var(--color-primary)] border border-[var(--color-primary)] px-4 py-2 rounded-lg hover:bg-[var(--color-primary)] hover:text-white transition"
              >
                <RotateCcw size={16} />
                Retry Quiz
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleSubmit(false)}
              className="px-6 py-2.5 rounded-lg text-white font-medium shadow-md hover:opacity-90"
              style={{ background: "var(--color-primary)" }}
            >
              Submit Quiz
            </button>
          )}

          <button
            onClick={() => {
              if (!submitted) handleSubmit(true);
              onClose();
            }}
            className="text-xs text-gray-500 hover:underline"
          >
            Exit Quiz
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
