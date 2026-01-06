"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import {
  CreditCard,
  Landmark,
  Wallet,
  DollarSign,
  ShieldCheck,
  Lock,
  BadgeCheck,
} from "lucide-react";
import { useSlugCourses } from "@/hooks/useCourse";
import { useSearchParams } from "next/navigation";
import api from "@/lib/apiClient";


export default function CheckoutPage() {
  const params = useSearchParams()
  const { t, i18n } = useTranslation();
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [billingInfo, setBillingInfo] = useState({
    firstName : "",
    lastName: "",
    phone: "",
    lineOne: "",
    lineTwo: "",
    country: "",
    state: "",
    city: ""
  })
  const { data: course, isLoading } = useSlugCourses(params.get('slug'))

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  const onChange = (e) => {
    setBillingInfo({...billingInfo, [e.target.name]: e.target.value})
  }

  const getConvertedPrice = (usd) =>
    i18n?.language === "ms" ? `RM${(usd * 4.7).toFixed(2)}` : `$${usd.toFixed(2)}`;


  const subTotal = course.price
  const tax = 0;
  const total = subTotal + tax;

  const paymentOptions = [
    { id: "paypal", label: "PayPal", icon: Wallet },
    { id: "stripe", label: "Stripe", icon: Landmark },
    { id: "tayyibpay", label: "TayyibPay", icon: DollarSign },
    { id: "billplz", label: "Billplz", icon: DollarSign },
  ];

  const card =
    "bg-white shadow-sm rounded-2xl border border-gray-100 backdrop-blur-sm";
  const inputBase =
    "w-full px-3.5 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 outline-none focus:border-[var(--color-primary,#0ea5e9)] focus:ring-2 focus:ring-[var(--color-primary,#0ea5e9)]/20 transition";

  const handleSubmit = async () => {
    const data = {
      provider: paymentMethod,
      courseId: course._id,
      itemType: 'course',
      billingInfo
    }
    console.log(data)
    const res = await api.post('orders/checkout', data)
    const {checkoutUrl} = res?.data?.data

    window.location.href = checkoutUrl
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header bar */}
      <div className="brandBg">
        <div className="container text-gray-600 mx-auto px-4 py-3 flex items-center justify-center gap-2 text-sm font-medium tracking-wide">
          <ShieldCheck className="h-4 w-4" />
          <span>Secure Checkout — 256-bit SSL Encryption</span>
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-4 lg:px-4 py-2">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* LEFT */}
            <div className="lg:col-span-8 space-y-8">
              {/* Billing */}
              <section className={`${card} p-8`}>
                <h2 className="text-lg font-semibold brandColor mb-5 text-gray-800">
                  Billing Information
                </h2>

                <form className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input onChange={onChange} value={billingInfo.firstName} name="firstName" placeholder="First Name *" className={inputBase} />
                    <input onChange={onChange} placeholder="Last Name *" value={billingInfo.lastName} name="lastName" className={inputBase} />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <input onChange={onChange} placeholder="Phone (optional)"  value={billingInfo.phone} name="phone" className={inputBase} />
                    <input onChange={onChange} placeholder="Address Line 1 *" value={billingInfo.lineOne} name="lineOne" className={inputBase} />
                    <input onChange={onChange} placeholder="Address Line 2" value={billingInfo.lineTwo} name="lineTwo" className={inputBase} />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <input onChange={onChange} placeholder="Country *" value={billingInfo.country} name="country" className={inputBase} />
                    <input onChange={onChange} placeholder="State *" value={billingInfo.state} name="state" className={inputBase} />
                    <input onChange={onChange} placeholder="City *" value={billingInfo.city} name="city" className={inputBase} />
                  </div>

                  <label className="flex items-center gap-2 text-sm text-gray-700 mt-2">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                    Save this information for next time
                  </label>
                </form>
              </section>

              {/* Payment */}
              <section className={`${card} p-8`}>
                <h2 className="text-lg font-semibold brandColor mb-6 text-gray-800">
                  Payment Method
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  {paymentOptions.map(({ id, label, icon: Icon }) => {
                    const active = paymentMethod === id;
                    return (
                      <button
                        key={id}
                        onClick={() => setPaymentMethod(id)}
                        type="button"
                        className={`flex flex-col items-center justify-center gap-1 p-3 rounded-xl border text-sm font-medium transition-all duration-150 ${active
                          ? "bg-[var(--color-primary,#0ea5e9)] text-white border-[var(--color-primary,#0ea5e9)] shadow-md scale-105"
                          : "bg-gray-50 text-gray-800 border-gray-200 hover:bg-white hover:shadow-sm"
                          }`}
                      >
                        <Icon className="h-5 w-5" />
                        {label}
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-4">
                  {paymentMethod === "paypal" && (
                    <Notice title="PayPal" message="You will be redirected to PayPal to complete your payment securely." />
                  )}
                  {paymentMethod === "stripe" && (
                    <Notice title="Stripe" message="Stripe secure checkout will open to confirm your card payment." />
                  )}
                  {paymentMethod === "tayyibpay" && (
                    <Notice title="TayyibPay" message="You’ll be redirected to TayyibPay Malaysia gateway to complete your transaction." />
                  )}
                  {paymentMethod === "billplz" && (
                    <Notice title="Billplz" message="You’ll be redirected to Billplz Malaysia gateway to complete your transaction." />
                  )}
                </div>

                <button
                  className="mt-8 w-full py-3.5 rounded-lg font-semibold text-white bg-gradient-to-r from-[var(--color-primary,#0ea5e9)] to-[var(--color-primary-hover,#0284c7)] hover:opacity-95 transition-all shadow"
                  type="button"
                  onClick={handleSubmit}
                >
                  Pay {getConvertedPrice(total)}
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Lock className="h-4 w-4" /> Encrypted & Secure Payment
                </div>
              </section>
            </div>

            {/* RIGHT */}
            <aside className="lg:col-span-4">
              <div className={`${card} p-8 lg:sticky lg:top-10`}>
                <h2 className="text-lg font-semibold brandColor mb-6 text-gray-800">
                  Order Summary
                </h2>

                <ul className="space-y-5">
                  <OrderItem
                    title={course.title}
                    price={getConvertedPrice(course.price)}
                    img={course.thumbnail}
                  />
                </ul>

                <div className="my-6 border-t border-gray-200" />

                <div className="text-sm text-gray-700 space-y-2">
                  <Row label="Subtotal" value={getConvertedPrice(subTotal)} />
                  {/* <Row label="Discount" value={getConvertedPrice(tax)} /> */}
                  <div className="border-t border-gray-100 my-2" />
                  <Row label="Total" value={getConvertedPrice(total)} highlight />
                </div>

                <div className="mt-6 bg-gray-50 border border-gray-100 p-4 text-xs text-gray-700 rounded-lg flex items-start gap-2">
                  <BadgeCheck className="h-4 w-4 text-[var(--color-primary,#0ea5e9)] mt-0.5" />
                  <p>14-day money-back guarantee. No hidden charges.</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

/* -------- Components -------- */

function Row({ label, value, highlight = false }) {
  return (
    <p
      className={`flex justify-between items-center ${highlight
        ? "font-semibold text-[var(--color-secondary,#0f172a)] text-base"
        : "text-sm"
        }`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </p>
  );
}

function OrderItem({ title, price, img }) {
  return (
    <li className="flex items-center gap-4">
      <Image
        src={img}
        alt={title}
        width={60}
        height={60}
        className="rounded-md object-cover shadow-sm"
      />
      <div>
        <p className="text-sm font-medium text-gray-800">{title}</p>
        <p className="text-[var(--color-primary,#0ea5e9)] font-semibold">{price}</p>
      </div>
    </li>
  );
}

function Notice({ title, message }) {
  return (
    <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50/70 text-gray-600 text-sm leading-relaxed">
      <strong>{title}</strong> — {message}
    </div>
  );
}
