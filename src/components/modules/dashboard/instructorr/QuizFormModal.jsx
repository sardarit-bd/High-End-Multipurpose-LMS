"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Save, X, PlusCircle, Trash2 } from "lucide-react";
import { useSaveQuiz } from "@/hooks/useQuiz";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function QuizFormModal({ open, onClose, unitId, quiz }) {
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      title: "",
      type: "mcq",
      questions: [{ question: "", options: ["", "", "", ""], correctAnswer: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const saveQuiz = useSaveQuiz();

  useEffect(() => {
    if (quiz) reset(quiz);
    else
      reset({
        title: "",
        type: "mcq",
        questions: [{ question: "", options: ["", "", "", ""], correctAnswer: "" }],
      });
  }, [quiz, reset]);

  const onSubmit = (data) => {
    const payload = { ...data, unit: unitId };
    if (quiz?._id) payload._id = quiz._id;
    saveQuiz.mutate(payload);
    onClose();
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-[var(--radius-card)] w-full max-w-2xl p-6 shadow-[var(--shadow-medium)] overflow-y-auto max-h-[90vh]"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[var(--color-secondary)]">
                {quiz ? "Edit Quiz" : "Add Quiz"}
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-[var(--color-text)]">
              <label className="block text-sm font-semibold">
                Title
                <input
                  {...register("title", { required: true })}
                  placeholder="Quiz title"
                  className="w-full border border-gray-300 rounded-[var(--radius-default)] px-3 py-2 mt-1"
                />
              </label>

              <label className="block text-sm font-semibold">
                Type
                <select
                  {...register("type")}
                  className="w-full border border-gray-300 rounded-[var(--radius-default)] px-3 py-2 mt-1"
                >
                  <option value="mcq">Multiple Choice</option>
                  <option value="truefalse">True / False</option>
                  <option value="short">Short Answer</option>
                </select>
              </label>

              {/* Questions */}
              <div className="space-y-6">
                {fields.map((field, i) => (
                  <div
                    key={field.id}
                    className="border border-gray-200 rounded-[var(--radius-default)] p-4 relative"
                  >
                    <button
                      type="button"
                      onClick={() => remove(i)}
                      className="absolute top-2 right-2 text-rose-500 hover:text-rose-600"
                    >
                      <Trash2 size={18} />
                    </button>

                    <label className="block text-sm font-semibold">
                      Question {i + 1}
                      <input
                        {...register(`questions.${i}.question`, { required: true })}
                        placeholder="Enter question text"
                        className="w-full border border-gray-300 rounded-[var(--radius-default)] px-3 py-2 mt-1"
                      />
                    </label>

                    <div className="grid grid-cols-2 gap-2 mt-3">
                      {["A", "B", "C", "D"].map((opt, j) => (
                        <input
                          key={j}
                          {...register(`questions.${i}.options.${j}`)}
                          placeholder={`Option ${opt}`}
                          className="w-full border border-gray-300 rounded-[var(--radius-default)] px-3 py-2"
                        />
                      ))}
                    </div>

                    <label className="block text-sm font-semibold mt-3">
                      Correct Answer
                      <input
                        {...register(`questions.${i}.correctAnswer`)}
                        placeholder="Enter exact correct option text"
                        className="w-full border border-gray-300 rounded-[var(--radius-default)] px-3 py-2 mt-1"
                      />
                    </label>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    append({ question: "", options: ["", "", "", ""], correctAnswer: "" })
                  }
                  className="flex items-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-semibold"
                >
                  <PlusCircle size={16} /> Add Question
                </button>
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white py-3 rounded-[var(--radius-default)] font-semibold"
              >
                <Save size={18} /> Save Quiz
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
