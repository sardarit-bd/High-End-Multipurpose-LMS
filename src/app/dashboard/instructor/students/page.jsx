"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Gift, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";

const studentsData = [
  {
    id: 1,
    name: "Ronald Richard",
    location: "New York",
    joined: "22 Aug 2025",
    courses: 10,
    image: "/images/ins1.jpg",
  },
  {
    id: 2,
    name: "Mona Nancy",
    location: "Los Angeles",
    joined: "15 Jul 2025",
    courses: 8,
    image: "/images/ins2.jpg",
  },
  {
    id: 3,
    name: "Patrick Alleman",
    location: "Alabama",
    joined: "18 Jun 2025",
    courses: 12,
    image: "/images/ins3.jpg",
  },
  {
    id: 4,
    name: "Olive Paxson",
    location: "Brisbane",
    joined: "03 May 2025",
    courses: 7,
    image: "/images/ins4.jpg",
  },
  {
    id: 5,
    name: "Chris Thomas",
    location: "New York",
    joined: "14 Apr 2025",
    courses: 4,
    image: "/images/ins5.jpg",
  },
  {
    id: 6,
    name: "Joyce Perron",
    location: "Ontario",
    joined: "17 Mar 2025",
    courses: 6,
    image: "/images/ins6.jpg",
  },
];

export default function InstructorStudents() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const filtered = studentsData.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const gotoPage = (n) => {
    if (n >= 1 && n <= totalPages) setPage(n);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-xl font-semibold text-[var(--color-text)]">Students</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
          />
        </div>
      </div>

      {/* Student Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginated.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-[var(--radius-card)] shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-200"
          >
            <div className="relative w-full h-48">
              <Image
                src={s.image}
                alt={s.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-[var(--color-text)]">
                {s.name}
              </h3>

              <div className="mt-2 text-sm text-gray-500">
                <div className="flex items-center gap-1 text-[var(--color-secondary)] hover:underline cursor-pointer">
                  <MapPin size={14} /> {s.location}
                </div>
              </div>

              <div className="mt-3 text-sm text-gray-600 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Gift size={14} className="text-[var(--color-primary)]" />
                  <span>{s.joined}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={14} className="text-[var(--color-accent)]" />
                  <span>{s.courses} Courses</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {paginated.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-10">
            No students found.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Page {page} of {totalPages}
        </div>

        <div className="inline-flex items-center gap-2">
          <button
            onClick={() => gotoPage(page - 1)}
            disabled={page === 1}
            className="p-2 rounded-md bg-white border border-gray-200 disabled:opacity-50"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="hidden sm:flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, i) => {
              const n = i + 1;
              return (
                <button
                  key={n}
                  onClick={() => gotoPage(n)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    n === page
                      ? "bg-[var(--color-primary)] text-white"
                      : "bg-white border border-gray-200 text-gray-700"
                  }`}
                >
                  {n}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => gotoPage(page + 1)}
            disabled={page === totalPages}
            className="p-2 rounded-md bg-white border border-gray-200 disabled:opacity-50"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
