"use client";
import React, { useState } from "react";
import CourseCard from "../courses/CourseCard";
import Link from "next/link";
export const courses = [
  // ===== UI/UX =====
  {
    title: "Information About UI/UX Design Degree",
    category: "UI/UX",
    lessons: 20,
    duration: "1 hr 45 min",
    price: "$500",
    oldPrice: "$750",
    isFree: false,
    author: "Binodh Sation",
    authorImg: "/instructors/binodh.jpg",
    rating: 5,
    image: "/courses/uiux.jpg",
  },
  {
    title: "UI/UX Wireframing and Prototyping",
    category: "UI/UX",
    lessons: 18,
    duration: "1 hr 20 min",
    price: "$300",
    oldPrice: "$500",
    isFree: true,
    author: "Lisa Brown",
    authorImg: "/instructors/lisa.jpg",
    rating: 4,
    image: "/courses/uiux.jpg",
  },
  {
    title: "Mastering UX Research",
    category: "UI/UX",
    lessons: 22,
    duration: "2 hr 10 min",
    price: "$450",
    oldPrice: "$600",
    isFree: false,
    author: "Adam Scott",
    authorImg: "/instructors/adam.jpg",
    rating: 5,
    image: "/courses/uiux.jpg",
  },
  {
    title: "Figma for Beginners",
    category: "UI/UX",
    lessons: 15,
    duration: "1 hr 05 min",
    price: "$150",
    oldPrice: "$250",
    isFree: true,
    author: "Maria Chen",
    authorImg: "/instructors/maria.jpg",
    rating: 5,
    image: "/courses/uiux.jpg",
  },
  {
    title: "UX Writing Essentials",
    category: "UI/UX",
    lessons: 12,
    duration: "55 min",
    price: "$200",
    oldPrice: "$400",
    isFree: false,
    author: "James Lee",
    authorImg: "/instructors/james.jpg",
    rating: 4,
    image: "/courses/uiux.jpg",
  },
  {
    title: "Advanced UI Animations",
    category: "UI/UX",
    lessons: 26,
    duration: "2 hr 30 min",
    price: "$600",
    oldPrice: "$900",
    isFree: false,
    author: "Binodh Sation",
    authorImg: "/instructors/binodh.jpg",
    rating: 5,
    image: "/courses/uiux.jpg",
  },

  // ===== Productivity =====
  {
    title: "Learn & Create ReactJS Tech Fundamentals Apps",
    category: "Productivity",
    lessons: 28,
    duration: "2 hr 10 min",
    price: "$300",
    oldPrice: "$500",
    isFree: true,
    author: "David Bentel",
    authorImg: "/instructors/david.jpg",
    rating: 5,
    image: "/courses/react.jpg",
  },
  {
    title: "Boost Productivity with Notion",
    category: "Productivity",
    lessons: 12,
    duration: "50 min",
    price: "$200",
    oldPrice: "$350",
    isFree: false,
    author: "Sophia Grey",
    authorImg: "/instructors/sophia.jpg",
    rating: 4,
    image: "/courses/react.jpg",
  },
  {
    title: "AI Tools for Work Efficiency",
    category: "Productivity",
    lessons: 18,
    duration: "1 hr 25 min",
    price: "$350",
    oldPrice: "$500",
    isFree: true,
    author: "Michael Ross",
    authorImg: "/instructors/michael.jpg",
    rating: 5,
    image: "/courses/react.jpg",
  },
  {
    title: "Time Management Strategies",
    category: "Productivity",
    lessons: 14,
    duration: "1 hr 15 min",
    price: "$250",
    oldPrice: "$400",
    isFree: false,
    author: "Olivia Kim",
    authorImg: "/instructors/olivia.jpg",
    rating: 5,
    image: "/courses/react.jpg",
  },
  {
    title: "Kanban for Teams",
    category: "Productivity",
    lessons: 10,
    duration: "40 min",
    price: "$180",
    oldPrice: "$300",
    isFree: false,
    author: "David Bentel",
    authorImg: "/instructors/david.jpg",
    rating: 4,
    image: "/courses/react.jpg",
  },
  {
    title: "Deep Work Mastery",
    category: "Productivity",
    lessons: 16,
    duration: "1 hr 10 min",
    price: "$220",
    oldPrice: "$350",
    isFree: false,
    author: "Alex Parker",
    authorImg: "/instructors/alex.jpg",
    rating: 5,
    image: "/courses/react.jpg",
  },

  // ===== Management =====
  {
    title: "The Complete Business and Management Course",
    category: "Management",
    lessons: 25,
    duration: "2 hr 00 min",
    price: "$350",
    oldPrice: "$600",
    isFree: false,
    author: "Calvin Johnson",
    authorImg: "/instructors/calvin.jpg",
    rating: 5,
    image: "/courses/business.jpg",
  },
  {
    title: "Project Management Essentials",
    category: "Management",
    lessons: 20,
    duration: "1 hr 45 min",
    price: "$300",
    oldPrice: "$500",
    isFree: false,
    author: "Ella Wang",
    authorImg: "/instructors/ella.jpg",
    rating: 5,
    image: "/courses/business.jpg",
  },
  {
    title: "Agile Leadership Training",
    category: "Management",
    lessons: 15,
    duration: "1 hr 20 min",
    price: "$400",
    oldPrice: "$650",
    isFree: true,
    author: "John Carter",
    authorImg: "/instructors/john.jpg",
    rating: 5,
    image: "/courses/business.jpg",
  },
  {
    title: "Entrepreneurship 101",
    category: "Management",
    lessons: 18,
    duration: "1 hr 40 min",
    price: "$280",
    oldPrice: "$500",
    isFree: false,
    author: "Sarah Lin",
    authorImg: "/instructors/sarah.jpg",
    rating: 4,
    image: "/courses/business.jpg",
  },
  {
    title: "Financial Management Basics",
    category: "Management",
    lessons: 22,
    duration: "2 hr 10 min",
    price: "$420",
    oldPrice: "$650",
    isFree: false,
    author: "Michael Green",
    authorImg: "/instructors/michael.jpg",
    rating: 5,
    image: "/courses/business.jpg",
  },
  {
    title: "Team Building Strategies",
    category: "Management",
    lessons: 12,
    duration: "55 min",
    price: "$260",
    oldPrice: "$400",
    isFree: false,
    author: "Calvin Johnson",
    authorImg: "/instructors/calvin.jpg",
    rating: 5,
    image: "/courses/business.jpg",
  },

  // ===== Art & Media =====
  {
    title: "Build Creative Arts & Media Course Completed",
    category: "Art & Media",
    lessons: 22,
    duration: "1 hr 30 min",
    price: "$500",
    oldPrice: "$800",
    isFree: false,
    author: "David Bentel",
    authorImg: "/instructors/david.jpg",
    rating: 5,
    image: "/courses/art.jpg",
  },
  {
    title: "Photography Masterclass",
    category: "Art & Media",
    lessons: 30,
    duration: "3 hr 00 min",
    price: "$600",
    oldPrice: "$900",
    isFree: true,
    author: "Liam Brown",
    authorImg: "/instructors/liam.jpg",
    rating: 5,
    image: "/courses/art.jpg",
  },
  {
    title: "Video Editing in Premiere Pro",
    category: "Art & Media",
    lessons: 18,
    duration: "1 hr 25 min",
    price: "$350",
    oldPrice: "$600",
    isFree: false,
    author: "Rachel Adams",
    authorImg: "/instructors/rachel.jpg",
    rating: 4,
    image: "/courses/art.jpg",
  },
  {
    title: "Digital Illustration in Procreate",
    category: "Art & Media",
    lessons: 20,
    duration: "1 hr 50 min",
    price: "$400",
    oldPrice: "$700",
    isFree: false,
    author: "Chris Tan",
    authorImg: "/instructors/chris.jpg",
    rating: 5,
    image: "/courses/art.jpg",
  },
  {
    title: "Storytelling for Filmmakers",
    category: "Art & Media",
    lessons: 15,
    duration: "1 hr 20 min",
    price: "$280",
    oldPrice: "$500",
    isFree: true,
    author: "Anna White",
    authorImg: "/instructors/anna.jpg",
    rating: 5,
    image: "/courses/art.jpg",
  },
  {
    title: "Sound Design Fundamentals",
    category: "Art & Media",
    lessons: 12,
    duration: "55 min",
    price: "$260",
    oldPrice: "$400",
    isFree: false,
    author: "David Bentel",
    authorImg: "/instructors/david.jpg",
    rating: 5,
    image: "/courses/art.jpg",
  },
];
export default function FeaturedCourses() {


  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "UI/UX", "Productivity", "Management", "Art & Media"];

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((c) => c.category === selectedCategory);

  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="container px-4 mx-auto text-center">
        <p className="text-[var(--color-secondary)] font-medium text-sm mb-2">
          Featured Courses
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-3">
          What’s New in AsiaLMS
        </h2>
        <p className="text-gray-600 mb-6">
          Discover our featured courses, specially curated to help you gain in-demand skills.
        </p>

        {/* Dropdown Filter */}
        <div className="mb-10 flex justify-left">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 w-full md:w-1/3 py-2 rounded-lg border border-gray-300 text-[var(--color-text)] bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Course Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {filteredCourses.slice(0, 8).map((c, i) => (
            <CourseCard course={c} key={i} />
          ))}
        </div>
        <button className="px-6 py-2 rounded-full bg-[var(--color-secondary)] text-white font-semibold hover:bg-[var(--color-secondary-hover)] transition mt-12">
          <Link href="/courses">View More</Link>
        </button>
      </div>
    </section>
  );
}
