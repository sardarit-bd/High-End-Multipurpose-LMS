"use client";
import React from "react";
import { Plus, Sparkles, ListOrdered, Award } from "lucide-react";
import QuestionItem from "./QuestionItem";

const QuestionList = ({
    questions,
    task,
    onAddQuestion,
    onEditQuestion,
    onDeleteQuestion,
}) => {
    return (
        <button
            onClick={() => onAddQuestion(task)}
            className="group flex items-center gap-2 bg-gradient-to-r from-[var(--color-primary)] to-emerald-500 hover:from-[var(--color-primary-hover)] hover:to-emerald-600 text-white px-4 py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            <span>Add New Question</span>
        </button>
    );
};

const QuestionsDisplay = ({
    questions,
    task,
    onEditQuestion,
    onDeleteQuestion,
}) => {
    if (questions.length === 0) {
        return (
            <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-emerald-50/30 rounded-2xl border border-dashed border-emerald-200">
                <div className="inline-block p-4 bg-emerald-100 rounded-full mb-4">
                    <Award className="w-8 h-8 text-emerald-500" />
                </div>
                <h5 className="font-medium text-gray-900 mb-2">No Questions Added Yet</h5>
                <p className="text-gray-600 text-sm max-w-md mx-auto mb-6">
                    Start building your quiz by adding questions. Each question will help assess student understanding.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <Sparkles className="w-4 h-4" />
                    <span>Click "Add New Question" to begin</span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-blue-100 rounded-lg">
                        <ListOrdered className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-900">
                        {questions.length} Question{questions.length !== 1 ? 's' : ''}
                    </span>
                </div>
                <div className="text-sm text-gray-500">
                    Total Points: {questions.reduce((acc, q) => acc + (q.perCorrectPoint || 0), 0)}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {questions.map((question, idx) => (
                    <div
                        key={question._id}
                        className="animate-in fade-in slide-in-from-bottom-2"
                        style={{ animationDelay: `${idx * 50}ms` }}
                    >
                        <QuestionItem
                            question={question}
                            index={idx}
                            onEdit={(q) => onEditQuestion(task, q)}
                            onDelete={onDeleteQuestion}
                            taskId={task._id}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export { QuestionList, QuestionsDisplay };