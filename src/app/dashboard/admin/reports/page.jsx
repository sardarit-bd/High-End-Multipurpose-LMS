"use client";
import { FileText, Users, BookOpen, TrendingUp } from "lucide-react";

export default function ReportsPage() {
  const reports = [
    {
      id: "#R-001",
      title: "Monthly Revenue Report",
      date: "2024-09-01",
      status: "Completed",
    },
    {
      id: "#R-002",
      title: "Course Enrollment Report",
      date: "2024-09-10",
      status: "Completed",
    },
    {
      id: "#R-003",
      title: "Student Activity Report",
      date: "2024-09-15",
      status: "Pending",
    },
    {
      id: "#R-004",
      title: "Instructor Performance Report",
      date: "2024-09-20",
      status: "In Progress",
    },
  ];

  return (
    <div className="p-6 space-y-6 text-[var(--color-text)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-[--color-text]">Reports</h1>
        <button className="px-4 py-2 bg-[--color-primary] hover:bg-[--color-primary-hover] text-white rounded-[--radius-default] shadow-sm text-sm">
          + Generate Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-[--radius-card] bg-white shadow-md flex items-center gap-3">
          <div className="p-3 bg-[--color-primary] text-white rounded-full">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Reports</p>
            <p className="text-xl font-bold">152</p>
          </div>
        </div>
        <div className="p-4 rounded-[--radius-card] bg-white shadow-md flex items-center gap-3">
          <div className="p-3 bg-[--color-secondary] text-white rounded-full">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Active Students</p>
            <p className="text-xl font-bold">3,452</p>
          </div>
        </div>
        <div className="p-4 rounded-[--radius-card] bg-white shadow-md flex items-center gap-3">
          <div className="p-3 bg-[--color-accent] text-white rounded-full">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Courses Tracked</p>
            <p className="text-xl font-bold">87</p>
          </div>
        </div>
        <div className="p-4 rounded-[--radius-card] bg-white shadow-md flex items-center gap-3">
          <div className="p-3 bg-emerald-500 text-white rounded-full">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Revenue Growth</p>
            <p className="text-xl font-bold">+18%</p>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="rounded-[--radius-card] shadow-md bg-white p-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left bg-[var(--color-background)] text-[var(--color-text)] text-sm">
              <th className="p-3">ID</th>
              <th className="p-3">Title</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-b hover:bg-gray-50 text-sm">
                <td className="p-3 font-medium">{report.id}</td>
                <td className="p-3">{report.title}</td>
                <td className="p-3">{report.date}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      report.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : report.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {report.status}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <button className="text-[--color-secondary] hover:text-[--color-secondary-hover] text-sm">
                    View
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
