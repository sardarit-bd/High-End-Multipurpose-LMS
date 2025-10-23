"use client";

import Link from "next/link";
import { CheckCircle, CreditCard, CalendarDays, Package } from "lucide-react";

export default function Page() {
    const order = {
        id: "ORD-20251023-8745",
        date: "October 23, 2025",
        items: [
            { name: "Next.js Crash Course", qty: 1, price: "$599" }
        ],
        total: "$599",
        paymentMethod: "Stripe (Credit Card)",
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center brandBg px-6 py-16">
            {/* ✅ Card container */}
            <div className="bg-white text-gray-900 rounded-2xl shadow-2xl max-w-lg w-full p-8 text-center">
                {/* Success Icon */}
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />

                {/* Title */}
                <h1 className="text-3xl font-semibold mb-2 brandColor">
                    Payment Successful 🎉
                </h1>
                <p className="text-gray-600 mb-8">
                    Thank you for your purchase! Your order has been confirmed and payment
                    was successful.
                </p>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-xl p-5 mb-6 text-left border border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-lg font-semibold text-gray-800">Order Summary</h2>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                            <CalendarDays className="w-4 h-4" /> {order.date}
                        </span>
                    </div>

                    <ul className="divide-y divide-gray-200 mb-3">
                        {order.items.map((item, i) => (
                            <li key={i} className="flex justify-between py-2 text-sm text-gray-700">
                                <span>{item.name} × {item.qty}</span>
                                <span className="font-medium">{item.price}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Payment Method</span>
                        <span className="flex items-center gap-1 text-gray-800 font-medium">
                            <CreditCard className="w-4 h-4" /> {order.paymentMethod}
                        </span>
                    </div>

                    <div className="flex justify-between items-center border-t border-gray-200 pt-3 mt-2">
                        <span className="font-semibold text-gray-800">Total</span>
                        <span className="font-semibold text-[var(--color-primary)]">{order.total}</span>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <Link
                        href="/orders"
                        className="flex-1 bg-[var(--color-primary)] text-white font-medium py-3 rounded-full hover:opacity-90 transition"
                    >
                        View Order History
                    </Link>
                    <Link
                        href="/"
                        className="flex-1 border border-gray-300 text-gray-700 font-medium py-3 rounded-full hover:bg-gray-100 transition"
                    >
                        Back to Home
                    </Link>
                </div>

                {/* Footer */}
                <div className="mt-6 text-sm text-gray-500 flex items-center justify-center gap-1">
                    <Package className="w-4 h-4" />
                    Thank you for your purchase!
                </div>
            </div>
        </div>
    );
}
