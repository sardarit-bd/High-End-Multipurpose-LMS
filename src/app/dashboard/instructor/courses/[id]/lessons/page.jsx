"use client";
import { useParams } from "next/navigation";
import LessonManager from "@/components/modules/dashboard/instructorr/LessonManager";
import { useUnits } from "@/hooks/useUnit";

export default function LessonsPage() {
  const { id } = useParams();
  const { data: units = [], isLoading } = useUnits(id);

  return (
    <div className="container py-10 px-4">
      {isLoading ? (
        <p className="text-center text-gray-500">Loading units...</p>
      ) : (
        <LessonManager courseUnits={units} />
      )}
    </div>
  );
}
