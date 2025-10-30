"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import api from "@/lib/apiClient";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";

export default function InstructorQuizBuilder() {
  const {user} = useAuth()
  const [courses, setCourses] = useState([]);
  const [units, setUnits] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [expandedQuiz, setExpandedQuiz] = useState(null);
  const [questions, setQuestions] = useState({});

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const [loading, setLoading] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [isEditingQuiz, setIsEditingQuiz] = useState(false);
  const [isEditingQuestion, setIsEditingQuestion] = useState(false);

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

  // ===== Fetch Data =====
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await api.get(`/courses?instructor=${user._id}`);
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
      setQuestions((prev) => ({
        ...prev,
        [quizId]: res.data?.data?.questions || [],
      }));
    } catch {
      setQuestions((prev) => ({ ...prev, [quizId]: [] }));
    }
  };

  // ===== Quiz CRUD =====
  const handleQuizChange = (e) =>
    setQuizForm({ ...quizForm, [e.target.name]: e.target.value });

  const handleQuizSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditingQuiz) {
        await api.put(`/quizzes/${selectedQuiz._id}`, {
          title: quizForm.title,
          passMark: Number(quizForm.passMark),
        });
        toast.success("Quiz updated!");
      } else {
        await api.post("/quizzes/create", {
          unitId: quizForm.unitId,
          title: quizForm.title,
          passMark: Number(quizForm.passMark),
        });
        toast.success("Quiz created!");
      }
      setShowQuizModal(false);
      fetchQuizzes(quizForm.unitId || selectedUnit);
      setQuizForm({ courseId: "", unitId: "", title: "", passMark: "" });
      setIsEditingQuiz(false);
    } catch {
      toast.error("Failed to save quiz");
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    if (!confirm("Delete this quiz?")) return;
    try {
      await api.delete(`/quizzes/${quizId}`);
      toast.success("Quiz deleted");
      fetchQuizzes(selectedUnit);
    } catch {
      toast.error("Failed to delete quiz");
    }
  };

  // ===== Question CRUD =====
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

  const handleAddOrUpdateQuestion = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        quizId: selectedQuiz._id,
        type: questionForm.type,
        prompt: questionForm.prompt,
        options: questionForm.type === "mcq" ? questionForm.options : [],
        perCorrectPoint: Number(questionForm.perCorrectPoint) || 0,
      };

      if (isEditingQuestion) {
        await api.put(`/quizzes/update-question/${questionForm._id}`, payload);
        toast.success("Question updated!");
      } else {
        await api.post("/quizzes/add-question", payload);
        toast.success("Question added!");
      }

      fetchQuestions(selectedQuiz._id);
      setShowQuestionModal(false);
      setIsEditingQuestion(false);
      setQuestionForm({
        type: "mcq",
        prompt: "",
        perCorrectPoint: "",
        options: [{ text: "", isCorrect: false }],
      });
    } catch {
      toast.error("Failed to save question");
    }
  };

  const handleEditQuestion = (quiz, q) => {
    setSelectedQuiz(quiz);
    setIsEditingQuestion(true);
    setQuestionForm(q);
    setShowQuestionModal(true);
  };

  const handleDeleteQuestion = async (quizId, qId) => {
    if (!confirm("Delete this question?")) return;
    try {
      await api.delete(`/quizzes/delete-question/${qId}`);
      toast.success("Question deleted!");
      fetchQuestions(quizId);
    } catch {
      toast.error("Failed to delete question");
    }
  };

  // ===== UI =====
  return (
    <div className="p-6 space-y-6 text-[var(--color-text)]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-[var(--color-secondary)]">
          Instructor Quiz Builder
        </h1>
        <button
          onClick={() => {
            setIsEditingQuiz(false);
            setShowQuizModal(true);
          }}
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

      {/* Quizzes */}
      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="font-semibold text-lg mb-4 text-[var(--color-secondary)]">
          Quizzes for Selected Unit
        </h2>

        {loading ? (
          <p className="text-gray-500 italic">Loading...</p>
        ) : quizzes.length ? (
          <div className="space-y-3">
            {quizzes.map((quiz) => {
              const quizQuestions = questions[quiz._id] || [];
              const totalMarks = quizQuestions.reduce(
                (acc, q) => acc + (q.perCorrectPoint || 0),
                0
              );

              return (
                <div
                  key={quiz._id}
                  className="border rounded-md p-4 bg-gray-50"
                >
                  {/* Quiz header */}
                  <div
                    onClick={() => {
                      const isOpen = expandedQuiz === quiz._id;
                      setExpandedQuiz(isOpen ? null : quiz._id);
                      if (!isOpen) fetchQuestions(quiz._id);
                    }}
                    className="flex justify-between items-center cursor-pointer"
                  >
                    <div>
                      <div className="font-medium text-base">{quiz.title}</div>
                      <div className="text-sm text-gray-500">
                        Pass Mark: {quiz.passMark} | Total Marks: {totalMarks}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsEditingQuiz(true);
                          setSelectedQuiz(quiz);
                          setQuizForm({
                            ...quiz,
                            unitId: selectedUnit,
                          });
                          setShowQuizModal(true);
                        }}
                        className="p-1 text-gray-500 hover:text-blue-600"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteQuiz(quiz._id);
                        }}
                        className="p-1 text-gray-500 hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                      {expandedQuiz === quiz._id ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </div>
                  </div>

                  {/* Accordion: Questions */}
                  <AnimatePresence>
                    {expandedQuiz === quiz._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pl-4 border-t pt-3"
                      >
                        <div className="flex justify-end mb-3">
                          <button
                            onClick={() => {
                              setSelectedQuiz(quiz);
                              setIsEditingQuestion(false);
                              setShowQuestionModal(true);
                            }}
                            className="flex items-center gap-1 bg-[var(--color-primary)] text-white px-3 py-1.5 rounded-md text-sm"
                          >
                            <Plus size={14} /> Add Question
                          </button>
                        </div>

                        {quizQuestions.length > 0 ? (
                          <ul className="space-y-3 text-sm">
                            {quizQuestions.map((q, idx) => (
                              <li
                                key={q._id}
                                className="border rounded-md p-3 bg-white"
                              >
                                <div className="flex justify-between items-start">
                                  <p className="font-medium mb-1">
                                    {idx + 1}. {q.prompt}
                                  </p>
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => handleEditQuestion(quiz, q)}
                                      className="text-gray-500 hover:text-blue-600"
                                    >
                                      <Edit3 size={16} />
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleDeleteQuestion(quiz._id, q._id)
                                      }
                                      className="text-gray-500 hover:text-red-500"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                </div>
                                <p className="text-xs text-gray-500 mb-2">
                                  Marks: {q.perCorrectPoint}
                                </p>
                                {q.type === "mcq" && (
                                  <ul className="ml-5 list-disc">
                                    {q.options.map((o, i) => (
                                      <li
                                        key={i}
                                        className={`${
                                          o.isCorrect
                                            ? "text-green-600 font-semibold"
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
                        ) : (
                          <p className="text-gray-500 text-sm italic">
                            No questions yet.
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-400 italic">No quizzes found.</p>
        )}
      </div>

      {/* QUIZ MODAL */}
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
                  {isEditingQuiz ? "Edit Quiz" : "Create New Quiz"}
                </h3>
                <X
                  onClick={() => setShowQuizModal(false)}
                  className="cursor-pointer text-gray-400 hover:text-gray-600"
                />
              </div>

              <form onSubmit={handleQuizSubmit} className="space-y-4">
                {!isEditingQuiz && (
                  <>
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
                  </>
                )}

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
                    {isEditingQuiz ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QUESTION MODAL */}
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
                  {isEditingQuestion
                    ? "Edit Question"
                    : `Add Question to "${selectedQuiz?.title}"`}
                </h3>
                <X
                  onClick={() => setShowQuestionModal(false)}
                  className="cursor-pointer text-gray-400 hover:text-gray-600"
                />
              </div>

              <form onSubmit={handleAddOrUpdateQuestion} className="space-y-4">
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
                    placeholder="Enter question"
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
                    {isEditingQuestion ? "Update Question" : "Add Question"}
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
