"use client";
import api from "@/lib/apiClient";
import { motion } from "framer-motion";
import { X, RotateCcw, Clock, AlertCircle, CheckCircle, ChevronRight, Trophy, Target } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function QuizModal({ quizzes, onClose }) {
  const quiz = quizzes[0];
  const queryClient = useQueryClient();

  // Fetch quiz questions
  const { data: quizData, isLoading: quizLoading } = useQuery({
    queryKey: ["quizQuestions", quiz?._id],
    queryFn: async () => {
      if (!quiz?._id) return null;
      const res = await api.get(`/quizzes/${quiz._id}/questions`);
      return res.data?.data;
    },
    enabled: !!quiz?._id,
  });

  const questions = quizData?.questions || [];

  // Don't render if no questions
  if (!quizLoading && questions.length === 0) {
    return (
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={32} className="text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Quiz Not Ready</h3>
            <p className="text-gray-600 mb-6">This quiz doesn't have any questions yet. Please check back later.</p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-500 text-white font-medium rounded-xl hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Check if quiz task is already submitted (quiz submissions are stored as task submissions)
  const taskId = quiz?.task?._id || quiz?.task;
  const { data: existingSubmission, isLoading: submissionLoading } = useQuery({
    queryKey: ["taskSubmission", taskId],
    queryFn: async () => {
      if (!taskId) return null;
      try {
        const res = await api.get(`/submissions/tasks/${taskId}/me`);
        return res.data?.data;
      } catch (error) {
        return null;
      }
    },
    enabled: !!taskId,
  });

  console.log("Existing submission for this quiz's task:", existingSubmission);
  const isAlreadySubmitted = !!existingSubmission;

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(questions.length * 60);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const timerRef = useRef();

  // Update timer when questions load
  useEffect(() => {
    if (questions.length > 0) {
      setTimeLeft(questions.length * 60);
    }
  }, [questions.length]);

  // Set submitted state and score when existing submission is loaded
  useEffect(() => {
    if (existingSubmission) {
      setSubmitted(true);
      // Calculate score percentage from correct answers in submission
      const correctCount = existingSubmission.correctAnswers || 0;
      const totalQuestions = questions.length;
      const scorePercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
      setScore(scorePercentage);
    }
  }, [existingSubmission, questions.length]);

  // 🕒 Timer countdown (only if not already submitted)
  useEffect(() => {
    if (submitted || isAlreadySubmitted) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleSubmit(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [submitted, isAlreadySubmitted]);

  // 🚫 Detect tab change, minimize, blur, or close (only if not already submitted)
  useEffect(() => {
    if (isAlreadySubmitted) return;

    const handleVisibilityChange = () => {
      if (document.hidden && !submitted) handleSubmit(true);
    };
    const handleBlur = () => {
      if (!submitted) handleSubmit(true);
    };
    const handleBeforeUnload = (e) => {
      if (!submitted) {
        handleSubmit(true);
        e.preventDefault();
        e.returnValue =
          "⚠️ Your quiz will be auto-submitted if you leave or reload.";
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [submitted, isAlreadySubmitted]);

  // 🧭 Helpers
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // ✅ Multi-select MCQ toggle
  const handleSelect = (qIdx, optIdx) => {
    if (submitted) return;
    const prev = answers[qIdx]?.selected || [];
    const alreadySelected = prev.includes(optIdx);
    const updated = alreadySelected
      ? prev.filter((i) => i !== optIdx)
      : [...prev, optIdx];

    setAnswers((a) => ({
      ...a,
      [qIdx]: { type: "mcq", selected: updated },
    }));
  };

  // ✍️ Short-answer
  const handleShort = (qIdx, val) => {
    if (submitted) return;
    setAnswers((a) => ({
      ...a,
      [qIdx]: { type: "short", text: val },
    }));
  };

  // ✅ Submit quiz (manual or auto)
  const handleSubmit = async (auto = false) => {
   
    clearInterval(timerRef.current);
    let total = 0;

    questions.forEach((q, i) => {
      if (q.type === "mcq") {
        const selected = answers[i]?.selected || [];
        const correctIndexes = q.options
          .map((o, idx) => (o.isCorrect ? idx : null))
          .filter((x) => x !== null);
        const isCorrect =
          selected.length === correctIndexes.length &&
          selected.every((s) => correctIndexes.includes(s));
        if (isCorrect) total += q.perCorrectPoint;
      }

      if (q.type === "short" && answers[i]?.text?.trim())
        total += q.perCorrectPoint;
    });

    // 🔥 Build JSON Payload - ensure answers array matches question indices
    const answersArray = [];
    for (let i = 0; i < questions.length; i++) {
      answersArray[i] = answers[i] || { type: questions[i].type === "short" ? "short" : "mcq", selected: [], text: "" };
    }

    const submissionData = {
      quizId: quiz?._id,
      answers: answersArray,
    };
    console.log("📤 Quiz Submission JSON:", submissionData);
    const quizeSubmitRes = await api.post(`/quizzes/submit`, submissionData);
    console.log("Quiz submission response:", quizeSubmitRes);

    // Invalidate queries to refresh progress and submissions
    queryClient.invalidateQueries({ queryKey: ["submissions"] });
    queryClient.invalidateQueries({ queryKey: ["enrollmentCourse"] });
    queryClient.invalidateQueries({ queryKey: ["myPoints"] });
    queryClient.invalidateQueries({ queryKey: ["leaderboard"] });

    const correctCount = quizeSubmitRes.data?.data?.autoPoints || 0;


    setScore(correctCount);
    setSubmitted(true);
    if (auto){
      toast.info("Quiz auto-submitted due to inactivity or tab change. Please review your results.");
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setTimeLeft(questions.length * 60);
    setCurrentQuestion(0);
  };

  const nextQuestion = () => {
    setCurrentQuestion(prev => Math.min(prev + 1, questions.length - 1));
  };

  const prevQuestion = () => {
    setCurrentQuestion(prev => Math.max(prev - 1, 0));
  };

  if (submissionLoading || quizLoading) {
    return (
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8 max-h-[95vh] overflow-hidden flex flex-col"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">
                {submissionLoading ? "Checking quiz submission status..." : "Loading quiz questions..."}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-0 max-h-[95vh] overflow-hidden flex flex-col"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-white to-gray-50 px-8 py-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-primary)]/5">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Q</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{quizData?.title || quiz?.title}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {isAlreadySubmitted ? "Quiz Results" : `${questions.length} questions • ${questions.length} min`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {isAlreadySubmitted ? (
                /* Show points earned in header if already submitted */
                <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-green-50 px-4 py-2.5 rounded-xl border border-emerald-200 shadow-sm">
                  <Trophy size={18} className="text-emerald-600" />
                  <span className="font-mono font-bold text-lg text-emerald-800">
                    {existingSubmission?.pointsAwarded || 0} Points
                  </span>
                </div>
              ) : !submitted && (
                <div className="flex items-center gap-2 bg-gradient-to-r from-gray-50 to-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm">
                  <Clock size={18} className="text-[var(--color-primary)]" />
                  <span className="font-mono font-bold text-lg text-gray-800">
                    {formatTime(timeLeft)}
                  </span>
                </div>
              )}
              {/* <button
                onClick={() => {
                  if (!submitted) handleSubmit(true);
                  onClose();
                }}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button> */}
            </div>
          </div>

          {/* Question Navigation */}
          {!submitted && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/70"
                  animate={{
                    width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Warning */}
        {!submitted && (
          <div className="mx-8 mt-4 p-3 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200/50 rounded-xl flex items-start gap-3">
            <AlertCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-red-700">
              <span className="font-semibold">Warning:</span> Leaving or minimizing this tab will automatically submit your quiz. Stay focused!
            </p>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {isAlreadySubmitted ? (
            /* Already Submitted - Show Results */
            <div className="max-w-2xl mx-auto">
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-emerald-200"
                >
                  <Trophy size={48} className="text-emerald-600" />
                </motion.div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Quiz Completed!</h3>
                <p className="text-gray-600 mb-8">You have already taken this quiz. Here are your results:</p>

                {/* Points Display */}
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-8 border border-emerald-200 mb-8">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-emerald-700 mb-2">{existingSubmission?.breakdown ? existingSubmission.breakdown.filter(item => item.type === 'mcq').reduce((sum, item) => sum + (item.autoPoints || 0), 0) : 0}</div>
                    <p className="text-lg text-emerald-600 font-medium">Total Points Earned</p>
                    {existingSubmission?.breakdown && (
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-white/50 rounded-lg p-3">
                          <div className="text-lg font-bold text-emerald-700">
                            {existingSubmission.breakdown
                              .filter(item => item.type === 'mcq')
                              .reduce((sum, item) => sum + (item.autoPoints || 0), 0)}
                          </div>
                          <div className="text-emerald-600">MCQ Points</div>
                        </div>
                        <div className="bg-white/50 rounded-lg p-3">
                          <div className="text-lg font-bold text-emerald-700">
                            {console.log('Existing Submission Breakdown:', existingSubmission.breakdown)}
                            {existingSubmission.breakdown
                              .filter(item => item.type === 'short')
                              .reduce((sum, item) => sum + (item.reviewPoints || 0), 0)}
                          </div>
                          <div className="text-emerald-600">Short Answer Points</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Completion Info */}
                <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-200 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      Completed on {existingSubmission?.submittedAt ? new Date(existingSubmission.submittedAt).toLocaleDateString() : 'N/A'}
                    </div>
                    <p className="text-sm text-gray-600">Quiz submission details</p>
                  </div>
                </div>

                {/* Submission Details */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Quiz Breakdown</h4>
                  <div className="space-y-3 text-left">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Questions:</span>
                      <span className="font-semibold text-gray-900">{questions.length}</span>
                    </div>

                    {existingSubmission?.breakdown && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">MCQ Questions:</span>
                          <span className="font-semibold text-gray-900">
                            {existingSubmission.breakdown.filter(item => item.type === 'mcq').length}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Short Answer Questions:</span>
                          <span className="font-semibold text-gray-900">
                            {existingSubmission.breakdown.filter(item => item.type === 'short').length}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">MCQ Points:</span>
                          <span className="font-semibold text-green-700">
                            {existingSubmission.breakdown
                              .filter(item => item.type === 'mcq')
                              .reduce((sum, item) => sum + (item.autoPoints || 0), 0)} pts
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Short Answer Points:</span>
                          <span className="font-semibold text-blue-700">
                            {existingSubmission.breakdown
                              .filter(item => item.type === 'short')
                              .reduce((sum, item) => sum + (item.reviewPoints || 0), 0)} pts
                          </span>
                        </div>
                      </>
                    )}

                    <div className="border-t border-blue-200 pt-3 mt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Total Points Awarded:</span>
                        <span className="font-bold text-lg text-[var(--color-primary)]">{existingSubmission?.pointsAwarded || 0}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Review Status:</span>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        existingSubmission?.status === 'reviewed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {existingSubmission?.status === 'reviewed' ? 'Reviewed' : 'Pending Review'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : submitted ? (
            <div className="text-center py-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-emerald-200"
              >
                <CheckCircle size={40} className="text-emerald-600" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Quiz Submitted!</h3>
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-green-50 px-8 py-4 rounded-2xl border border-emerald-200 mb-8">
                <span className="text-4xl font-bold text-emerald-700">{score}</span>
                <span className="text-lg text-emerald-600 font-medium">points earned</span>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Current Question */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-[var(--color-primary)] text-white text-sm font-bold rounded-lg">
                    {currentQuestion + 1}
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    {questions[currentQuestion].prompt}
                  </h3>
                  <span className="ml-2 text-xs uppercase text-[var(--color-primary)] font-bold px-2 py-1 bg-[var(--color-primary)]/10 rounded">
                    {questions[currentQuestion].type}
                  </span>
                </div>

                {/* ✅ Multi-select MCQ */}
                {questions[currentQuestion].type === "mcq" && (
                  <ul className="space-y-3">
                    {questions[currentQuestion].options.map((opt, optIdx) => {
                      const selected = answers[currentQuestion]?.selected?.includes(optIdx) || false;
                      return (
                        <motion.li
                          key={optIdx}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div
                            onClick={() => handleSelect(currentQuestion, optIdx)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selected
                                ? "bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-primary)]/5 border-[var(--color-primary)]"
                                : "hover:border-gray-300 border-gray-200 bg-white hover:bg-gray-50"
                              }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-6 h-6 flex items-center justify-center rounded-lg ${selected
                                  ? "bg-[var(--color-primary)] text-white"
                                  : "bg-gray-100 text-gray-400"
                                }`}>
                                {selected ? "✓" : String.fromCharCode(65 + optIdx)}
                              </div>
                              <span className="font-medium text-gray-800">{opt.text}</span>
                            </div>
                          </div>
                        </motion.li>
                      );
                    })}
                  </ul>
                )}

                {/* ✍️ Short-answer */}
                {questions[currentQuestion].type === "short" && (
                  <div className="space-y-4">
                    <textarea
                      placeholder="Type your answer here..."
                      rows={4}
                      className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] resize-none transition-all"
                      value={answers[currentQuestion]?.text || ""}
                      onChange={(e) => handleShort(currentQuestion, e.target.value)}
                    />
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <AlertCircle size={12} />
                      Press Enter for new line
                    </div>
                  </div>
                )}
              </div>

              {/* Question Navigation Dots */}
              <div className="flex flex-wrap gap-2 justify-center">
                {questions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentQuestion(idx)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${currentQuestion === idx
                        ? "bg-[var(--color-primary)] text-white shadow-md"
                        : answers[idx]
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-8 py-5">
          {isAlreadySubmitted ? (
            /* Already submitted - only show close button */
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-gray-500 text-white font-medium rounded-xl hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          ) : !submitted ? (
            /* Quiz taking - show navigation and submit buttons */
            <div className="flex items-center justify-between">
              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
                  currentQuestion === 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <ChevronRight className="rotate-180" size={18} />
                Previous
              </button>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    handleSubmit(true);
                    onClose();
                  }}
                  className="px-5 py-2.5 text-gray-600 hover:text-gray-800 font-medium"
                >
                  Exit Quiz
                </button>
                {currentQuestion === questions.length - 1 ? (
                  <button
                    onClick={() => handleSubmit(false)}
                    className="px-8 py-3.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/90 text-white font-bold rounded-xl hover:shadow-lg transition-all shadow-md"
                  >
                    Submit Quiz
                  </button>
                ) : (
                  <button
                    onClick={nextQuestion}
                    className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/90 text-white font-bold rounded-xl hover:shadow-lg transition-all"
                  >
                    Next Question
                    <ChevronRight size={18} />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Just submitted - show close button */
            <div className="flex justify-center">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/90 text-white font-bold rounded-xl hover:shadow-xl transition-all"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}