"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Plus, Award, Clock, FileText, Users, Sparkles } from "lucide-react";
import { QuestionList, QuestionsDisplay } from "./QuestionList";

const QuizTaskCard = ({
  task,
  isExpanded,
  questions,
  onToggleExpand,
  onAddQuestion,
  onEditQuestion,
  onDeleteQuestion,
}) => {
  const taskQuestions = questions[task.quizId?._id] || [];
  const totalMarks = taskQuestions.reduce(
    (acc, q) => acc + (q.perCorrectPoint || 0),
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.005 }}
      className={`rounded-2xl border transition-all duration-300 overflow-hidden mx-4 ${
        isExpanded
          ? "bg-gradient-to-br from-white to-blue-50/30 border-blue-200 shadow-lg"
          : "bg-white/95 backdrop-blur-sm border-emerald-100 shadow-[var(--shadow-soft)] hover:shadow-md"
      }`}
    >
      {/* Task header */}
      <div
        onClick={onToggleExpand}
        className="p-6 cursor-pointer transition-all hover:bg-emerald-50/30"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${isExpanded ? 'bg-gradient-to-br from-blue-100 to-blue-200' : 'bg-gradient-to-br from-emerald-100 to-emerald-200'}`}>
              <FileText className={`w-6 h-6 ${isExpanded ? 'text-blue-600' : 'text-[var(--color-primary)]'}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-lg text-gray-900">{task.title || "Untitled Quiz"}</h3>
                {task.dueDate && (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${new Date(task.dueDate) > new Date()
                      ? "bg-amber-100 text-amber-700"
                      : "bg-rose-100 text-rose-700"
                    }`}>
                    <Clock className="w-3 h-3 inline mr-1" />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">{task.description}</p>
              
              <div className="flex items-center gap-6 mt-3">
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {task.maxPoints || 0} max points
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {totalMarks} total marks
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {taskQuestions.length} questions
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${isExpanded
                ? "bg-blue-100 text-blue-700"
                : "bg-emerald-100 text-[var(--color-primary)]"
              }`}>
              {task.type || "Quiz"}
            </span>
            <div className={`p-2 rounded-lg ${isExpanded ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-[var(--color-primary)]'}`}>
              {isExpanded ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Accordion: Questions */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border-t border-blue-100 bg-gradient-to-b from-white to-blue-50/20"
          >
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                      <Plus className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">Quiz Questions</h4>
                      <p className="text-sm text-gray-600">Manage questions for this quiz</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    <QuestionList
                  task={task}
                  onAddQuestion={onAddQuestion}
                />
                  </div>
                </div>
                
               
              </div>

              <div className="space-y-4">
                {taskQuestions.length > 0 ? (
                  <QuestionsDisplay
                    questions={taskQuestions}
                    task={task}
                    onEditQuestion={onEditQuestion}
                    onDeleteQuestion={onDeleteQuestion}
                  />
                ) : (
                  <div className="text-center py-8 bg-gradient-to-br from-gray-50 to-purple-50/30 rounded-xl border border-dashed border-purple-200">
                    <div className="inline-block p-4 bg-purple-100 rounded-full mb-3">
                      <FileText className="w-8 h-8 text-purple-400" />
                    </div>
                    <h5 className="font-medium text-gray-900 mb-1">No Questions Added</h5>
                    <p className="text-gray-600 text-sm">Add questions to build your quiz</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuizTaskCard;