"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import LessonManager from "@/components/modules/dashboard/instructorr/LessonManager";
import { useUnits } from "@/hooks/useUnit";
import { ArrowLeft } from "lucide-react";

export default function LessonsPage() {
  const { id } = useParams();
  const { data: units = [], isLoading } = useUnits(id);

  return (
    <div className="container py-10 px-4">
      <div className="flex items-center justify-start mb-6">
        <Link
          href={`/dashboard/instructor/courses/${id}/units`}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-[var(--radius-default)] font-medium transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Units
        </Link>
      </div>
      {isLoading ? (
        <p className="text-center text-gray-500">Loading units...</p>
      ) : (
        <LessonManager courseUnits={units} />
      )}
    </div>
  );
}
