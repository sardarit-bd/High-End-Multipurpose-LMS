"use client";
import { Edit, Eye, Trash2, Ban } from "lucide-react";

export default function ManageInstructors() {
  const instructors = [
    { id: "#I-01", name: "Alex Carter", email: "alex@academy.com", courses: 8, students: 120, status: "Active", joined: "2023-11-12" },
    { id: "#I-02", name: "Maria Lopez", email: "maria@academy.com", courses: 5, students: 90, status: "Suspended", joined: "2024-01-22" },
    { id: "#I-03", name: "David Wilson", email: "david@academy.com", courses: 12, students: 200, status: "Active", joined: "2022-08-17" },
    { id: "#I-04", name: "Sophia Taylor", email: "sophia@academy.com", courses: 6, students: 75, status: "Active", joined: "2023-05-10" },
  ];

  return (
    <div className="p-6 space-y-6 text-[var(--color-text)]">
      {/* Header */}
      <h1 className="text-2xl font-bold text-[--color-text]">Manage Instructors</h1>

      {/* Responsive Table */}
      <div className="rounded-[--radius-card] shadow-md bg-white p-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left bg-[var(--color-background)] text-[var(--color-text)] text-sm">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Courses</th>
              <th className="p-3">Students</th>
              <th className="p-3">Status</th>
              <th className="p-3">Joined</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {instructors.map((instructor) => (
              <tr key={instructor.id} className="border-b hover:bg-gray-50 text-sm">
                <td className="p-3 font-medium">{instructor.id}</td>
                <td className="p-3">{instructor.name}</td>
                <td className="p-3 text-gray-500">{instructor.email}</td>
                <td className="p-3">{instructor.courses}</td>
                <td className="p-3">{instructor.students}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      instructor.status === "Active"
                        ? "bg-[var(--color-primary)] text-white"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {instructor.status}
                  </span>
                </td>
                <td className="p-3 text-gray-500">{instructor.joined}</td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
