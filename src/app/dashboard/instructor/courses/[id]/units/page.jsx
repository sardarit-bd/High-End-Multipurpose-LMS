"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import UnitManager from "@/components/modules/dashboard/instructorr/UnitManager";
import { ArrowLeft } from "lucide-react";


export default function UnitsPage() {
  const { id } = useParams();

  return (
    <div className="py-10 px-4">
      <div className="container mx-auto flex items-center justify-between mb-6">
        <Link
          href="/dashboard/instructor/courses"
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-[var(--radius-default)] font-medium transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Courses
        </Link>
        <Link
          href={`/dashboard/instructor/courses/${id}/lessons`}
          className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-5 py-2 rounded-[var(--radius-default)] font-medium"
        >
          Next → Lessons
        </Link>
      </div>
      <UnitManager courseId={id} />
    </div>
  );
}
