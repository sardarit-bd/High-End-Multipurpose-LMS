"use client";
import { motion } from "framer-motion";
import { Edit, Eye, Trash2, Ban } from "lucide-react";

export default function ManageStudents() {
  const students = [
    { id: "01", name: "John Doe", email: "john@example.com", courses: 5, status: "Active", joined: "2024-08-15" },
    { id: "02", name: "Jane Smith", email: "jane@example.com", courses: 3, status: "Suspended", joined: "2024-06-21" },
    { id: "03", name: "Michael Brown", email: "michael@example.com", courses: 7, status: "Active", joined: "2024-04-02" },
    { id: "04", name: "Sarah Johnson", email: "sarah@example.com", courses: 2, status: "Active", joined: "2024-02-10" },
  ];

  return (
    <div className="p-6 space-y-6 text-[var(--color-text)]">
      {/* Header */}
      <h1 className="text-2xl font-bold text-[--color-text]">Manage Students</h1>

      {/* Table Card */}
      <div className="rounded-[--radius-card] shadow-md bg-white p-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left bg-gray-50 text-gray-600 text-sm">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Courses</th>
              <th className="p-3">Status</th>
              <th className="p-3">Joined</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <motion.tr
                key={student.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b hover:bg-gray-50 text-sm"
              >
                <td className="p-3 font-medium text-gray-700">{student.id}</td>
                <td className="p-3">{student.name}</td>
                <td className="p-3 text-gray-500">{student.email}</td>
                <td className="p-3">{student.courses}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${student.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                      }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="p-3 text-gray-500">{student.joined}</td>
                <td className="p-3 flex gap-2 justify-center">
                  <button className="p-2 rounded-full hover:bg-blue-100 text-blue-600">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-yellow-100 text-yellow-600">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-orange-100 text-orange-600">
                    <Ban className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-red-100 text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
