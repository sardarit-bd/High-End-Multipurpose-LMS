
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit } from "lucide-react";

export default function QuizQuestionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "Which of the following is a principle of UX design?",
      options: [
        { text: "Minimalistic Design", correct: false },
        { text: "User-Centered Design", correct: true },
        { text: "Gradient Usage", correct: false },
        { text: "Typography Hierarchy", correct: false },
      ],
    },
    {
      id: 2,
      title: "Which tool is commonly used for wireframing?",
      options: [
        { text: "Adobe Photoshop", correct: false },
        { text: "Figma", correct: true },
        { text: "Visual Studio Code", correct: false },
        { text: "GitHub", correct: false },
      ],
    },
  ]);

  const [newQuestion, setNewQuestion] = useState({
    question: "",
    type: "",
    choices: [{ text: "", correct: false }],
  });

  const handleAddChoice = () => {
    setNewQuestion({
      ...newQuestion,
      choices: [...newQuestion.choices, { text: "", correct: false }],
    });
  };

  const handleRemoveChoice = (index) => {
    setNewQuestion({
      ...newQuestion,
      choices: newQuestion.choices.filter((_, i) => i !== index),
    });
  };

  const handleChoiceChange = (index, value) => {
    const updated = [...newQuestion.choices];
    updated[index].text = value;
    setNewQuestion({ ...newQuestion, choices: updated });
  };

  const toggleCorrect = (index) => {
    const updated = newQuestion.choices.map((c, i) => ({
      ...c,
      correct: i === index,
    }));
    setNewQuestion({ ...newQuestion, choices: updated });
  };

  const addQuestion = () => {
    if (!newQuestion.question.trim()) return;
    setQuestions([
      ...questions,
      { id: Date.now(), title: newQuestion.question, options: newQuestion.choices },
    ]);
    setIsModalOpen(false);
    setNewQuestion({ question: "", type: "", choices: [{ text: "", correct: false }] });
  };

  return (
    <div className="p-6 text-[var(--color-text)]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Information About UI/UX Design Degree</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[var(--color-primary,#ff3d60)] text-white px-4 py-2 rounded-full hover:opacity-90 transition"
        >
          + Add Question
        </button>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((q) => (
          <div
            key={q.id}
            className="bg-white border rounded-lg p-4 shadow-sm transition hover:shadow-md"
          >
            <div className="flex justify-between items-start">
              <p className="font-medium">{q.title}</p>
              <div className="flex gap-2">
                <Edit size={18} className="text-gray-500 hover:text-[var(--color-primary)] cursor-pointer" />
                <Trash2 size={18} className="text-gray-500 hover:text-red-500 cursor-pointer" />
              </div>
            </div>

            <div className="mt-3 space-y-2">
              {q.options.map((opt, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <input
                    type="radio"
                    checked={opt.correct}
                    readOnly
                    className="text-[var(--color-primary,#ff3d60)] focus:ring-[var(--color-primary,#ff3d60)]"
                  />
                  {opt.text}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Question Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6"
            >
              <h3 className="text-lg font-semibold mb-4">Add New Question</h3>

              {/* Question Input */}
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Question *</label>
                <input
                  type="text"
                  value={newQuestion.question}
                  onChange={(e) =>
                    setNewQuestion({ ...newQuestion, question: e.target.value })
                  }
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary,#ff3d60)]"
                />
              </div>

              {/* Question Type */}
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Question Type *</label>
                <select
                  value={newQuestion.type}
                  onChange={(e) =>
                    setNewQuestion({ ...newQuestion, type: e.target.value })
                  }
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary,#ff3d60)]"
                >
                  <option value="">Select</option>
                  <option value="single">Single Choice</option>
                  <option value="multiple">Multiple Choice</option>
                </select>
              </div>

              {/* Answers Section */}
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Answers</label>
                <div className="space-y-2">
                  {newQuestion.choices.map((choice, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={choice.text}
                        onChange={(e) => handleChoiceChange(index, e.target.value)}
                        placeholder={`Choice ${index + 1}`}
                        className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary,#ff3d60)]"
                      />
                      <button
                        onClick={() => toggleCorrect(index)}
                        className={`text-sm px-2 py-1 rounded-md ${
                          choice.correct
                            ? "bg-[var(--color-primary,#ff3d60)] text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        ✓
                      </button>
                      {newQuestion.choices.length > 1 && (
                        <Trash2
                          size={18}
                          className="text-gray-500 hover:text-red-500 cursor-pointer"
                          onClick={() => handleRemoveChoice(index)}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleAddChoice}
                  className="text-[var(--color-primary,#ff3d60)] text-sm mt-2 flex items-center gap-1"
                >
                  <Plus size={14} /> Add New
                </button>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={addQuestion}
                  className="px-4 py-2 rounded-md bg-[var(--color-primary,#ff3d60)] text-white hover:opacity-90"
                >
                  Add Question
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
