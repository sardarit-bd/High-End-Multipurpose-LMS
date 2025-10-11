"use client";
import { useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { MdVerified, MdPerson, MdSearch, MdKeyboardArrowDown } from "react-icons/md";

export default function HeroSection() {
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e?.preventDefault();
    // TODO: hook up your search action here (route, API, etc.)
    // console.log({ category, query });
  };

  return (
    <section className="relative">
      {/* 🎥 Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-35"
        src="/videos/background.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 🔹 Light transparent white overlay */}
      <div className="absolute inset-0 bg-white/50" />

      {/* 🔹 Color gradient overlay (for contrast balance) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/20 via-[var(--color-secondary)]/20 to-[var(--color-accent)]/10 mix-blend-multiply" />

      {/* 🌟 Main content */}
      <section className="relative mx-auto flex min-h-[90vh] flex-col items-center justify-center overflow-hidden py-16">
        <div className="container mx-auto flex flex-col-reverse items-center justify-between gap-12 px-4 md:flex-row">
          {/* Left Content */}
          <div className="flex-1">
            <span
              className="mb-4 inline-block rounded-full px-5 py-1 text-sm"
              style={{
                background: "rgba(255,255,255,0.6)",
                color: "var(--color-secondary)",
                boxShadow: "var(--shadow-soft)",
              }}
            >
              The Leader in Online Learning
            </span>

            <h1 className="mb-6 text-4xl font-bold leading-tight text-[var(--color-text)] md:text-5xl">
              Find the{" "}
              <span className="relative text-[#F9D26E]">
                Best Courses
                <svg
                  className="absolute left-0 -bottom-4 w-full"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1283 132"
                >
                  <path
                    d="M1282.46 5.79c-.91-3.88-5.18-6.65-9.04-5.54-104.37 29.02-193.78 56.87-361.6 74.53-268.41 28.16-539.6 14.6-803.08-26.38C94.9 47.97-.34 26.24.08 41.38c-1.56 14.21 19.47 12.91 29.6 17.24 32.82 8.6 66.1 15.33 99.4 21.81 238.99 44.43 482.98 55.29 725.63 49.01 92.37-4.11 185.68-9.96 275.51-33.09 18.68-6.31 42.79-9.21 55.18-25.89 6.76-13.28-12.41-21.16-13.83-6.12-17.69 11.67-39.31 15.61-59.45 21.34-114.56 25.18-245.31 30.46-361.99 30.36-191.39.45-383.13-10.13-572-42.21 277.31 36.42 560.77 44.96 837.82 2.23 104.21-15.4 195.11-42.74 260.97-61.22a7.57 7.57 0 0 0 5.54-9.05Z"
                    fill="#059669"
                  />
                </svg>
              </span>{" "}
              from the{" "}
              <span className="text-[#F9D26E]">Best Mentors</span> Around the World
            </h1>

            <p className="mb-6 max-w-xl text-[var(--color-text)]/85">
              Our specialized online courses are designed to bring the classroom experience to you, no matter where you are.
            </p>

            {/* 🔍 Search Bar (card, custom select, white inputs) */}
            <form
              onSubmit={handleSubmit}
              className="w-full rounded-xl p-1"
            >
              <div className="flex flex-col gap-2 md:flex-row md:gap-3">
                {/* Custom Select */}
                <div className="relative md:w-[240px]">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="
                      w-full appearance-none rounded-lg bg-white px-4 py-3 pr-10
                      text-[var(--color-text)] outline-none transition
                      focus:ring-2 focus:ring-[var(--color-primary)]
                      placeholder-[var(--color-text)]/60
                    "
                    style={{ boxShadow: "var(--shadow-soft)" }}
                  >
                    <option value="">Select Category</option>
                    <option value="tech">Technology</option>
                    <option value="design">Design</option>
                    <option value="business">Business</option>
                  </select>
                  <MdKeyboardArrowDown
                    size={20}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-70"
                    color="currentColor"
                  />
                </div>

                {/* Search Input */}
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for Courses, Instructors"
                  className="
                    flex-1 rounded-lg bg-white px-4 py-3
                    text-[var(--color-text)] outline-none transition
                    placeholder-[var(--color-text)]/60
                    focus:ring-2 focus:ring-[var(--color-primary)]
                  "
                  style={{ boxShadow: "var(--shadow-soft)" }}
                />

                {/* Submit Button (icon, no arrow char) */}
                <button
                  type="submit"
                  aria-label="Search"
                  title="Search"
                  className="
                    inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3
                    text-white transition md:w-[140px]
                  "
                  style={{
                    background: "var(--color-primary)",
                    boxShadow: "var(--shadow-medium)",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget).style.background = "var(--color-primary-hover)")}
                  onMouseLeave={(e) => ((e.currentTarget).style.background = "var(--color-primary)")}
                >
                  <MdSearch size={20} />
                  <span className="hidden md:inline">Search</span>
                </button>
              </div>
            </form>

            {/* 📊 Stats */}
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-xl bg-white/80 p-4" style={{ boxShadow: "var(--shadow-soft)" }}>
                <FaGraduationCap className="text-2xl text-[var(--color-accent)]" />
                <p>
                  <span className="font-bold text-[var(--color-text)]">10K</span>
                  <br />
                  <span className="text-sm text-[var(--color-text)]/70">Online Courses</span>
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white/80 p-4" style={{ boxShadow: "var(--shadow-soft)" }}>
                <MdVerified className="text-2xl text-[var(--color-secondary)]" />
                <p>
                  <span className="font-bold text-[var(--color-text)]">6K</span>
                  <br />
                  <span className="text-sm text-[var(--color-text)]/70">Certified Courses</span>
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white/80 p-4" style={{ boxShadow: "var(--shadow-soft)" }}>
                <MdPerson className="text-2xl text-[var(--color-primary)]" />
                <p>
                  <span className="font-bold text-[var(--color-text)]">2K</span>
                  <br />
                  <span className="text-sm text-[var(--color-text)]/70">Experienced Tutors</span>
                </p>
              </div>
            </div>
          </div>

          {/* 🎓 Right Side - Course Preview */}
          <div className="flex flex-1 justify-center md:justify-end">
            <video
              className="w-full max-w-4xl rounded-xl shadow-lg"
              style={{ boxShadow: "var(--shadow-medium)" }}
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
