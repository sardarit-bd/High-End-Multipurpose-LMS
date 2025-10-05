"use client";
import { useState } from "react";
import CourseCard from "./CoursesCard";

const allCourses = [
  {
    id: 1,
    title: "Web Development Bootcamp",
    mentorName: "Edith Dorsey",
    mentorImage: "/courses/react.jpg",
    category: "tech",
    rating: 4.9,
    reviews: 178,
    price: 190,
  },
  {
    id: 2,
    title: "UI/UX Design Essentials",
    mentorName: "John Doe",
    mentorImage: "/courses/uiux.jpg",
    category: "design",
    rating: 4.8,
    reviews: 92,
    price: 150,
  },
  {
    id: 3,
    title: "Business Strategy Masterclass",
    mentorName: "Sarah Connor",
    mentorImage: "/courses/business.jpg",
    category: "business",
    rating: 4.7,
    reviews: 65,
    price: 200,
  },
  // Add more courses as needed
];

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const filteredCourses = allCourses.filter((course) => {
    const matchesCategory = categoryFilter ? course.category === categoryFilter : true;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || course.mentorName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="bg-white py-16 px-4 min-h-screen">

      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-[var(--color-secondary)] mb-8 text-center">All Courses</h1>
        {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
        <input
          type="text"
          placeholder="Search courses or mentors..."
          className="w-full md:flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[var(--color-primary)]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full md:w-64 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[var(--color-primary)]"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="tech">Technology</option>
          <option value="design">Design</option>
          <option value="business">Business</option>
        </select>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">No courses found.</p>
      )}
      </div>
    </section>
  );
}
