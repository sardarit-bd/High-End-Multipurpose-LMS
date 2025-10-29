"use client";

import { useParams } from "next/navigation";
import QuizManager from "@/components/modules/dashboard/instructorr/QuizManager";

export default function UnitQuizPage() {
  const { courseId, unitId } = useParams();

  return (
    <div className="min-h-screen bg-[var(--color-background)] py-10 px-4">
      <div className="max-w-5xl mx-auto mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[var(--color-secondary)]">
          Manage Quizzes for Unit
        </h1>
      </div>
      <QuizManager courseId={courseId} unitId={unitId} />
    </div>
  );
}
