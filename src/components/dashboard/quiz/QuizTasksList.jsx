"use client";
import React from "react";
import QuizTaskCard from "./QuizTaskCard";
import { Loader2, FileText, AlertCircle } from "lucide-react";

const QuizTasksList = ({
  quizTasks,
  loading,
  expandedQuiz,
  questions,
  onToggleExpand,
  onAddQuestion,
  onEditQuestion,
  onDeleteQuestion,
}) => {
  if (loading) {
    return (
      <div className="py-16 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]">
          <Loader2 className="w-12 h-12 text-[var(--color-primary)]" />
        </div>
        <p className="mt-4 text-[var(--color-text)]/70">Loading quiz tasks...</p>
      </div>
    );
  }

  if (quizTasks.length === 0) {
    return (
      <div className="py-16 text-center bg-gradient-to-br from-gray-50 to-emerald-50/30 rounded-2xl border border-dashed border-emerald-200">
        <div className="inline-block p-4 bg-emerald-100 rounded-full mb-4">
          <FileText className="w-8 h-8 text-emerald-500" />
        </div>
        <h3 className="text-lg font-medium text-[var(--color-text)] mb-2">No Quiz Tasks Found</h3>
        <p className="text-[var(--color-text)]/70 max-w-md mx-auto">
          Create quiz tasks in your selected unit to start managing questions and assessments.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      <div className="grid grid-cols-1 gap-4">
        {quizTasks.map((task, index) => (
          <div
            key={task._id}
            className="animate-in fade-in slide-in-from-bottom-3 mb-4"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <QuizTaskCard
              task={task}
              isExpanded={expandedQuiz === task._id}
              questions={questions}
              onToggleExpand={() => onToggleExpand(task)}
              onAddQuestion={onAddQuestion}
              onEditQuestion={onEditQuestion}
              onDeleteQuestion={onDeleteQuestion}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizTasksList;