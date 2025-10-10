"use client";

import { Heart } from "lucide-react";
import Link from "next/link";


export default function CourseCard({ course }) {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-40 object-cover"
        />
        <button className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:bg-gray-100">
          <Heart size={16} className="text-gray-600" />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center space-x-2">
          <span className="w-6 h-6 rounded-full bg-yellow-200 flex items-center justify-center text-xs font-bold text-yellow-800">
            {course.instructor[0]}
          </span>
          <p className="text-sm text-gray-600">{course.instructor}</p>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-md">
            {course.category}
          </span>
        </div>

        <h3 className="mt-2 font-semibold text-[var(--color-text)]">
          {course.title}
        </h3>

        <div className="flex items-center text-sm text-gray-600 mt-2">
          <div>
            <span className="text-yellow-500">⭐</span>
          <span className="ml-1">
            {course.rating} ({course.reviews} Reviews)
          </span>
          </div>
          <div>
            <span className="text-[var(--color-primary)] font-bold">{course.price}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-3">
          <button className="bg-[var(--color-text)] text-white px-4 py-1 rounded-full text-sm ">
           <Link href='/dashboard/student/leader-board'>Leader Board</Link>
          </button>
          <button className="bg-black text-white px-4 py-1 rounded-full text-sm hover:bg-gray-800">
            <Link href="/course/1">View Course</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
