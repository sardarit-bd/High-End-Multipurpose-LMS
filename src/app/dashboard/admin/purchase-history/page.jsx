"use client";
import { ShoppingBag, BookOpen } from "lucide-react";

export default function PurchaseHistoryPage() {
  const purchases = [
    {
      id: "#PH-5001",
      student: "John Doe",
      course: "React for Beginners",
      price: 49,
      date: "2024-10-01",
      status: "Completed",
    },
    {
      id: "#PH-5002",
      student: "Emma Smith",
      course: "Advanced Next.js",
      price: 99,
      date: "2024-10-02",
      status: "Completed",
    },
    {
      id: "#PH-5003",
      student: "Liam Johnson",
      course: "Tailwind CSS Mastery",
      price: 59,
      date: "2024-10-03",
      status: "Refunded",
    },
    {
      id: "#PH-5004",
      student: "Sophia Brown",
      course: "Node.js Crash Course",
      price: 79,
      date: "2024-10-04",
      status: "Pending",
    },
  ];

  return (
    <div className="p-6 space-y-6 text-[var(--color-text)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold text-[--color-text]">
          Purchase History
        </h1>
        <button className="px-4 py-2 bg-[--color-primary] hover:bg-[--color-primary-hover] text-white rounded-[--radius-default] shadow-sm text-sm">
          Export Purchases
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-[--radius-card] shadow-md flex items-center gap-3">
          <div className="p-3 bg-[--color-primary] text-white rounded-full">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Purchases</p>
            <p className="text-xl font-bold">845</p>
          </div>
        </div>
        <div className="p-4 bg-white rounded-[--radius-card] shadow-md flex items-center gap-3">
          <div className="p-3 bg-[--color-secondary] text-white rounded-full">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Courses Sold</p>
            <p className="text-xl font-bold">325</p>
          </div>
        </div>
        <div className="p-4 bg-white rounded-[--radius-card] shadow-md flex items-center gap-3">
          <div className="p-3 bg-[--color-accent] text-white rounded-full">
            $
          </div>
          <div>
            <p className="text-sm text-gray-500">Revenue</p>
            <p className="text-xl font-bold">$42,750</p>
          </div>
        </div>
      </div>

      {/* Purchases Table */}
      <div className="bg-white shadow-md rounded-[--radius-card] p-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left bg-[--color-background] text-[--color-text]">
              <th className="p-3">ID</th>
              <th className="p-3">Student</th>
              <th className="p-3">Course</th>
              <th className="p-3">Price</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr
                key={purchase.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-3 font-medium">{purchase.id}</td>
                <td className="p-3">{purchase.student}</td>
                <td className="p-3">{purchase.course}</td>
                <td className="p-3 font-semibold">${purchase.price}</td>
                <td className="p-3">{purchase.date}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      purchase.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : purchase.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {purchase.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
