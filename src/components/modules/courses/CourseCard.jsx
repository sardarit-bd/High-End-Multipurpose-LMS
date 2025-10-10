
import Link from 'next/link';
import React from 'react'
import { FaRegClock } from 'react-icons/fa';
import { GiBlackBook } from "react-icons/gi";
export default function CourseCard({ course }) {
    return (
        <div className="bg-white shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden w-full flex flex-col">
            {/* Image + Category Badge */}
            <div className="relative">
                <img
                    src={course.image}
                    alt={course.title}
                    className="h-44 w-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-[var(--color-secondary)] text-white text-xs font-semibold px-3 py-1 rounded-md">
                    {course.category}
                </span>
            </div>

            {/* Body */}
            <div className="p-5 text-left text-[var(--color-text)]">
                {/* Lessons + Duration */}
                <div className="flex justify-between text-sm mb-2 text-[var(--color-text)]">
                    <div className='flex gap-2 items-center'> <GiBlackBook /><span>{course.lessons} Lessons</span></div>
                    <div className='flex gap-2 items-center'><FaRegClock /> <span>{course.duration}</span></div>
                </div>

                {/* Title */}
                <h3 className="font-semibold mb-3 line-clamp-2">{course.title}</h3>

                {/* Pricing */}
                <div className="mb-3">
                    <span className="text-[var(--color-primary)] font-bold">{course.price}</span>
                    {course.oldPrice && (
                        <span className="line-through text-gray-400 text-sm ml-2">
                            {course.oldPrice}
                        </span>
                    )}
                    {course.isFree && (
                        <span className="text-[var(--color-accent)] font-bold ml-3">Free</span>
                    )}
                </div>

                {/* Instructor + Rating */}
                <div className="flex items-center">
                    <img
                        src={course.authorImg}
                        alt={course.author}
                        className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-sm">{course.author}</span>
                    <span className="ml-auto text-[var(--color-accent)]">
                        {"★".repeat(course.rating)}{"☆".repeat(5 - course.rating)}
                    </span>
                </div>
            </div>
            <button className="my-5 self-end mx-auto bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-4 py-2 rounded-md text-sm font-medium">
                <Link href="courses/daynamic_slug">View Course</Link>
            </button>
        </div>
    )
}

