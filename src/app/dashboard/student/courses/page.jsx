"use client";

import CourseCard from "@/components/modules/dashboard/student/CourseCard";
import { useState } from "react";

const courses = [
  {
    id: 1,
    title: "Build Responsive Real World Websites with Crash Course",
    instructor: "Christy Garner",
    category: "Programming",
    price: "$200",
    rating: 4.2,
    reviews: 220,
    image: "/courses/art.jpg",
    status: "enrolled",
  },
  {
    id: 2,
    title: "Learn JavaScript and Express to become an Expert",
    instructor: "Justin Gregory",
    category: "Programming",
    price: "$130",
    rating: 4.4,
    reviews: 180,
    image: "/courses/business.jpg",
    status: "enrolled",
  },
  {
    id: 3,
    title: "Introduction to Python Programming",
    instructor: "Carolyn Hines",
    category: "Programming",
    price: "$130",
    rating: 4.4,
    reviews: 180,
    image: "/courses/react.jpg",
    status: "completed",
  },
];

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState("enrolled");

  const filteredCourses = courses.filter((c) => c.status === activeTab);

  return (
    <div className="min-h-screen bg-white">
      <h1 className="text-2xl font-bold text-[var(--color-text)] mb-4">
        Enrolled Courses
      </h1>

      {/* Tabs */}
      <div className="flex space-x-3 mb-6">
        <button
          onClick={() => setActiveTab("enrolled")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            activeTab === "enrolled"
              ? "bg-[var(--color-primary)] text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Enrolled ({courses.filter((c) => c.status === "enrolled").length})
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            activeTab === "completed"
              ? "bg-[var(--color-secondary)] text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Completed ({courses.filter((c) => c.status === "completed").length})
        </button>
      </div>

      {/* Courses */}
      {filteredCourses.length === 0 ? (
        <p className="text-gray-500">No courses found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
