"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";

const QuizPage = () => {
  const [showModal, setShowModal] = useState(false);

  const quizzes = [
    {
      id: 1,
      title: "Information About UI/UX Design Degree",
      questions: 25,
      duration: "30 Minutes",
    },
    {
      id: 2,
      title: "Learn JavaScript and Express to become a Expert",
      questions: 15,
      duration: "25 Minutes",
    },
    {
      id: 3,
      title: "Introduction to Python Programming",
      questions: 22,
      duration: "15 Minutes",
    },
    {
      id: 4,
      title: "Build Responsive Websites with HTML5 and CSS3",
      questions: 30,
      duration: "50 Minutes",
    },
    {
      id: 5,
      title: "Information About Photoshop Design Degree",
      questions: 20,
      duration: "20 Minutes",
    },
  ];

  return (
    <div className="p-6 text-[var(--color-text)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Quiz</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-full font-medium hover:opacity-90 transition"
        >
          + Add Quiz
        </button>
      </div>

      {/* Quiz List */}
      <div className="space-y-4">
        {quizzes.map((q) => (
          <div
            key={q.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between bg-white shadow-sm border border-gray-100 p-4 rounded-lg"
          >
            <div>
              <div className="font-semibold">{q.title}</div>
              <div className="text-sm text-gray-500 flex gap-4 mt-1">
                <span>📝 {q.questions} Questions</span>
                <span>⏰ {q.duration}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-3 sm:mt-0">
              <button className="text-blue-600 text-sm font-medium hover:underline">
                <Link href="quize-results/slug" >View Results</Link>
              </button>
              <Edit size={18} className="cursor-pointer text-gray-600 hover:text-[var(--color-primary)]" />
              <Trash2 size={18} className="cursor-pointer text-gray-600 hover:text-red-500" />
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-xl w-[95%] max-w-2xl p-6 relative"
            >
              <h3 className="text-lg font-semibold mb-4">Add New Quiz</h3>

              <form className="space-y-4">
                {/* Course */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full border rounded-md px-3 py-2 text-sm focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]">
                    <option>Select</option>
                    <option>UI/UX Design</option>
                    <option>JavaScript Development</option>
                    <option>Python Programming</option>
                  </select>
                </div>

                {/* Quiz Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quiz Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Quiz Title"
                    className="w-full border rounded-md px-3 py-2 text-sm focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                  />
                </div>

                {/* Row: Questions + Marks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      No of Questions <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 20"
                      className="w-full border rounded-md px-3 py-2 text-sm focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Marks <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 100"
                      className="w-full border rounded-md px-3 py-2 text-sm focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                    />
                  </div>
                </div>

                {/* Row: Pass Mark + Duration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pass Mark <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 40"
                      className="w-full border rounded-md px-3 py-2 text-sm focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 30 Minutes"
                      className="w-full border rounded-md px-3 py-2 text-sm focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-[var(--color-primary)] text-white font-medium hover:opacity-90"
                  >
                    Add Quiz
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizPage;
