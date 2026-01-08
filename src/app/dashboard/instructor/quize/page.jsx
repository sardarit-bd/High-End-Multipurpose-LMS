"use client";
import React, { useEffect, useState } from "react";
import api from "@/lib/apiClient";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import {
  QuizFilters,
  QuizTasksList,
  QuestionModal,
} from "@/components/dashboard/quiz";
import { 
  Brain, 
  BookOpen, 
  Filter, 
  Search, 
  Sparkles,
  BarChart,
  Award,
  Clock,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

export default function QuizTasksManager() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [units, setUnits] = useState([]);
  const [quizTasks, setQuizTasks] = useState([]);
  const [expandedQuiz, setExpandedQuiz] = useState(null);
  const [questions, setQuestions] = useState({});

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const [loading, setLoading] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [isEditingQuestion, setIsEditingQuestion] = useState(false);
  const [stats, setStats] = useState({ totalQuizzes: 0, totalQuestions: 0, totalPoints: 0 });

  const [questionForm, setQuestionForm] = useState({
    type: "mcq",
    prompt: "",
    perCorrectPoint: "",
    options: [{ text: "", isCorrect: false }],
  });

  // ===== Fetch Data =====
  useEffect(() => {
    if(user) fetchCourses();
  }, [user]);

  const fetchCourses = async () => {
    try {
      const res = await api.get(`/courses?instructor=${user._id}`);
      const coursesData = res.data?.data || [];
      setCourses(coursesData);
      
      // Auto-select first course
      if (coursesData.length > 0) {
        const firstCourseId = coursesData[0]._id;
        setSelectedCourse(firstCourseId);
        // Fetch units for the first course
        fetchUnits(firstCourseId);
      }
    } catch {
      toast.error("Failed to load courses");
    }
  };

  const fetchUnits = async (courseId) => {
    try {
      const res = await api.get(`/units/${courseId}`);
      const unitsData = res.data?.data || [];
      setUnits(unitsData);
      
      // Auto-select first unit
      if (unitsData.length > 0) {
        const firstUnitId = unitsData[0]._id;
        setSelectedUnit(firstUnitId);
        // Fetch quiz tasks for the first unit
        fetchQuizTasks(firstUnitId);
      }
    } catch {
      toast.error("Failed to load units");
    }
  };

  const fetchQuizTasks = async (unitId) => {
    if (!unitId) return;
    try {
      setLoading(true);
      const res = await api.get(`/tasks/${unitId}`);
      // Filter tasks that have type "quiz"
      const quizTasks = res.data?.data?.filter(task => task.type === 'quiz') || [];
      setQuizTasks(quizTasks);
      
      // Calculate stats
      let totalQuestions = 0;
      let totalPoints = 0;
      
      quizTasks.forEach(quiz => {
        if (questions[quiz._id]) {
          totalQuestions += questions[quiz._id].length;
          totalPoints += questions[quiz._id].reduce((sum, q) => sum + (q.perCorrectPoint || 0), 0);
        }
      });
      
      setStats({
        totalQuizzes: quizTasks.length,
        totalQuestions,
        totalPoints
      });
    } catch {
      toast.error("Failed to load quiz tasks");
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
        quizId: selectedQuiz?.quizId?._id,
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

      fetchQuestions(selectedQuiz?.quizId?._id);
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

  const handleDeleteQuestion = async (taskId, qId) => {
    if (!confirm("Delete this question?")) return;
    try {
      await api.delete(`/quizzes/delete-question/${qId}`);
      toast.success("Question deleted!");
      fetchQuestions(taskId);
    } catch {
      toast.error("Failed to delete question");
    }
  };

  // ===== Modern UI Redesign =====
  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      {/* Modern Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-special)] rounded-xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-[var(--color-secondary)]">
                Quiz Management
              </h3>
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text)]">
                Quiz Questions Manager
              </h1>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-emerald-100 shadow-[var(--shadow-soft)] hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-text)]/70">Total Quizzes</p>
                <p className="text-2xl font-bold text-[var(--color-text)]">{stats.totalQuizzes}</p>
              </div>
              <div className="p-2 bg-emerald-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-blue-100 shadow-[var(--shadow-soft)] hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-text)]/70">Total Questions</p>
                <p className="text-2xl font-bold text-[var(--color-text)]">{stats.totalQuestions}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Award className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-purple-100 shadow-[var(--shadow-soft)] hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-text)]/70">Total Points</p>
                <p className="text-2xl font-bold text-[var(--color-text)]">{stats.totalPoints}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Modern Course & Unit Selection Container */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-emerald-100 shadow-[var(--shadow-medium)] p-6 mb-8">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-1.5 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-lg">
                <Filter className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
              <h2 className="text-lg font-semibold text-[var(--color-text)]">Filter Quizzes</h2>
            </div>
            
            {/* Using your existing QuizFilters component */}
            <QuizFilters
              courses={courses}
              units={units}
              selectedCourse={selectedCourse}
              selectedUnit={selectedUnit}
              onCourseChange={(courseId) => {
                setSelectedCourse(courseId);
                fetchUnits(courseId);
                setSelectedUnit("");
                setQuizTasks([]);
              }}
              onUnitChange={(unitId) => {
                setSelectedUnit(unitId);
                fetchQuizTasks(unitId);
              }}
            />
          </div>

          {/* Selected Course/Unit Info */}
          {(selectedCourse || selectedUnit) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-6 pt-6 border-t border-emerald-100"
            >
              <div className="flex items-center gap-4">
                {selectedCourse && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">
                      {courses.find(c => c._id === selectedCourse)?.title}
                    </span>
                  </div>
                )}
                {selectedUnit && (
                  <>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">
                        {units.find(u => u._id === selectedUnit)?.title}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Modern Quiz Tasks Section */}
      <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-emerald-100 shadow-[var(--shadow-medium)] overflow-hidden">
        <div className="p-6 border-b border-emerald-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Quiz Tasks</h2>
                <p className="text-sm text-gray-600">
                  Manage questions for your quiz tasks
                  {selectedUnit && ` • ${quizTasks.length} quiz${quizTasks.length !== 1 ? 'zes' : ''} found`}
                </p>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search quizzes..."
                className="pl-10 pr-4 py-2 bg-emerald-50/50 border border-emerald-200 rounded-lg text-[var(--color-text)] placeholder-emerald-400/70 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent w-64"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" size={18} />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]"></div>
            <p className="mt-3 text-[var(--color-text)]/70">Loading quiz tasks...</p>
          </div>
        ) : (
          /* Using your existing QuizTasksList component */
          <QuizTasksList
            quizTasks={quizTasks}
            loading={loading}
            expandedQuiz={expandedQuiz}
            questions={questions}
            onToggleExpand={(task) => {
              const isOpen = expandedQuiz === task._id;
              setExpandedQuiz(isOpen ? null : task._id);
              if (!isOpen) fetchQuestions(task?.quizId?._id);
            }}
            onAddQuestion={(task) => {
              setSelectedQuiz(task);
              setIsEditingQuestion(false);
              setShowQuestionModal(true);
            }}
            onEditQuestion={handleEditQuestion}
            onDeleteQuestion={handleDeleteQuestion}
          />
        )}

        {/* Empty State */}
        {!loading && quizTasks.length === 0 && selectedUnit && (
          <div className="p-12 text-center">
            <div className="inline-block p-4 bg-emerald-50 rounded-full mb-4">
              <BookOpen className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No quiz tasks found</h3>
            <p className="text-gray-600 mb-6">Create a quiz task in the selected unit to get started</p>
          </div>
        )}

        {/* Empty State - No Unit Selected */}
        {!loading && !selectedUnit && (
          <div className="p-12 text-center">
            <div className="inline-block p-4 bg-blue-50 rounded-full mb-4">
              <Filter className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Unit</h3>
            <p className="text-gray-600">Please select a course and unit to view quiz tasks</p>
          </div>
        )}
      </div>

      {/* Modern Question Modal - Using your existing component */}
      <QuestionModal
        isOpen={showQuestionModal}
        isEditing={isEditingQuestion}
        selectedQuiz={selectedQuiz}
        questionForm={questionForm}
        onClose={() => setShowQuestionModal(false)}
        onSubmit={handleAddOrUpdateQuestion}
        onFormChange={handleQuestionChange}
        onOptionChange={handleOptionChange}
        onAddOption={addOption}
        onRemoveOption={removeOption}
      />
    </div>
  );
}