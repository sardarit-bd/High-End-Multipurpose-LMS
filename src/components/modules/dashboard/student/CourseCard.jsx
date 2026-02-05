"use client";

import { Heart } from "lucide-react";
import Link from "next/link";


export default function CourseCard({ course }) {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={course?.course?.thumbnail}
          alt={course?.course?.title}
          className="w-full h-40 object-cover"
        />
        {/* <button className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:bg-gray-100">
          <Heart size={16} className="text-gray-600" />
        </button> */}
      </div>

      <div className="p-4">
        <div className="flex items-center space-x-2">
          <span className="w-6 h-6 rounded-full bg-yellow-200 flex items-center justify-center text-xs font-bold text-yellow-800">
            {/* {course?.course?.instructor} */}
          </span>
          {/* <p className="text-sm text-gray-600">{course.instructor}</p> */}
          <span className={`text-xs px-2 py-1 rounded-md ${
            course?.status === 'completed'
              ? 'bg-green-100 text-green-800'
              : course?.status === 'enrolled'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {course?.status === 'completed' ? 'Completed' : course?.status === 'enrolled' ? 'In Progress' : course?.course?.category}
          </span>
        </div>

        <h3 className="mt-2 font-semibold text-[var(--color-text)]">
          {course?.course?.title}
        </h3>

        {/* Progress Bar */}
        <div className="mt-2 mb-3">
          <div className="flex justify-between items-center text-xs text-gray-600 mb-1">
            <span>Progress</span>
            <span>{course?.progress || 0}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[var(--color-primary)] h-2 rounded-full transition-all duration-300"
              style={{ width: `${course?.progress || 0}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
          {/* <div className="flex items-center">
            <span className="text-yellow-500">⭐</span>
            <span className="ml-1">
              {course?.course?.rating || 0} ({course?.course?.reviews || 0} Reviews)
            </span>
          </div> */}
          <div>
            <span className="text-[var(--color-primary)] font-bold">
              {course?.course?.price ? `$${course.course.price}` : 'Free'}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-3">
          <button className={`px-4 py-2 rounded-full text-sm font-medium ${
            course?.status === 'completed'
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white'
          }`}>
            <Link href={`/course/${course?.course?.slug}`}>
              {course?.status === 'completed' ? 'Review Course' : 'Continue Learning'}
            </Link>
          </button>
          {/* <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200">
            <Link href='/dashboard/student/leader-board'>Leaderboard</Link>
          </button> */}
        </div>
      </div>
    </div>
  );
}
