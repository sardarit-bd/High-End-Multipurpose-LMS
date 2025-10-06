"use client";
import { useState } from "react";
import Image from "next/image";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <div className="bg-white min-h-[85vh] py-10">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col-reverse lg:flex-row gap-8">
        {/* ===== Left Content (Forms) ===== */}
        <div className="flex-1 space-y-6">
          {/* Billing Address */}
          <div className="bg-white shadow-md rounded-[var(--radius-card)] p-6">
            <h2 className="text-xl font-semibold text-[var(--color-secondary)] mb-4">
              Billing Address
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="First Name *" className="flex-1 px-4 py-2 bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]" required />
                <input type="text" placeholder="Last Name *" className="flex-1 px-4 py-2 bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]" required />
              </div>
              <div  className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input type="text" placeholder="Phone Number (Optional)" className="flex-1 px-4 py-2 bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]" />
              <input type="text" placeholder="Address Line 1 *" className="flex-1 px-4 py-2 bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]" required />
              <input type="text" placeholder="Address Line 2 (Optional)" className="flex-1 px-4 py-2 bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input type="text" placeholder="Country *" className="flex-1 px-4 py-2 bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]" required />
                <input type="text" placeholder="State *" className="flex-1 px-4 py-2 bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]" required />
                <input type="text" placeholder="City *" className="flex-1 px-4 py-2 bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]" required />
              </div>

              <div className="flex flex-col gap-2 text-sm text-gray-600">
                {/* <label className="flex items-center gap-2">
                  <input type="checkbox" /> Shipping address is the same
                </label> */}
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> Save this information for next time
                </label>
              </div>
            </form>
          </div>

          {/* Payment Method */}
          <div className="bg-white shadow-md rounded-[var(--radius-card)] p-6">
            <h2 className="text-xl font-semibold text-[var(--color-secondary)] mb-4">
              Payment Method
            </h2>

            {/* Payment Tabs */}
            <div className="flex gap-3 mb-4">
              {["card", "paypal", "stripe"].map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`flex-1 py-2 rounded-lg border text-sm font-medium ${
                    paymentMethod === method
                      ? "bg-[var(--color-primary)] text-white"
                      : "bg-gray-50 text-gray-700"
                  }`}
                >
                  {method === "card" && "💳 Card"}
                  {method === "paypal" && "💰 Paypal"}
                  {method === "stripe" && "🔵 Stripe"}
                </button>
              ))}
            </div>

            {/* Card Form */}
            {paymentMethod === "card" && (
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Card Number *" className="flex-1 px-4 py-2 bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]" required />
                <input type="text" placeholder="Name on Card *" className="flex-1 px-4 py-2 bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]" required />
                <input type="text" placeholder="Expiry Date *" className="flex-1 px-4 py-2 bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]" required />
                <input type="text" placeholder="Security Number *" className="flex-1 px-4 py-2 bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]" required />
              </form>
            )}

            {/* Pay Button */}
            <button className="mt-6 w-full py-3 rounded-lg text-white font-semibold bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] shadow-md">
              Pay $225.20
            </button>
          </div>
        </div>

        {/* ===== Right Sidebar (Order Summary) ===== */}
        <aside className="w-full lg:w-80 flex-shrink-0 lg:sticky lg:top-18 self-start">
          <div className="bg-white shadow-md rounded-[var(--radius-card)] p-6">
            <h2 className="text-lg font-semibold text-[var(--color-secondary)] mb-4">
              Order Details
            </h2>

            <div className="space-y-4 mb-4">
              {/* Item 1 */}
              <div className="flex items-center gap-3">
                <Image src="/courses/uiux.jpg" alt="UI/UX" width={60} height={60} className="rounded-md" />
                <div>
                  <p className="text-sm font-medium text-[var(--color-text)]">UI/UX Design Degree</p>
                  <p className="text-[var(--color-primary)] font-semibold">$120</p>
                </div>
              </div>
              {/* Item 2 */}
              <div className="flex items-center gap-3">
                <Image src="/courses/react.jpg" alt="React" width={60} height={60} className="rounded-md" />
                <div>
                  <p className="text-sm font-medium text-[var(--color-text)]">React Fundamentals</p>
                  <p className="text-[var(--color-primary)] font-semibold">$160</p>
                </div>
              </div>
            </div>

            {/* Totals */}
            <div className="text-sm text-gray-700 space-y-1 border-t pt-4">
              <p className="flex justify-between"><span>Sub Total</span><span>$200.20</span></p>
              <p className="flex justify-between"><span>Tax (VAT)</span><span>$25</span></p>
              <p className="flex justify-between font-semibold text-lg text-[var(--color-secondary)]">
                <span>Total</span><span>$225.20</span>
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
