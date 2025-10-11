"use client";

import { Pencil, Eye, Trash2 } from "lucide-react";

const purchases = [
  {
    id: 1,
    course: "Digital Marketing Mastery SEO & Social Media",
    price: "£29.99",
    status: "Verified",
    method: "Master Card",
    date: "23-10-2024",
  },
  {
    id: 2,
    course: "Healthy Cooking at Home: Nutritious Recipes",
    price: "£27.99",
    status: "Verified",
    method: "Amazon Pay",
    date: "23-10-2024",
  },
  {
    id: 3,
    course: "Unlocking Insights with Data Analysis",
    price: "£19.99",
    status: "Verified",
    method: "American Express",
    date: "23-10-2024",
  },
  {
    id: 4,
    course: "The Art of Web Design: Creating Digital Experiences",
    price: "£39.99",
    status: "Verified",
    method: "Google Pay",
    date: "23-10-2024",
  },
  {
    id: 5,
    course: "Photography Fundamentals: From Beginner to Pro",
    price: "£44.99",
    status: "Verified",
    method: "American Express",
    date: "23-10-2024",
  },
];

export default function PurchaseHistory() {
  return (
    <div className="bg-white shadow-md px-4 p-6 md:p-12 rounded-lg text-[var(--color-text)]">
      <h2 className="text-xl font-bold mb-4">Purchase History</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 text-sm">Course</th>
              <th className="p-3 text-sm">Price</th>
              <th className="p-3 text-sm">Payment Status</th>
              <th className="p-3 text-sm">Payment Method</th>
              <th className="p-3 text-sm">Date</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="p-3">{p.course}</td>
                <td className="p-3">{p.price}</td>
                <td className="p-3">
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                    {p.status}
                  </span>
                </td>
                <td className="p-3">{p.method}</td>
                <td className="p-3">{p.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 md:hidden">
        {purchases.map((p) => (
          <div
            key={p.id}
            className="border rounded-lg p-4 shadow-sm bg-gray-50"
          >
            <h3 className="font-semibold text-gray-800">{p.course}</h3>
            <p className="text-sm text-gray-600 mt-1">
              <strong>Price:</strong> {p.price}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Status:</strong>{" "}
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                {p.status}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              <strong>Method:</strong> {p.method}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Date:</strong> {p.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
