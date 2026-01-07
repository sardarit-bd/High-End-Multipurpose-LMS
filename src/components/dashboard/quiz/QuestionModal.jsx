"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  Circle,
  Trash2,
  Plus,
  FileText,
  Award,
  Type,
  Hash,
  Sparkles,
  Brain,
  Save,
  Ban
} from "lucide-react";

const QuestionModal = ({
  isOpen,
  isEditing,
  selectedQuiz,
  questionForm,
  onClose,
  onSubmit,
  onFormChange,
  onOptionChange,
  onAddOption,
  onRemoveOption,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.25, type: "spring", damping: 25 }}
            className="bg-gradient-to-br from-white to-emerald-50/30 w-full max-w-2xl rounded-2xl shadow-2xl border border-emerald-100 relative overflow-hidden"
          >
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[var(--color-accent-special)]/10 to-transparent rounded-full -translate-x-12 translate-y-12"></div>

            {/* Header */}
            <div className="relative p-6 border-b border-emerald-100 bg-white/80 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-special)] rounded-xl">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--color-text)]">
                      {isEditing ? "Edit Question" : "Create New Question"}
                    </h3>
                    <p className="text-sm text-[var(--color-text)]/70">
                      {isEditing ? "Update question details" : `Add to "${selectedQuiz?.title || 'Quiz'}"`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="p-6 max-h-[70vh] bg-white overflow-y-auto">
              <form onSubmit={onSubmit} className="space-y-6">
                {/* Question Type */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] mb-3">
                    <div className="p-1.5 bg-blue-100 rounded-lg">
                      <Type className="w-4 h-4 text-blue-600" />
                    </div>
                    Question Type
                  </label>
                  <select
                    name="type"
                    value={questionForm.type}
                    onChange={onFormChange}
                    className="w-full p-3 border border-blue-200 rounded-xl bg-blue-50/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer text-[var(--color-text)]"
                  >
                    <option value="mcq" className="py-2">Multiple Choice (MCQ)</option>
                    <option value="short" className="py-2">Short Answer</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    {questionForm.type === "mcq" 
                      ? "Students select one correct answer from multiple options"
                      : questionForm.type === "short"
                      ? "Students provide brief written answers"
                      : questionForm.type === "truefalse"
                      ? "Students determine if a statement is true or false"
                      : "Students provide detailed written responses"
                    }
                  </p>
                </div>

                {/* Question Text */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] mb-3">
                    <div className="p-1.5 bg-purple-100 rounded-lg">
                      <FileText className="w-4 h-4 text-purple-600" />
                    </div>
                    Question Text
                  </label>
                  <textarea
                    name="prompt"
                    value={questionForm.prompt}
                    onChange={onFormChange}
                    rows={3}
                    placeholder="Enter your question here. Be clear and specific."
                    className="w-full p-3 border border-purple-200 rounded-xl bg-purple-50/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-[var(--color-text)] placeholder-purple-400/50 resize-none"
                  />
                </div>

                {/* MCQ Options */}
                {questionForm.type === "mcq" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] mb-3">
                      <div className="p-1.5 bg-emerald-100 rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)]" />
                      </div>
                      Answer Options
                      <span className="text-xs text-gray-500 ml-auto">
                        {questionForm.options.length} option{questionForm.options.length !== 1 ? 's' : ''}
                      </span>
                    </label>
                    
                    <div className="space-y-3">
                      {questionForm.options.map((option, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${option.isCorrect
                              ? "border-emerald-200 bg-emerald-50/50 ring-1 ring-emerald-100"
                              : "border-gray-200 bg-gray-50/30 hover:bg-gray-50"
                            }`}
                        >
                          <button
                            type="button"
                            onClick={() => onOptionChange(i, "isCorrect", !option.isCorrect)}
                            className={`flex-shrink-0 p-2 rounded-lg ${option.isCorrect
                                ? "bg-emerald-100 text-emerald-600"
                                : "bg-gray-100 text-gray-400 hover:text-gray-600"
                              }`}
                            title={option.isCorrect ? "Correct answer" : "Mark as correct"}
                          >
                            {option.isCorrect ? (
                              <CheckCircle2 size={18} />
                            ) : (
                              <Circle size={18} />
                            )}
                          </button>
                          <div className="flex-1">
                            <div className="text-xs text-gray-500 mb-1">Option {i + 1}</div>
                            <input
                              type="text"
                              value={option.text}
                              onChange={(e) => onOptionChange(i, "text", e.target.value)}
                              placeholder={`Enter option ${i + 1} text`}
                              className="w-full bg-transparent border-none outline-none text-gray-700"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveOption(i)}
                            className="flex-shrink-0 p-2 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Remove option"
                            disabled={questionForm.options.length <= 2}
                          >
                            <Trash2 size={16} />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                    
                    <button
                      type="button"
                      onClick={onAddOption}
                      className="mt-4 flex items-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      Add Another Option
                    </button>
                    
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-sm text-blue-700 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Select the correct answer by clicking the circle next to the option
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Points */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] mb-3">
                    <div className="p-1.5 bg-amber-100 rounded-lg">
                      <Award className="w-4 h-4 text-amber-600" />
                    </div>
                    Points for Correct Answer
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="perCorrectPoint"
                      value={questionForm.perCorrectPoint}
                      onChange={onFormChange}
                      placeholder="e.g., 5"
                      min="0"
                      className="w-full p-3 pl-10 border border-amber-200 rounded-xl bg-amber-50/30 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-[var(--color-text)]"
                    />
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400" size={18} />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Points awarded for a correct answer
                  </p>
                </div>

                {/* Form Actions */}
                <div className="pt-6 border-t border-emerald-100">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Ban className="w-4 h-4" />
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-3 rounded-xl font-medium shadow-lg transition-all flex items-center justify-center gap-2 group bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-special)] hover:from-[var(--color-primary-hover)] hover:to-[var(--color-accent-special)] text-white hover:shadow-xl hover:scale-105"
                    >
                      <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      {isEditing ? 'Update Question' : 'Create Question'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuestionModal;