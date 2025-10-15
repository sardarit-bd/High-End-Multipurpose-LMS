"use client";
import React, { useState } from "react";
import CourseCard from "../courses/CourseCard";
import Link from "next/link";
import { TbCategoryPlus } from "react-icons/tb";
import { useTranslation } from "react-i18next";

export const courses = [
  // ===== UI/UX =====
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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
    id: 12,
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
    id: 13,
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
    id: 14,
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
    id: 15,
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
    id: 16,
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
    id: 17,
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
    id: 18,
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
    id: 19,
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
    id: 20,
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
    id: 21,
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
    id: 22,
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
    id: 23,
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
    id: 24,
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
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Use original English categories for filtering logic
  const originalCategories = ["All", "UI/UX", "Productivity", "Management", "Art & Media"];
  
  // Translated categories for display only
  const translatedCategories = [
    t("courses.categories.all") || "All", 
    t("courses.categories.uiux") || "UI/UX", 
    t("courses.categories.productivity") || "Productivity", 
    t("courses.categories.management") || "Management", 
    t("courses.categories.artMedia") || "Art & Media"
  ];

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((c) => c.category === selectedCategory);

  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="container px-4 mx-auto text-center">
        <p className="text-[var(--color-secondary)] font-medium text-sm mb-2">
          {t("courses.featuredSubtitle") || "Featured Courses"}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-3">
          {t("courses.title") || "What's New in AsiaLMS"}
        </h2>
        <p className="text-gray-600 mb-6">
          {t("courses.description") || "Discover our featured courses, specially curated to help you gain in-demand skills."}
        </p>
        
        {/* Dropdown Filter */}
        <div className="mb-10 flex justify-between items-center gap-4 flex-col md:flex-row">
          <h1 className="text-xl font-bold text-[var(--color-text)]">
            <TbCategoryPlus className="inline" /> {t("courses.filterBy") || "Filter By:"}
          </h1>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 w-full md:w-1/5 py-2 rounded-lg border border-gray-300 text-[var(--color-text)] bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            {originalCategories.map((cat, index) => (
              <option key={cat} value={cat}>
                {translatedCategories[index]}
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
        
        {/* Show message if no courses found */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">
              {t("courses.noCoursesFound") || "No courses found for this category."}
            </p>
          </div>
        )}
        
        <button className="px-6 py-2 rounded-full bg-[var(--color-secondary)] text-white font-semibold hover:bg-[var(--color-secondary-hover)] transition mt-12">
          <Link href="/courses">
            {t("courses.viewMore") || "View More"}
          </Link>
        </button>
      </div>
    </section>
  );
}