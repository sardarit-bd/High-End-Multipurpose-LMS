"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import StudentsGrid from "./StudentsGrid";

export default function ManageStudents() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(8);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="p-6 space-y-6 text-[var(--color-text)]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[--color-text]">Manage Students</h1>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          autoFocus
          placeholder="Search students by name or email..."
          value={search}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-3 rounded-[--radius-card] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Students Grid Component */}
      <StudentsGrid
        search={search}
        page={page}
        limit={limit}
        onPageChange={setPage}
      />
    </div>
  );
}