"use client";

import { useParams } from "next/navigation";
import TaskManager from "@/components/modules/dashboard/instructorr/TaskManager";

export default function UnitTaskPage() {
  const { courseId, unitId } = useParams();

  return (
    <div className="min-h-screen bg-[var(--color-background)] py-10 px-4">
      <div className="max-w-5xl mx-auto mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[var(--color-secondary)]">
          Manage Tasks for Unit
        </h1>
      </div>
      <TaskManager courseId={courseId} unitId={unitId} />
    </div>
  );
}
