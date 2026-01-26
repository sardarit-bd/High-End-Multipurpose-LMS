"use client";
import { useState } from "react";
import { Plus, Search } from "lucide-react";
import AdminsTable from "./AdminsTable";

export default function ManageAdmins() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="p-6 space-y-6 text-[var(--color-text)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[--color-text]">Manage Admins</h1>
          <p className="text-sm text-gray-500 mt-1">Manage administrator accounts and permissions</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-[#189E75] hover:bg-[#147c5e] text-white rounded-[--radius-default] shadow-sm text-sm font-medium flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add New Admin
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search admins by name or email..."
          value={search}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-3 rounded-[--radius-card] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#189E75] bg-white"
        />
      </div>

      {/* Admins Table Component */}
      <AdminsTable
        search={search}
        page={page}
        limit={limit}
        onPageChange={setPage}
        showCreateModal={showCreateModal}
        onCloseCreateModal={() => setShowCreateModal(false)}
      />
    </div>
  );
}