"use client";
import { Edit, Eye, Trash2, PlayCircle } from "lucide-react";
import Link from "next/link";

export default function ManageCourses() {
  const courses = [
    {
      id: "#C-01",
      title: "React for Beginners",
      instructor: "John Doe",
      category: "Web Development",
      students: 120,
      status: "Published",
      created: "2023-06-15",
    },
    {
      id: "#C-02",
      title: "Advanced Tailwind CSS",
      instructor: "Sarah Johnson",
      category: "UI/UX Design",
      students: 80,
      status: "Draft",
      created: "2023-08-20",
    },
    {
      id: "#C-03",
      title: "Next.js Full Guide",
      instructor: "Michael Smith",
      category: "Web Development",
      students: 200,
      status: "Published",
      created: "2024-01-05",
    },
    {
      id: "#C-04",
      title: "Data Science with Python",
      instructor: "Emily Clark",
      category: "Data Science",
      students: 95,
      status: "Pending",
      created: "2024-02-12",
    },
  ];

  return (
    <div className="p-6 space-y-6 text-[var(--color-text)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-[--color-text]">Manage Courses</h1>
      </div>

      {/* Responsive Table */}
      <div className="rounded-[--radius-card] shadow-md bg-white p-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left bg-[var(--color-background)] text-[var(--color-text)] text-sm">
              <th className="p-3">ID</th>
              <th className="p-3">Title</th>
              <th className="p-3">Instructor</th>
              <th className="p-3">Category</th>
              <th className="p-3">Students</th>
              <th className="p-3">Status</th>
              <th className="p-3">Created</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-b hover:bg-gray-50 text-sm">
                <td className="p-3 font-medium">{course.id}</td>
                <td className="p-3 font-medium">{course.title}</td>
                <td className="p-3">{course.instructor}</td>
                <td className="p-3">{course.category}</td>
                <td className="p-3">{course.students}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      course.status === "Published"
                        ? "bg-[var(--color-primary)] text-white"
                        : course.status === "Draft"
                        ? "bg-gray-200 text-gray-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {course.status}
                  </span>
                </td>
                <td className="p-3 text-gray-500">{course.created}</td>
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
                  <button className="p-2 rounded-full hover:bg-green-100 text-green-600">
                    <Link href='/dashboard/student/leader-board'>Leader Board</Link>
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
