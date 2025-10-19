"use client";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function CartPage() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Information About UI/UX Design Degree",
      price: 120,
      instructor: "David Benitez",
      level: "Intermediate",
      rating: 4.9,
      reviews: 200,
      image: "/courses/uiux.jpg",
    },
    {
      id: 2,
      title: "Sketch from A to Z (2024): Become an app designer",
      price: 160,
      instructor: "Andrew Pirtle",
      level: "Basic",
      rating: 4.6,
      reviews: 170,
      image: "/courses/react.jpg",
    },
  ]);

  const clearCart = () => setCourses([]);
  const removeItem = (id) => setCourses(courses.filter((c) => c.id !== id));
  const subtotal = courses.reduce((sum, c) => sum + c.price, 0);

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-12">
      <div className="bg-white shadow-md rounded-[var(--radius-card)] p-6 container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-[var(--color-secondary)]">
            {courses.length} Courses
          </h2>
          {courses.length > 0 && (
            <button
              onClick={clearCart}
              className="text-[var(--color-primary)] text-sm flex items-center gap-1 border border-[var(--color-primary)] rounded-full px-3 py-1 hover:bg-[var(--color-primary)] hover:text-white transition"
            >
              Clear cart
            </button>
          )}
        </div>

        {/* Courses List */}
        <div className="space-y-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between border rounded-[var(--radius-default)] p-4"
            >
              {/* Left Section */}
              <div className="flex gap-4">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={120}
                  height={80}
                  className="rounded-md object-cover"
                />
                <div>
                  <p className="text-sm text-gray-600">{course.instructor}</p>
                  <h3 className="font-medium text-[var(--color-text)]">{course.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <span>⭐ {course.rating} ({course.reviews} Reviews)</span>
                    <span>•</span>
                    <span>{course.level}</span>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <p className="text-[var(--color-primary)] font-semibold">
                  ${course.price}
                </p>
                <button
                  onClick={() => removeItem(course.id)}
                  className="text-gray-400 hover:text-[var(--color-accent)] transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Subtotal Section */}
        {courses.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Subtotal</span>
              <span className="font-semibold text-[var(--color-text)]">${subtotal}</span>
            </div>
            <p className="text-xs text-gray-500">
              All Courses have a{" "}
              <span className="font-medium text-[var(--color-accent)]">30-day</span>{" "}
              money-back guarantee
            </p>
          </div>
        )}

        {/* Actions */}
        {courses.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            {/* <button className="w-full sm:w-auto px-6 py-2 rounded-[var(--radius-default)] bg-[var(--color-accent)] text-[var(--color-text)] font-medium hover:bg-[var(--color-accent-hover)] transition">
              <Link href='/course'>Continue Shopping</Link>
            </button> */}
            <button className="w-full sm:w-auto px-6 py-2 rounded-[var(--radius-default)] bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary-hover)] shadow-md transition">
              <Link href='/checkout'>Checkout</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
