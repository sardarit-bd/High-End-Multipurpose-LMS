"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, PlayCircle, FileText, HelpCircle, Clock, CheckCircle, BookOpen, Target, TrendingUp } from "lucide-react";
import { useLessonsByUnit } from "@/hooks/useCourse";
import { useTasks } from "@/hooks/useTask";
import { useQuizzes } from "@/hooks/useQuiz";
import LessonItem from "./LessonItem";
import TaskItem from "./TaskItem";
import QuizSection from "./QuizSection";
import TaskModal from "./modals/TaskModal";
import QuizModal from "./modals/QuizModal";
import { useState } from "react";

export default function UnitAccordion({
  module,
  moduleIndex,
  openModules,
  toggleModule,
  currentLesson,
  setCurrentLesson,
  completedLessons,
  submissions = [],
}) {
  const { data: lessons } = useLessonsByUnit(module._id);
  const { data: tasks } = useTasks(module._id);
  const quizTask = tasks?.find((t) => t.type === "quiz");
  const { data: quizzes } = useQuizzes(quizTask?._id);

  const [activeTask, setActiveTask] = useState(null);
  const [activeQuiz, setActiveQuiz] = useState(null);

  // Helper functions to check submission status
  const isTaskSubmitted = (taskId) => {
    return submissions.some(submission => submission.taskId === taskId && submission.status === 'approved');
  };

  const getTaskSubmission = (taskId) => {
    return submissions.find(submission => submission.task === taskId);
  };

  const getQuizSubmission = (quizId) => {
    return submissions.find(submission => submission.quizId === quizId);
  };

  // Calculate module progress using completed lessons from parent component
  const totalLessons = lessons?.length || 0;
  const completedLessonsInModule = lessons?.filter(lesson => completedLessons?.has(lesson._id)).length || 0;
  const moduleProgress = totalLessons > 0 ? Math.round((completedLessonsInModule / totalLessons) * 100) : 0;
  
  // Count different task types
  const nonQuizTasks = tasks?.filter((t) => t.type !== "quiz") || [];
  const hasTasks = nonQuizTasks.length > 0;
  const hasQuizzes = quizzes?.length > 0;

  return (
    <div className="px-3 py-2">
      {/* Module Header */}
      <button
        className={`group w-full rounded-2xl p-4 text-left transition-all duration-300 ${
          openModules === moduleIndex 
            ? "bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-lg shadow-blue-500/10" 
            : "bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-white border border-gray-200 hover:border-blue-200 hover:shadow-lg"
        }`}
        onClick={() => toggleModule(moduleIndex)}
      >
        <div className="flex items-center justify-between">
          {/* Left side: Module info */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {/* Module number */}
            <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
              openModules === moduleIndex
                ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-md"
                : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700"
            }`}>
              <span className="text-lg font-bold">{moduleIndex + 1}</span>
            </div>

            {/* Module title and stats */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 text-base truncate">{module?.title}</h3>
              
              <div className="flex items-center gap-4 mt-2">
                {/* Progress */}
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        moduleProgress >= 100 
                          ? "bg-gradient-to-r from-emerald-500 to-green-500"
                          : "bg-gradient-to-r from-blue-400 to-cyan-400"
                      }`}
                      style={{ width: `${moduleProgress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-gray-600">{moduleProgress}%</span>
                </div>
                
              </div>
            </div>
          </div>

          {/* Right side: Chevron and time */}
          <div className="flex items-center gap-3 ml-4">
            {module.duration && (
              <span className="hidden md:inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 text-xs font-medium rounded-full">
                <Clock className="w-3.5 h-3.5" />
                {module.duration}
              </span>
            )}
            
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
              openModules === moduleIndex
                ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white rotate-180"
                : "bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600"
            }`}>
              {openModules === moduleIndex ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </div>
          </div>
        </div>
      </button>

      {/* Module Content */}
      <AnimatePresence initial={false}>
        {openModules === moduleIndex && (
          <motion.div
            key={`ul-${module._id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-6 pb-4 px-4 bg-gradient-to-br from-white to-gray-50 rounded-2xl mt-2 border border-gray-100">
              {/* Module Description */}
              {module.description && (
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 rounded-xl border border-blue-100">
                  <p className="text-sm text-gray-700 leading-relaxed">{module.description}</p>
                </div>
              )}

              {/* Lessons Section */}
              {lessons?.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <PlayCircle className="w-4 h-4 text-blue-500" />
                      Lessons 
                    </h4>
                    <span className="text-xs px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full font-medium">
                      {moduleProgress}% Complete
                    </span>
                  </div>
                  <div className="space-y-2">
                    {lessons.map((lesson) => (
                      <LessonItem
                        key={lesson._id}
                        lesson={lesson}
                        currentLesson={currentLesson}
                        setCurrentLesson={setCurrentLesson}
                        completed={completedLessons?.has(lesson._id) || false}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Tasks Section */}
              {hasTasks && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-emerald-600" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900">
                      Practice Tasks ({nonQuizTasks.filter(t => t.completed).length}/{nonQuizTasks.length})
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {nonQuizTasks.map((task) => (
                      <TaskItem
                        key={task._id}
                        task={task}
                        onOpen={() => setActiveTask(task)}
                        completed={isTaskSubmitted(task._id)}
                        submission={getTaskSubmission(task._id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quiz Section */}
              {hasQuizzes && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center">
                      <HelpCircle className="w-4 h-4 text-violet-600" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900">
                      Knowledge Check
                    </h4>
                  </div>
                  <QuizSection
                    quizzes={quizzes}
                    onOpen={() => setActiveQuiz(quizzes)}
                    submissions={submissions}
                  />
                </div>
              )}
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <AnimatePresence>
        {activeTask && (
          <TaskModal 
            task={activeTask} 
            onClose={() => setActiveTask(null)} 
          />
        )}
        {activeQuiz && (
          <QuizModal 
            quizzes={activeQuiz} 
            onClose={() => setActiveQuiz(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}