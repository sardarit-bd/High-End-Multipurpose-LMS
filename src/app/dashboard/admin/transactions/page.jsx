"use client";
import { CreditCard, ArrowDownCircle, ArrowUpCircle } from "lucide-react";

export default function TransactionsPage() {
  const transactions = [
    {
      id: "#TX-1001",
      user: "John Doe",
      type: "Credit",
      amount: 120,
      date: "2024-10-01",
      status: "Completed",
    },
    {
      id: "#TX-1002",
      user: "Emma Smith",
      type: "Debit",
      amount: 60,
      date: "2024-10-02",
      status: "Pending",
    },
    {
      id: "#TX-1003",
      user: "Liam Johnson",
      type: "Credit",
      amount: 240,
      date: "2024-10-03",
      status: "Completed",
    },
    {
      id: "#TX-1004",
      user: "Sophia Brown",
      type: "Debit",
      amount: 50,
      date: "2024-10-04",
      status: "Failed",
    },
  ];

  return (
    <div className="p-6 space-y-6 text-[var(--color-text)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold text-[--color-text]">Transactions</h1>
        <button className="px-4 py-2 bg-[--color-primary] hover:bg-[--color-primary-hover] text-white rounded-[--radius-default] shadow-sm text-sm">
          Export Transactions
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-[--radius-card] shadow-md flex items-center gap-3">
          <div className="p-3 bg-green-100 text-green-600 rounded-full">
            <ArrowDownCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Credits</p>
            <p className="text-xl font-bold">$12,540</p>
          </div>
        </div>
        <div className="p-4 bg-white rounded-[--radius-card] shadow-md flex items-center gap-3">
          <div className="p-3 bg-red-100 text-red-600 rounded-full">
            <ArrowUpCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Debits</p>
            <p className="text-xl font-bold">$4,320</p>
          </div>
        </div>
        <div className="p-4 bg-white rounded-[--radius-card] shadow-md flex items-center gap-3">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Net Balance</p>
            <p className="text-xl font-bold">$8,220</p>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white shadow-md rounded-[--radius-card] p-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left bg-[--color-background] text-[--color-text]">
              <th className="p-3">ID</th>
              <th className="p-3">User</th>
              <th className="p-3">Type</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-3 font-medium">{tx.id}</td>
                <td className="p-3">{tx.user}</td>
                <td className="p-3">{tx.type}</td>
                <td className="p-3 font-semibold">${tx.amount}</td>
                <td className="p-3">{tx.date}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tx.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : tx.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {tx.status}
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
