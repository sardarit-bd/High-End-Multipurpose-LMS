// app/dashboard/admin/badges/page.jsx
"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import BadgesGrid from "./BadgesGrid";

export default function BadgesPage() {
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
          <h1 className="text-2xl font-bold text-[--color-text]">Badges</h1>
          <p className="text-sm text-gray-500 mt-1">Manage achievement badges</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search badges by title..."
          value={search}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-3 rounded-[--radius-card] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#189E75] bg-white"
        />
      </div>

      {/* Badges Grid with Form */}
      <BadgesGrid
        search={search}
        page={page}
        limit={limit}
        onPageChange={setPage}
      />
    </div>
  );
}