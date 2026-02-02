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
  Minus,
  Plus,
  Trash2,
  Package,
  Truck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/lib/apiClient";
import { toast } from "react-toastify";
import { useCart } from "@/providers/CartProvider";


export default function ProductCheckoutPage() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    lineOne: "",
    lineTwo: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const onChange = (e) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  const getConvertedPrice = (usd) =>
    i18n?.language === "ms" ? `RM${(usd * 4.7).toFixed(2)}` : `$${usd.toFixed(2)}`;

  const subtotal = getCartTotal();
  const hasPhysicalProducts = cart.some(item => item.shippingRequired);
  const shipping = hasPhysicalProducts ? 10 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const paymentOptions = [
    { id: "paypal", label: "PayPal", icon: Wallet },
    { id: "stripe", label: "Stripe", icon: Landmark },
    { id: "tayyibpay", label: "TayyibPay", icon: DollarSign },
    { id: "billplz", label: "Billplz", icon: DollarSign },
  ];

  const card =
    "bg-white shadow-sm rounded-2xl border border-gray-100 backdrop-blur-sm";
  const inputBase =
    "w-full px-3.5 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 outline-none focus:border-[var(--color-primary,#059669)] focus:ring-2 focus:ring-[var(--color-primary,#059669)]/20 transition";

  const handleSubmit = async () => {
    // Validation
    if (!billingInfo.firstName || !billingInfo.lastName || !billingInfo.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsProcessing(true);

    try {
      const orderData = {
        provider: paymentMethod,
        items: cart.map((item) => ({
          product: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        itemType: "product",
        billingInfo,
        shippingAddress: {
          firstName: billingInfo.firstName,
          lastName: billingInfo.lastName,
          address: billingInfo.lineOne,
          addressLine2: billingInfo.lineTwo,
          city: billingInfo.city,
          state: billingInfo.state,
          zipCode: billingInfo.zipCode,
          country: billingInfo.country,
        },
        contactInfo: {
          email: billingInfo.email,
          phone: billingInfo.phone,
        },
        paymentMethod,
        subtotal,
        shipping,
        tax,
        total,
      };

      const res = await api.post("orders/checkout/ecommerce", orderData);
      const { checkoutUrl, orderId } = res?.data?.data;

      if (checkoutUrl) {
        // Redirect to payment gateway
        window.location.href = checkoutUrl;
      } else {
        // Free order or direct checkout
        toast.success("Order placed successfully!");
        clearCart();
        router.push(`/order-confirmation/${orderId}`);
      }
    } catch (err) {
      console.error(err?.response?.data?.message);
      toast.error(err?.response?.data?.message || "Failed to process order");
    } finally {
      setIsProcessing(false);
    }
  };

  // Redirect if cart is empty
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-24 w-24 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started!</p>
          <button
            onClick={() => router.push("/shop")}
            className="px-6 py-3 text-white rounded-xl transition-all"
            style={{ backgroundColor: "var(--color-primary, #059669)" }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header bar */}
      <div style={{ backgroundColor: "var(--color-primary, #059669)" }}>
        <div className="container text-white mx-auto px-4 py-3 flex items-center justify-center gap-2 text-sm font-medium tracking-wide">
          <ShieldCheck className="h-4 w-4" />
          <span>Secure Checkout — 256-bit SSL Encryption</span>
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-4 lg:px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Shop</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* LEFT */}
            <div className="lg:col-span-8 space-y-8">
              {/* Billing & Shipping Information */}
              <section className={`${card} p-8`}>
                <h2 className="text-lg font-semibold mb-5" style={{ color: "var(--color-text, #064E3B)" }}>
                  Billing & Shipping Information
                </h2>

                <form className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      onChange={onChange}
                      value={billingInfo.firstName}
                      name="firstName"
                      placeholder="First Name *"
                      className={inputBase}
                      required
                    />
                    <input
                      onChange={onChange}
                      placeholder="Last Name *"
                      value={billingInfo.lastName}
                      name="lastName"
                      className={inputBase}
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      onChange={onChange}
                      type="email"
                      placeholder="Email Address *"
                      value={billingInfo.email}
                      name="email"
                      className={inputBase}
                      required
                    />
                    <input
                      onChange={onChange}
                      placeholder="Phone Number *"
                      value={billingInfo.phone}
                      name="phone"
                      className={inputBase}
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      onChange={onChange}
                      placeholder="Address Line 1 *"
                      value={billingInfo.lineOne}
                      name="lineOne"
                      className={inputBase}
                      required
                    />
                    <input
                      onChange={onChange}
                      placeholder="Address Line 2 (Optional)"
                      value={billingInfo.lineTwo}
                      name="lineTwo"
                      className={inputBase}
                    />
                  </div>

                  <div className="grid sm:grid-cols-4 gap-4">
                    <input
                      onChange={onChange}
                      placeholder="City *"
                      value={billingInfo.city}
                      name="city"
                      className={inputBase}
                      required
                    />
                    <input
                      onChange={onChange}
                      placeholder="State/Province *"
                      value={billingInfo.state}
                      name="state"
                      className={inputBase}
                      required
                    />
                    <input
                      onChange={onChange}
                      placeholder="ZIP Code *"
                      value={billingInfo.zipCode}
                      name="zipCode"
                      className={inputBase}
                      required
                    />
                    <input
                      onChange={onChange}
                      placeholder="Country *"
                      value={billingInfo.country}
                      name="country"
                      className={inputBase}
                      required
                    />
                  </div>

                  <label className="flex items-center gap-2 text-sm text-gray-700 mt-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                      style={{ accentColor: "var(--color-primary, #059669)" }}
                    />
                    Save this information for next time
                  </label>
                </form>
              </section>

              {/* Payment Method */}
              <section className={`${card} p-8`}>
                <h2 className="text-lg font-semibold mb-6" style={{ color: "var(--color-text, #064E3B)" }}>
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
                        className={`flex flex-col items-center justify-center gap-1 p-3 rounded-xl border text-sm font-medium transition-all duration-150 ${
                          active
                            ? "text-white border-[var(--color-primary,#059669)] shadow-md scale-105"
                            : "bg-gray-50 text-gray-800 border-gray-200 hover:bg-white hover:shadow-sm"
                        }`}
                        style={
                          active
                            ? { backgroundColor: "var(--color-primary, #059669)" }
                            : {}
                        }
                      >
                        <Icon className="h-5 w-5" />
                        {label}
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-4">
                  {paymentMethod === "paypal" && (
                    <Notice
                      title="PayPal"
                      message="You will be redirected to PayPal to complete your payment securely."
                    />
                  )}
                  {paymentMethod === "stripe" && (
                    <Notice
                      title="Stripe"
                      message="Stripe secure checkout will open to confirm your card payment."
                    />
                  )}
                  {paymentMethod === "tayyibpay" && (
                    <Notice
                      title="TayyibPay"
                      message="You'll be redirected to TayyibPay Malaysia gateway to complete your transaction."
                    />
                  )}
                  {paymentMethod === "billplz" && (
                    <Notice
                      title="Billplz"
                      message="You'll be redirected to Billplz Malaysia gateway to complete your transaction."
                    />
                  )}
                </div>

                <button
                  className="mt-8 w-full py-3.5 rounded-lg font-semibold text-white transition-all shadow disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: `linear-gradient(to right, var(--color-primary, #059669), var(--color-primary-hover, #047857))`,
                  }}
                  type="button"
                  onClick={handleSubmit}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    `Pay ${getConvertedPrice(total)}`
                  )}
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Lock className="h-4 w-4" /> Encrypted & Secure Payment
                </div>
              </section>
            </div>

            {/* RIGHT - Order Summary */}
            <aside className="lg:col-span-4">
              <div className={`${card} p-8 lg:sticky lg:top-10`}>
                <h2 className="text-lg font-semibold mb-6" style={{ color: "var(--color-text, #064E3B)" }}>
                  Order Summary
                </h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {cart.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      updateQuantity={updateQuantity}
                      removeFromCart={removeFromCart}
                      getConvertedPrice={getConvertedPrice}
                    />
                  ))}
                </div>

                <div className="my-6 border-t border-gray-200" />

                {/* Totals */}
                <div className="text-sm text-gray-700 space-y-2">
                  <Row label="Subtotal" value={getConvertedPrice(subtotal)} />
                  {hasPhysicalProducts && (
                    <Row
                      label={
                        <span className="flex items-center gap-1">
                          <Truck className="h-4 w-4" />
                          Shipping
                        </span>
                      }
                      value={getConvertedPrice(shipping)}
                    />
                  )}
                  <Row label="Tax (10%)" value={getConvertedPrice(tax)} />
                  <div className="border-t border-gray-100 my-2" />
                  <Row label="Total" value={getConvertedPrice(total)} highlight />
                </div>

                <div
                  className="mt-6 border p-4 text-xs text-gray-700 rounded-lg flex items-start gap-2"
                  style={{
                    backgroundColor: "rgba(5, 150, 105, 0.05)",
                    borderColor: "rgba(5, 150, 105, 0.2)",
                  }}
                >
                  <BadgeCheck
                    className="h-4 w-4 mt-0.5"
                    style={{ color: "var(--color-primary, #059669)" }}
                  />
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
      className={`flex justify-between items-center ${
        highlight ? "font-semibold text-base" : "text-sm"
      }`}
      style={
        highlight
          ? { color: "var(--color-text, #064E3B)" }
          : { color: "#374151" }
      }
    >
      <span>{label}</span>
      <span style={highlight ? { color: "var(--color-primary, #059669)" } : {}}>
        {value}
      </span>
    </p>
  );
}

function CartItem({ item, updateQuantity, removeFromCart, getConvertedPrice }) {
  return (
    <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
      <Image
        src={item.image || "/placeholder.png"}
        alt={item.name}
        width={60}
        height={60}
        className="rounded-md object-cover shadow-sm"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
        <p
          className="font-semibold text-sm"
          style={{ color: "var(--color-primary, #059669)" }}
        >
          {getConvertedPrice(item.price)}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
            disabled={item.quantity <= 1}
          >
            <Minus className="h-3 w-3 text-gray-600" />
          </button>
          <span className="text-sm font-medium text-gray-800 min-w-[20px] text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
          >
            <Plus className="h-3 w-3 text-gray-600" />
          </button>
        </div>
      </div>

      <button
        onClick={() => removeFromCart(item.id)}
        className="text-red-500 hover:text-red-700 transition-colors"
        title="Remove item"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

function Notice({ title, message }) {
  return (
    <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50/70 text-gray-600 text-sm leading-relaxed">
      <strong>{title}</strong> — {message}
    </div>
  );
}