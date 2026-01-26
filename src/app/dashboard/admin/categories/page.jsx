"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import CategoriesGrid from "./CategoriesGrid";

export default function CategoriesPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(12);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="p-6 space-y-6 text-[var(--color-text)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[--color-text]">Categories</h1>
          <p className="text-sm text-gray-500 mt-1">Manage course categories</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search categories by title..."
          value={search}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-3 rounded-[--radius-card] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#189E75] bg-white"
        />
      </div>

      {/* Categories Grid with Form */}
      <CategoriesGrid
        search={search}
        page={page}
        limit={limit}
        onPageChange={setPage}
      />
    </div>
  );
}