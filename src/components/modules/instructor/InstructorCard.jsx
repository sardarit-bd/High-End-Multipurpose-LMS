import Link from "next/link";
import { FiBookOpen, FiClock } from "react-icons/fi";



export default function InstructorCard({ instructor }) {

  return (
    <div className="bg-white rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-shadow duration-300 overflow-hidden border border-gray-100">
      {/* Image */}
      <div className="relative w-full h-40">
        <img
          src={instructor?.userId?.picture || './images/ins1.jpg'}
          alt={instructor?.userId?.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="p-4">

        {/* Name + Role */}
        <h3 className="text-[var(--color-text)] font-semibold text-base">
          <Link href={`/instructors/${instructor._id}`}>{instructor?.userId?.name}</Link>
        </h3>
        <p className="text-gray-600 text-sm mb-3">{instructor?.designation}</p>

        {/* Lessons + Duration */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            {instructor?.noOfCourse ? (
              <FiBookOpen className="w-4 h-4" />) : ''}
            <span>{instructor?.noOfCourse ? instructor?.noOfCourse + "+ Courses" : ""}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
