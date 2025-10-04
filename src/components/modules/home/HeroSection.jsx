"use client";
import { useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { MdVerified, MdPerson } from "react-icons/md";

export default function HeroSection() {
  const [category, setCategory] = useState("");

  return (
    <section className="mx-auto py-16 text-[var(--color-text)] relative overflow-hidden bg-[var(--color-background)]">
      <div className="container px-4 mx-auto flex md:flex-row flex-col items-center justify-between gap-12 mt-12">
        
        {/* Left Content */}
        <div className="flex-1">
          <span className="inline-block bg-white/10 text-sm px-4 py-1 rounded-full mb-4 text-[var(--color-secondary)]">
            The Leader in Online Learning
          </span>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-[var(--color-text)]">
            Find the <span className="text-[var(--color-primary)] underline">Best Courses</span> from the{" "}
            <span className="text-[var(--color-primary)] underline">Best Mentors</span> Around the World
          </h1>

          <p className="text-[var(--color-text)]/80 mb-6">
            Our specialized online courses are designed to bring the classroom experience to you,
            no matter where you are.
          </p>

          {/* Search Bar */}
          <div className="flex bg-white rounded-xl shadow-md overflow-hidden w-full max-w-xl">
            <select
              className="px-4 py-3 text-[var(--color-text)] border-r border-[var(--color-primary)]"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="tech">Technology</option>
              <option value="design">Design</option>
              <option value="business">Business</option>
            </select>
            <input
              type="text"
              placeholder="Search for Courses, Instructors"
              className="flex-1 px-4 py-3 text-[var(--color-text)] outline-none"
            />
            <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] px-6 flex items-center justify-center text-white transition-colors">
              ➔
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-10">
            <div className="flex items-center gap-2">
              <FaGraduationCap className="text-[var(--color-accent)] text-2xl" />
              <p>
                <span className="font-bold">10K</span>
                <br />
                <span className="text-sm text-[var(--color-text)]/70">Online Courses</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <MdVerified className="text-[var(--color-secondary)] text-2xl" />
              <p>
                <span className="font-bold">6K</span>
                <br />
                <span className="text-sm text-[var(--color-text)]/70">Certified Courses</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <MdPerson className="text-[var(--color-primary)] text-2xl" />
              <p>
                <span className="font-bold">2K</span>
                <br />
                <span className="text-sm text-[var(--color-text)]/70">Experienced Tutors</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Course Card */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="bg-white rounded-2xl shadow-xl p-4 max-w-sm">
            <div className="h-40 w-full bg-[var(--color-accent)] rounded-xl mb-4 flex items-center justify-center">
              <span className="text-xl font-bold text-white">Course Image</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="mentor"
                className="w-10 h-10 rounded-full"
              />
              <p className="text-[var(--color-text)] font-medium">Edith Dorsey</p>
            </div>
            <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
              Build Creative Arts & Media Course Completed
            </h3>
            <p className="text-sm text-[var(--color-text)]/70 mb-2">⭐ 4.9 (178 Reviews)</p>
            <p className="text-xl font-bold text-[var(--color-primary)] mb-4">$190</p>
            <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-4 py-2 rounded-full w-full transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
