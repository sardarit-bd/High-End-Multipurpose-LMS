"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, CheckCircle2, Circle, X } from "lucide-react";
import api from "@/lib/apiClient"; // your axios instance
import { toast } from "react-toastify";

export default function InstructorQuizBuilder() {
  const [courses, setCourses] = useState([]);
  const [units, setUnits] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [questions, setQuestions] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const [loading, setLoading] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);

  const [quizForm, setQuizForm] = useState({
    courseId: "",
    unitId: "",
    title: "",
    passMark: "",
  });

  const [questionForm, setQuestionForm] = useState({
    type: "mcq",
    prompt: "",
    perCorrectPoint: "",
    options: [{ text: "", isCorrect: false }],
  });

  // ====== FETCH DATA ======
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/courses");
      setCourses(res.data?.data || []);
    } catch {
      toast.error("Failed to load courses");
    }
  };

  const fetchUnits = async (courseId) => {
    try {
      const res = await api.get(`/units/${courseId}`);
      setUnits(res.data?.data || []);
    } catch {
      toast.error("Failed to load units");
    }
  };

  const fetchQuizzes = async (unitId) => {
    if (!unitId) return;
    try {
      setLoading(true);
      const res = await api.get(`/quizzes/${unitId}`);
      setQuizzes(res.data?.data || []);
    } catch {
      toast.error("Failed to load quizzes");
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestions = async (quizId) => {
    try {
      const res = await api.get(`/quizzes/${quizId}/questions`);
      console.log(res.data?.data)
      setQuestions(res.data?.data?.questions || []);
    } catch {
      setQuestions([]);
    }
  };

  // ====== CREATE QUIZ ======
  const handleQuizChange = (e) =>
    setQuizForm({ ...quizForm, [e.target.name]: e.target.value });

  const handleQuizSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/quizzes/create", {
        unitId: quizForm.unitId,
        title: quizForm.title,
        passMark: Number(quizForm.passMark),
      });
      toast.success("Quiz created successfully!");
      setShowQuizModal(false);
      fetchQuizzes(quizForm.unitId);
      setQuizForm({ courseId: "", unitId: "", title: "", passMark: "" });
    } catch {
      toast.error("Failed to create quiz");
    }
  };

  // ====== ADD QUESTION ======
  const handleQuestionChange = (e) =>
    setQuestionForm({ ...questionForm, [e.target.name]: e.target.value });

  const handleOptionChange = (i, key, val) => {
    const newOpts = [...questionForm.options];
    newOpts[i][key] = val;
    setQuestionForm({ ...questionForm, options: newOpts });
  };

  const addOption = () =>
    setQuestionForm({
      ...questionForm,
      options: [...questionForm.options, { text: "", isCorrect: false }],
    });

  const removeOption = (i) => {
    const newOpts = questionForm.options.filter((_, idx) => idx !== i);
    setQuestionForm({ ...questionForm, options: newOpts });
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        quizId: selectedQuiz._id,
        type: questionForm.type,
        prompt: questionForm.prompt,
        options: questionForm.type === "mcq" ? questionForm.options : [],
        perCorrectPoint: Number(questionForm.perCorrectPoint) || 0,
      };
      await api.post("/quizzes/add-question", payload);
      toast.success("Question added!");
      fetchQuestions(selectedQuiz._id);
      setShowQuestionModal(false);
      setQuestionForm({
        type: "mcq",
        prompt: "",
        perCorrectPoint: "",
        options: [{ text: "", isCorrect: false }],
      });
    } catch {
      toast.error("Failed to add question");
    }
  };

  // ====== UI ======
  return (
    <div className="p-6 space-y-6 text-[var(--color-text)]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-[var(--color-secondary)]">
          Instructor Quiz Builder
        </h1>
        <button
          onClick={() => setShowQuizModal(true)}
          className="bg-[var(--color-primary)] text-white px-5 py-2 rounded-md font-medium hover:opacity-90"
        >
          + Create Quiz
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Course</label>
          <select
            className="w-full border rounded-md px-3 py-2 mt-1"
            value={selectedCourse}
            onChange={(e) => {
              setSelectedCourse(e.target.value);
              fetchUnits(e.target.value);
              setSelectedUnit("");
              setQuizzes([]);
            }}
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Unit</label>
          <select
            className="w-full border rounded-md px-3 py-2 mt-1"
            value={selectedUnit}
            onChange={(e) => {
              setSelectedUnit(e.target.value);
              fetchQuizzes(e.target.value);
            }}
          >
            <option value="">Select Unit</option>
            {units.map((u) => (
              <option key={u._id} value={u._id}>
                {u.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quiz List */}
      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="font-semibold text-lg mb-4 text-[var(--color-secondary)]">
          Quizzes for Selected Unit
        </h2>

        {loading ? (
          <p className="text-gray-500 italic">Loading...</p>
        ) : quizzes.length ? (
          <div className="space-y-3">
            {quizzes.map((quiz) => (
              <div
                key={quiz._id}
                className={`border rounded-md p-4 flex justify-between items-center cursor-pointer transition ${
                  selectedQuiz?._id === quiz._id
                    ? "border-[var(--color-primary)] bg-[var(--color-background)]"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div>
                  <div className="font-medium text-base">{quiz.title}</div>
                  <div className="text-sm text-gray-500">
                    Pass Mark: {quiz.passMark}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedQuiz(quiz);
                    fetchQuestions(quiz._id);
                    setShowQuestionModal(true);
                  }}
                  className="flex items-center gap-1 bg-[var(--color-primary)] text-white px-3 py-1.5 rounded-md text-sm"
                >
                  <Plus size={14} /> Add Question
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 italic">No quizzes found.</p>
        )}
      </div>

      {/* Create Quiz Modal */}
      <AnimatePresence>
        {showQuizModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQuizModal(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-md p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[var(--color-secondary)]">
                  Create New Quiz
                </h3>
                <X
                  onClick={() => setShowQuizModal(false)}
                  className="cursor-pointer text-gray-400 hover:text-gray-600"
                />
              </div>

              <form onSubmit={handleQuizSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Course</label>
                  <select
                    name="courseId"
                    value={quizForm.courseId}
                    onChange={(e) => {
                      handleQuizChange(e);
                      fetchUnits(e.target.value);
                    }}
                    className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                  >
                    <option value="">Select Course</option>
                    {courses.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Unit</label>
                  <select
                    name="unitId"
                    value={quizForm.unitId}
                    onChange={handleQuizChange}
                    className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                  >
                    <option value="">Select Unit</option>
                    {units.map((u) => (
                      <option key={u._id} value={u._id}>
                        {u.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Quiz Title</label>
                  <input
                    name="title"
                    value={quizForm.title}
                    onChange={handleQuizChange}
                    placeholder="Enter quiz title"
                    className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Pass Mark</label>
                  <input
                    name="passMark"
                    type="number"
                    min="0"
                    value={quizForm.passMark}
                    onChange={handleQuizChange}
                    placeholder="e.g. 60"
                    className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowQuizModal(false)}
                    className="px-4 py-2 text-sm border rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm rounded-md bg-[var(--color-primary)] text-white"
                  >
                    Create
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Question Modal */}
      <AnimatePresence>
        {showQuestionModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQuestionModal(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[var(--color-secondary)]">
                  Add Question to "{selectedQuiz?.title}"
                </h3>
                <X
                  onClick={() => setShowQuestionModal(false)}
                  className="cursor-pointer text-gray-400 hover:text-gray-600"
                />
              </div>

              {questions.length > 0 && (
                <div className="mb-6 border rounded-md p-3 bg-gray-50">
                  <h4 className="font-medium mb-2 text-gray-700">
                    Existing Questions
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {questions.map((q, idx) => (
                      <li key={q._id} className="border-b pb-1">
                        <span className="font-semibold">
                          {idx + 1}. {q.prompt}
                        </span>
                        {q.type === "mcq" && (
                          <ul className="ml-5 list-disc">
                            {q.options.map((o, i) => (
                              <li
                                key={i}
                                className={`${
                                  o.isCorrect
                                    ? "text-green-600 font-medium"
                                    : "text-gray-600"
                                }`}
                              >
                                {o.text}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <form onSubmit={handleAddQuestion} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Question Type</label>
                  <select
                    name="type"
                    value={questionForm.type}
                    onChange={handleQuestionChange}
                    className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                  >
                    <option value="mcq">Multiple Choice</option>
                    <option value="short">Short Answer</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Question Text</label>
                  <textarea
                    name="prompt"
                    value={questionForm.prompt}
                    onChange={handleQuestionChange}
                    rows={3}
                    placeholder="Enter the question"
                    className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                  />
                </div>

                {questionForm.type === "mcq" && (
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Options</label>
                    {questionForm.options.map((opt, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 border rounded-md px-3 py-2"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            handleOptionChange(i, "isCorrect", !opt.isCorrect)
                          }
                          className="text-[var(--color-primary)]"
                        >
                          {opt.isCorrect ? (
                            <CheckCircle2 size={18} />
                          ) : (
                            <Circle size={18} />
                          )}
                        </button>
                        <input
                          type="text"
                          value={opt.text}
                          onChange={(e) =>
                            handleOptionChange(i, "text", e.target.value)
                          }
                          placeholder={`Option ${i + 1}`}
                          className="flex-1 text-sm border-none outline-none bg-transparent"
                        />
                        <Trash2
                          size={16}
                          onClick={() => removeOption(i)}
                          className="text-red-500 cursor-pointer"
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addOption}
                      className="text-[var(--color-primary)] text-sm"
                    >
                      + Add Option
                    </button>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium">
                    Points per Correct Answer
                  </label>
                  <input
                    type="number"
                    name="perCorrectPoint"
                    value={questionForm.perCorrectPoint}
                    onChange={handleQuestionChange}
                    placeholder="e.g. 2"
                    className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowQuestionModal(false)}
                    className="px-4 py-2 text-sm border rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm rounded-md bg-[var(--color-primary)] text-white"
                  >
                    Add Question
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
