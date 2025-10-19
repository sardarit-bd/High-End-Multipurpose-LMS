"use client";

import { useState } from "react";
import { FaTimes, FaCheckCircle } from "react-icons/fa";

const CheckoutModal = ({ isOpen, onClose, cart, total }) => {
  const [step, setStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleCheckout = () => {
    // Simulate checkout process
    setStep(2);
    setTimeout(() => {
      setOrderComplete(true);
    }, 2000);
  };

  const handleClose = () => {
    onClose();
    setStep(1);
    setOrderComplete(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-8 shadow-2xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            {orderComplete ? "Order Complete!" : "Checkout"}
          </h2>
          <button
            onClick={handleClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
          >
            <FaTimes />
          </button>
        </div>

        {!orderComplete ? (
          <>
            {/* Progress Steps */}
            <div className="mb-8 flex items-center justify-center">
              <div className="flex items-center">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    step >= 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  1
                </div>
                <div
                  className={`h-1 w-20 ${
                    step >= 2 ? "bg-blue-600" : "bg-gray-200"
                  }`}
                ></div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    step >= 2
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  2
                </div>
              </div>
            </div>

            {step === 1 && (
              <div className="space-y-6">
                {/* Order Summary */}
                <div className="rounded-2xl border border-gray-200 p-6">
                  <h3 className="mb-4 text-lg font-semibold">Order Summary</h3>
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-800">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <div className="flex justify-between font-semibold text-gray-800">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 font-bold text-white transition-all hover:from-blue-700 hover:to-purple-700"
                >
                  Complete Order
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="text-center py-8">
                <div className="mb-4">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Processing Your Order
                </h3>
                <p className="text-gray-600">
                  Please wait while we confirm your payment...
                </p>
              </div>
            )}
          </>
        ) : (
          /* Order Complete */
          <div className="text-center py-8">
            <div className="mb-6">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <FaCheckCircle className="text-4xl text-green-600" />
              </div>
            </div>
            <h3 className="mb-4 text-2xl font-bold text-gray-800">
              Thank You for Your Order!
            </h3>
            <p className="mb-6 text-gray-600">
              Your order has been confirmed and will be shipped within 2-3 business days.
            </p>
            <div className="space-y-4">
              <button
                onClick={handleClose}
                className="w-full rounded-xl bg-blue-600 py-4 font-bold text-white transition-all hover:bg-blue-700"
              >
                Continue Shopping
              </button>
              <button
                onClick={handleClose}
                className="w-full rounded-xl border border-gray-300 py-4 font-bold text-gray-700 transition-all hover:border-gray-400"
              >
                View Order Details
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CheckoutModal;