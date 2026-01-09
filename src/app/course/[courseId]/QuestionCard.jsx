"use client";
import React, { useState } from "react";
import { CheckCircle, Circle, HelpCircle, FileText, Target, AlertCircle, Clock, TrendingUp, ChevronRight } from "lucide-react";

export default function QuestionCard({ question, index, showAnswer = false, timeLimit, difficulty }) {
  const { prompt, type, options, explanation, points = 1 } = question;
  const [selectedOption, setSelectedOption] = useState(null);
  const [shortAnswer, setShortAnswer] = useState("");

  const getQuestionIcon = (type) => {
    switch (type) {
      case "mcq":
        return <CheckCircle className="w-4 h-4" />;
      case "short":
        return <FileText className="w-4 h-4" />;
      case "truefalse":
        return <Target className="w-4 h-4" />;
      default:
        return <HelpCircle className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "mcq":
        return "from-blue-500 to-cyan-500";
      case "short":
        return "from-emerald-500 to-green-500";
      case "truefalse":
        return "from-amber-500 to-orange-500";
      default:
        return "from-gray-500 to-gray-700";
    }
  };

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "hard":
        return "bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border-red-200";
      case "medium":
        return "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 border-amber-200";
      case "easy":
        return "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-200";
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-gray-300";
    }
  };

  const getDifficultyText = (difficulty) => {
    return difficulty?.charAt(0).toUpperCase() + difficulty?.slice(1) || "Medium";
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 p-6 mb-4 group hover:shadow-xl transition-all duration-300">
      {/* Question Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          {/* Question Number */}
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getTypeColor(type)} flex items-center justify-center text-white font-bold shadow-md`}>
            {index + 1}
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getTypeColor(type)} text-white`}>
                {getQuestionIcon(type)}
                {type.toUpperCase()}
              </span>
              
              {difficulty && (
                <span className={`px-2 py-1 text-xs rounded-full border ${getDifficultyBadge(difficulty)}`}>
                  {getDifficultyText(difficulty)}
                </span>
              )}
              
              {points && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 text-xs font-medium rounded-full">
                  <Target className="w-3 h-3" />
                  {points} point{points !== 1 ? 's' : ''}
                </span>
              )}
            </div>
            
            {timeLimit && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                Suggested time: {timeLimit} min
              </div>
            )}
          </div>
        </div>
        
        {/* Stats (if available) */}
        <div className="hidden md:flex items-center gap-3">
          {question.attempts && (
            <div className="text-center">
              <div className="text-xs text-gray-500">Attempts</div>
              <div className="text-sm font-bold text-gray-900">{question.attempts}</div>
            </div>
          )}
          
          {question.successRate && (
            <div className="text-center">
              <div className="text-xs text-gray-500">Success Rate</div>
              <div className="text-sm font-bold text-gray-900 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {question.successRate}%
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Question Prompt */}
      <div className="mb-6">
        <p className="text-base font-medium text-gray-900 leading-relaxed">
          {prompt}
        </p>
        
        {/* Hint */}
        {question.hint && (
          <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-700">{question.hint}</p>
            </div>
          </div>
        )}
      </div>

      {/* Options/Answer Input */}
      {type === "mcq" && options && (
        <div className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {options?.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = opt.isCorrect;
              const showCorrect = showAnswer && isCorrect;
              const showIncorrect = showAnswer && isSelected && !isCorrect;
              
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedOption(idx)}
                  disabled={showAnswer}
                  className={`p-4 rounded-xl text-left transition-all duration-300 flex items-start gap-3 group/option ${
                    isSelected
                      ? showCorrect
                        ? "bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-300"
                        : showIncorrect
                          ? "bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300"
                          : "bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300"
                      : "bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md"
                  } ${!showAnswer && "hover:-translate-y-0.5"}`}
                >
                  {/* Option Letter */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                    isSelected
                      ? showCorrect
                        ? "bg-gradient-to-br from-emerald-500 to-green-500 text-white"
                        : showIncorrect
                          ? "bg-gradient-to-br from-red-500 to-pink-500 text-white"
                          : "bg-gradient-to-br from-blue-500 to-cyan-500 text-white"
                      : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700"
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  
                  {/* Option Text */}
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      isSelected
                        ? showCorrect ? "text-emerald-800" : showIncorrect ? "text-red-800" : "text-blue-800"
                        : "text-gray-700"
                    }`}>
                      {opt.text}
                    </p>
                    
                    {/* Option Explanation */}
                    {opt.explanation && showAnswer && (
                      <p className="text-xs text-gray-600 mt-1">{opt.explanation}</p>
                    )}
                  </div>
                  
                  {/* Status Icons */}
                  <div className="flex-shrink-0">
                    {showCorrect && (
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    )}
                    {showIncorrect && (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                    {isSelected && !showAnswer && (
                      <Circle className="w-5 h-5 text-blue-500 fill-blue-500" />
                    )}
                    {!isSelected && !showAnswer && (
                      <Circle className="w-5 h-5 text-gray-300" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          
          {/* Selection Feedback */}
          {selectedOption !== null && !showAnswer && (
            <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-700 font-medium">
                You selected option {String.fromCharCode(65 + selectedOption)}. Click "Show Answer" to check if you're correct.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Short Answer Input */}
      {type === "short" && (
        <div className="space-y-4">
          <div className="relative">
            <textarea
              value={shortAnswer}
              onChange={(e) => setShortAnswer(e.target.value)}
              placeholder="Type your answer here..."
              rows={3}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-300 text-sm bg-white"
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-500">
              {shortAnswer.length}/500 characters
            </div>
          </div>
          
          {/* Sample Answer (when showing answer) */}
          {showAnswer && question.sampleAnswer && (
            <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
              <div className="flex items-start gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm font-medium text-emerald-800">Sample Answer:</p>
              </div>
              <p className="text-sm text-gray-700 ml-6">{question.sampleAnswer}</p>
            </div>
          )}
        </div>
      )}

      {/* True/False Options */}
      {type === "truefalse" && (
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setSelectedOption(0)}
            className={`flex-1 p-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
              selectedOption === 0
                ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg"
                : "bg-white border border-gray-200 hover:border-emerald-300 hover:shadow-md"
            } ${!showAnswer && "hover:-translate-y-0.5"}`}
          >
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">True</span>
          </button>
          <button
            onClick={() => setSelectedOption(1)}
            className={`flex-1 p-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
              selectedOption === 1
                ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
                : "bg-white border border-gray-200 hover:border-red-300 hover:shadow-md"
            } ${!showAnswer && "hover:-translate-y-0.5"}`}
          >
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">False</span>
          </button>
        </div>
      )}

      {/* Explanation (when showing answer) */}
      {showAnswer && explanation && (
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
          <div className="flex items-start gap-2 mb-2">
            <HelpCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm font-medium text-blue-800">Explanation:</p>
          </div>
          <p className="text-sm text-gray-700 ml-6">{explanation}</p>
        </div>
      )}

      {/* Actions */}
      <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-xs text-gray-500">
          Question {index + 1} of {question.totalQuestions || "?"}
        </div>
        
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium">
            Flag Question
          </button>
          {!showAnswer && (
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm font-medium flex items-center gap-2">
              Check Answer
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}