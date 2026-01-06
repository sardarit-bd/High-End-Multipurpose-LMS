"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import UnitManager from "@/components/modules/dashboard/instructorr/UnitManager";


export default function UnitsPage() {
  const { id } = useParams();

  return (
    <div className="py-10 px-4">
      <div className="container mx-auto flex items-center justify-end mb-6">
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
