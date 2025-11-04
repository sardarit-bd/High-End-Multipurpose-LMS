"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
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
}) {
  const { data: lessons } = useLessonsByUnit(module._id);
  const { data: tasks } = useTasks(module._id);
  const quizTask = tasks?.find((t) => t.type === "quiz");
  const { data: quizzes } = useQuizzes(quizTask?._id);

  const [activeTask, setActiveTask] = useState(null);
  const [activeQuiz, setActiveQuiz] = useState(null);

  return (
    <div className="px-2">
      <button
        className="mt-2 flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition hover:bg-white/70"
        onClick={() => toggleModule(moduleIndex)}
        style={{ boxShadow: "var(--shadow-soft)" }}
      >
        <span className="font-bold">{module?.title}</span>
        {openModules === moduleIndex ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      <AnimatePresence initial={false}>
        {openModules === moduleIndex && (
          <motion.div
            key={`ul-${module._id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden pb-3 pt-1 space-y-4"
          >
            {lessons?.length > 0 && (
              <div>
                <h4 className="px-4 text-sm font-semibold text-gray-600 mb-1">Lessons</h4>
                {lessons.map((lesson) => (
                  <LessonItem
                    key={lesson._id}
                    lesson={lesson}
                    currentLesson={currentLesson}
                    setCurrentLesson={setCurrentLesson}
                  />
                ))}
              </div>
            )}

            {tasks?.some((t) => t.type !== "quiz") && (
              <div>
                <h4 className="px-4 text-sm font-semibold text-gray-600 mb-1">Tasks</h4>
                {tasks
                  .filter((t) => t.type !== "quiz")
                  .map((task) => (
                    <TaskItem key={task._id} task={task} onOpen={() => setActiveTask(task)} />
                  ))}
              </div>
            )}

            {quizTask && quizzes?.length > 0 && (
              <QuizSection quizzes={quizzes} onOpen={() => setActiveQuiz(quizzes)} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popups */}
      <AnimatePresence>
        {activeTask && <TaskModal task={activeTask} onClose={() => setActiveTask(null)} />}
        {activeQuiz && <QuizModal quizzes={activeQuiz} onClose={() => setActiveQuiz(null)} />}
      </AnimatePresence>
    </div>
  );
}
