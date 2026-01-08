"use client";
import React from "react";
import { Edit3, Trash2, Award, CheckCircle, XCircle, FileText, Clock } from "lucide-react";
import { motion } from "framer-motion";

const QuestionItem = ({ question, index, onEdit, onDelete, taskId }) => {
  const isMCQ = question.type === "mcq";
  const isCorrectOption = (option) => option.isCorrect;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-[var(--shadow-soft)] overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="p-4">
        {/* Question Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${isMCQ ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}>
              {isMCQ ? (
                <FileText className="w-4 h-4" />
              ) : (
                <Award className="w-4 h-4" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-700">
                  {index + 1}
                </span>
                <h4 className="font-semibold text-gray-900 line-clamp-2">
                  {question.prompt}
                </h4>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${isMCQ
                    ? "bg-blue-100 text-blue-700"
                    : "bg-emerald-100 text-emerald-700"
                  }`}>
                  {isMCQ ? "Multiple Choice" : "Other"}
                </span>
                <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                  <Award className="w-3 h-3 text-amber-500" />
                  {question.perCorrectPoint || 0} point{question.perCorrectPoint !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(question)}
              className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              title="Edit Question"
            >
              <Edit3 size={16} />
            </button>
            <button
              onClick={() => onDelete(taskId, question._id)}
              className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
              title="Delete Question"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* MCQ Options */}
        {isMCQ && question.options && question.options.length > 0 && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Options</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {question.options.map((option, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${isCorrectOption(option)
                      ? "bg-emerald-50 border-emerald-200"
                      : "bg-gray-50 border-gray-200"
                    }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isCorrectOption(option)
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-gray-100 text-gray-500"
                    }`}>
                    {String.fromCharCode(65 + i)} {/* A, B, C, D */}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm ${isCorrectOption(option) ? "font-medium text-emerald-800" : "text-gray-700"}`}>
                      {option.text}
                    </p>
                  </div>
                  <div>
                    {isCorrectOption(option) ? (
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                <span className="inline-flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  Correct option{question.options.filter(opt => opt.isCorrect).length !== 1 ? 's' : ''} highlighted
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Non-MCQ Question Details */}
        {!isMCQ && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gray-100 rounded-lg">
                <Clock className="w-3 h-3 text-gray-500" />
              </div>
              <p className="text-xs text-gray-500">
                Open-ended question type
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default QuestionItem;