"use client";
import { useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { MdVerified, MdPerson } from "react-icons/md";

export default function HeroSection() {
  const [category, setCategory] = useState("");

  return (
    <section className="relative">
      {/* 🎥 Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-35"
        src="/videos/background.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 🔹 Light transparent white overlay */}
      <div className="absolute inset-0 bg-white/70"></div>

      {/* 🔹 Color gradient overlay (for contrast balance) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/20 via-[var(--color-secondary)]/20 to-[var(--color-accent)]/10 mix-blend-multiply"></div>

      {/* 🌟 Main content */}
      <section className="mx-auto py-16 relative overflow-hidden min-h-[90vh] items-center justify-center flex flex-col">
        <div className="container px-4 overflow-hidden mx-auto flex md:flex-row flex-col-reverse items-center justify-between gap-12">
          
          {/* Left Content */}
          <div className="flex-1">
            <span className="inline-block px-5 bg-white/10 text-sm py-1 rounded-full mb-4 text-[var(--color-secondary)]">
              The Leader in Online Learning
            </span>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-[var(--color-text)]">
              Find the{" "}
              <span className="text-[#F9D26E] relative">
                Best Courses
                <svg
                  className="absolute w-full left-0 bottom-[-16px]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1283 132"
                >
                  <path
                    d="M1282.46 5.79c-.91-3.88-5.18-6.65-9.04-5.54-104.37 29.02-193.78 56.87-361.6 74.53-268.41 28.16-539.6 14.6-803.08-26.38C94.9 47.97-.34 26.24.08 41.38c-1.56 14.21 19.47 12.91 29.6 17.24 32.82 8.6 66.1 15.33 99.4 21.81 238.99 44.43 482.98 55.29 725.63 49.01 92.37-4.11 185.68-9.96 275.51-33.09 18.68-6.31 42.79-9.21 55.18-25.89 6.76-13.28-12.41-21.16-13.83-6.12-17.69 11.67-39.31 15.61-59.45 21.34-114.56 25.18-245.31 30.46-361.99 30.36-191.39.45-383.13-10.13-572-42.21 277.31 36.42 560.77 44.96 837.82 2.23 104.21-15.4 195.11-42.74 260.97-61.22a7.57 7.57 0 0 0 5.54-9.05Z"
                    fill="#059669"
                  ></path>
                </svg>
              </span>{" "}
              from the{" "}
              <span className="text-[#F9D26E] relative">
                Best Mentors
              </span>{" "}
              Around the World
            </h1>

            <p className="text-[var(--color-text)]/85 mb-6 max-w-xl">
              Our specialized online courses are designed to bring the classroom
              experience to you, no matter where you are.
            </p>

            {/* 🔍 Search Bar */}
            <div className="md:flex gap-5 bg-[var(--color-text)]/10 backdrop-blur-md rounded-xl shadow-md overflow-hidden w-full">
              <select
                className="px-4 py-3 bg-[var(--color-text)]/0 text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
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
                className="flex-1 px-4 py-3 text-[var(--color-text)] outline-none md:ml-2 md:border-l border-[var(--color-primary)] bg-transparent"
              />
              <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] px-6 flex items-center justify-center text-white transition-colors w-full">
                ➔
              </button>
            </div>

            {/* 📊 Stats */}
            <div className="md:flex gap-8 mt-10">
              <div className="flex items-center gap-2">
                <FaGraduationCap className="text-[var(--color-accent)] text-2xl" />
                <p>
                  <span className="font-bold">10K</span>
                  <br />
                  <span className="text-sm text-[var(--color-text)]/70">
                    Online Courses
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <MdVerified className="text-[var(--color-secondary)] text-2xl" />
                <p>
                  <span className="font-bold">6K</span>
                  <br />
                  <span className="text-sm text-[var(--color-text)]/70">
                    Certified Courses
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <MdPerson className="text-[var(--color-primary)] text-2xl" />
                <p>
                  <span className="font-bold">2K</span>
                  <br />
                  <span className="text-sm text-[var(--color-text)]/70">
                    Experienced Tutors
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* 🎓 Right Side - Course Preview */}
          <div className="flex-1 flex justify-center md:justify-end">
            <video
              className="rounded-xl shadow-lg w-full max-w-4xl border border-[var(--color-primary)]/20"
              src="/lms.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </section>
    </section>
  );
}
