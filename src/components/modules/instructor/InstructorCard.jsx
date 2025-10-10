// components/modules/instructors/InstructorCard.tsx

import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { FiBookOpen, FiClock } from "react-icons/fi";



export default function InstructorCard({ instructor }) {
  return (
    <div className="bg-white rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-shadow duration-300 overflow-hidden border border-gray-100">
      {/* Image */}
      <div className="relative w-full h-40">
        <img
          src={instructor.image}
          alt={instructor.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 text-sm text-yellow-500 mb-1">
          <FaStar className="text-[var(--color-accent)]" />
          <span className="font-medium">{instructor.rating}</span>
          <span className="text-gray-500 text-xs">
            ({instructor.reviews} Reviews)
          </span>
        </div>

        {/* Name + Role */}
        <h3 className="text-[var(--color-text)] font-semibold text-base">
          <Link href='/instructors/slug'>{instructor.name}</Link>
        </h3>
        <p className="text-gray-600 text-sm mb-3">{instructor.role}</p>

        {/* Lessons + Duration */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <FiBookOpen className="text-[var(--color-secondary)]" />
            <span>{instructor.lessons}+ Lessons</span>
          </div>
          <div className="flex items-center gap-1">
            <FiClock className="text-[var(--color-primary)]" />
            <span>{instructor.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
