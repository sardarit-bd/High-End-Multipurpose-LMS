"use client";
import { Edit, Eye, Trash2 } from "lucide-react";

export default function ManageAdmins() {
  const admins = [
    { id: "#A-01", name: "John Doe", email: "john@academy.com", role: "Super Admin", status: "Active", joined: "2023-01-15" },
    { id: "#A-02", name: "Emily Clark", email: "emily@academy.com", role: "Admin", status: "Active", joined: "2023-04-20" },
    { id: "#A-03", name: "Michael Smith", email: "michael@academy.com", role: "Moderator", status: "Suspended", joined: "2022-11-02" },
    { id: "#A-04", name: "Sarah Johnson", email: "sarah@academy.com", role: "Admin", status: "Active", joined: "2024-02-10" },
  ];

  return (
    <div className="p-6 space-y-6 text-[var(--color-text)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-[--color-text]">Manage Admins</h1>
        <button className="px-4 py-2 bg-[--color-primary] hover:bg-[--color-primary-hover] text-[var(--color-text)] rounded-[--radius-default] shadow-sm text-sm">
          + Add New Admin
        </button>
      </div>

      {/* Responsive Table */}
      <div className="rounded-[--radius-card] shadow-md bg-white p-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left bg-[var(--color-background)] text-[var(--color-text)] text-sm">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Joined</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id} className="border-b hover:bg-gray-50 text-sm">
                <td className="p-3 font-medium">{admin.id}</td>
                <td className="p-3">{admin.name}</td>
                <td className="p-3 text-gray-500">{admin.email}</td>
                <td className="p-3">{admin.role}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      admin.status === "Active"
                        ? "bg-[var(--color-primary)] text-white"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {admin.status}
                  </span>
                </td>
                <td className="p-3 text-gray-500">{admin.joined}</td>
                <td className="p-3 flex gap-2 justify-center">
                  <button className="p-2 rounded-full hover:bg-blue-100 text-blue-600">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-yellow-100 text-yellow-600">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-red-100 text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
