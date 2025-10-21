"use client";

import { useState } from "react";
import { FaTimes, FaCheckCircle, FaCreditCard, FaReceipt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const CheckoutModal = ({ isOpen, onClose, cart, total, clearCart }) => {
  const [step, setStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [showCvv, setShowCvv] = useState(false);

  const paymentMethods = [
    {
      id: "toyyibpay",
      name: "ToyyibPay",
      description: "Secure payment via ToyyibPay",
      icon: "🏦",
      fee: 0.50
    },
    {
      id: "billplz",
      name: "Billplz",
      description: "Easy payment with Billplz",
      icon: "🧾",
      fee: 0.30
    },
    {
      id: "stripe",
      name: "Stripe",
      description: "Credit/Debit card payment",
      icon: "💳",
      fee: 0.60
    },
    {
      id: "fpx",
      name: "FPX",
      description: "Online banking",
      icon: "🏛️",
      fee: 0.20
    }
  ];

  const handlePaymentSelect = (methodId) => {
    setSelectedPayment(methodId);
    // Reset card details when switching payment methods
    if (methodId !== "stripe") {
      setCardDetails({ number: "", name: "", expiry: "", cvv: "" });
    }
  };

  const handleCardInputChange = (field, value) => {
    let formattedValue = value;
    
    // Format card number with spaces
    if (field === "number") {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19);
    }
    
    // Format expiry date
    if (field === "expiry") {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length > 5) formattedValue = formattedValue.slice(0, 5);
    }
    
    // Format CVV (only numbers, max 4 digits)
    if (field === "cvv") {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 4) formattedValue = formattedValue.slice(0, 4);
    }

    setCardDetails(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  const validateCardDetails = () => {
    if (!cardDetails.number || cardDetails.number.replace(/\s/g, '').length !== 16) {
      alert("Please enter a valid 16-digit card number");
      return false;
    }
    if (!cardDetails.name) {
      alert("Please enter cardholder name");
      return false;
    }
    if (!cardDetails.expiry || !cardDetails.expiry.includes('/')) {
      alert("Please enter valid expiry date (MM/YY)");
      return false;
    }
    if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
      alert("Please enter valid CVV");
      return false;
    }
    return true;
  };

  const handleCheckout = () => {
    if (!selectedPayment) {
      alert("Please select a payment method");
      return;
    }
    
    // For Stripe, validate card details
    if (selectedPayment === "stripe" && !validateCardDetails()) {
      return;
    }
    
    setStep(3);
  };

  const processPayment = () => {
    setPaymentProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 3000);
  };

  const handleClose = () => {
    onClose();
    setStep(1);
    setOrderComplete(false);
    setSelectedPayment("");
    setPaymentProcessing(false);
    setCardDetails({ number: "", name: "", expiry: "", cvv: "" });
  };

  const getTotalWithFee = () => {
    const selectedMethod = paymentMethods.find(method => method.id === selectedPayment);
    const fee = selectedMethod ? selectedMethod.fee : 0;
    return total + fee;
  };

  // Test card numbers for demo
  const testCards = [
    { number: "4242 4242 4242 4242", name: "Visa Test Card" },
    { number: "5555 5555 5555 4444", name: "MasterCard Test Card" },
    { number: "3782 822463 10005", name: "Amex Test Card" },
  ];

  if (!isOpen) return null;

  return (
    <section>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
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
                <div
                  className={`h-1 w-20 ${
                    step >= 3 ? "bg-blue-600" : "bg-gray-200"
                  }`}
                ></div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    step >= 3
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  3
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
                    <div className="space-y-2">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span>Free</span>
                      </div>
                      <div className="flex justify-between font-semibold text-gray-800 text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 font-bold text-white transition-all hover:from-blue-700 hover:to-purple-700"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Select Payment Method
                </h3>

                {/* Payment Methods */}
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                        selectedPayment === method.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handlePaymentSelect(method.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-2xl">{method.icon}</span>
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              {method.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {method.description}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">
                            Fee: ${method.fee.toFixed(2)}
                          </div>
                          {selectedPayment === method.id && (
                            <div className="text-blue-600 text-sm font-medium">
                              Selected
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Card Details Form for Stripe */}
                {selectedPayment === "stripe" && (
                  <div className="rounded-2xl border border-gray-200 p-6 bg-gray-50">
                    <div className="flex items-center gap-2 mb-4">
                      <FaLock className="text-green-600" />
                      <span className="font-semibold text-gray-800">Secure Card Payment</span>
                    </div>

                    {/* Test Card Suggestions */}
                    <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-sm font-medium text-yellow-800 mb-2">Test Cards for Demo:</p>
                      <div className="space-y-1">
                        {testCards.map((card, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setCardDetails(prev => ({
                                ...prev,
                                number: card.number,
                                name: "Test User",
                                expiry: "12/25",
                                cvv: "123"
                              }));
                            }}
                            className="text-xs text-yellow-700 hover:text-yellow-800 block w-full text-left p-1 hover:bg-yellow-100 rounded"
                          >
                            <strong>{card.name}:</strong> {card.number}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Card Number */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={cardDetails.number}
                          onChange={(e) => handleCardInputChange("number", e.target.value)}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                      </div>

                      {/* Cardholder Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          value={cardDetails.name}
                          onChange={(e) => handleCardInputChange("name", e.target.value)}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {/* Expiry Date */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={cardDetails.expiry}
                            onChange={(e) => handleCardInputChange("expiry", e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                          />
                        </div>

                        {/* CVV */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV
                          </label>
                          <div className="relative">
                            <input
                              type={showCvv ? "text" : "password"}
                              placeholder="123"
                              value={cardDetails.cvv}
                              onChange={(e) => handleCardInputChange("cvv", e.target.value)}
                              className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                            />
                            <button
                              type="button"
                              onClick={() => setShowCvv(!showCvv)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showCvv ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Summary */}
                {selectedPayment && (
                  <div className="rounded-2xl border border-gray-200 p-6 bg-gray-50">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Payment Summary
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Payment Fee</span>
                        <span>
                          $
                          {paymentMethods
                            .find((m) => m.id === selectedPayment)
                            ?.fee.toFixed(2)}
                        </span>
                      </div>
                      <div className="border-t border-gray-300 pt-2">
                        <div className="flex justify-between font-semibold text-gray-800 text-lg">
                          <span>Total Amount</span>
                          <span>${getTotalWithFee().toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 rounded-xl border border-gray-300 py-4 font-bold text-gray-700 transition-all hover:border-gray-400"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleCheckout}
                    disabled={!selectedPayment || (selectedPayment === "stripe" && (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv))}
                    className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 font-bold text-white transition-all hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
                  >
                    Proceed to Pay ${getTotalWithFee().toFixed(2)}
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center py-4">
                  <div className="mb-4">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                      {paymentProcessing ? (
                        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
                      ) : (
                        <FaCreditCard className="text-2xl text-blue-600" />
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {paymentProcessing ? "Processing Payment" : "Confirm Payment"}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {paymentProcessing 
                      ? "Please wait while we process your payment..." 
                      : `You selected: ${paymentMethods.find(m => m.id === selectedPayment)?.name}`
                    }
                  </p>

                  {!paymentProcessing && (
                    <div className="rounded-2xl border border-gray-200 p-6 bg-gray-50 max-w-md mx-auto">
                      <div className="text-center mb-4">
                        <FaReceipt className="text-3xl text-gray-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-800">
                          ${getTotalWithFee().toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500">
                          Total amount to pay
                        </div>
                      </div>
                      
                      {/* Show card preview for Stripe */}
                      {selectedPayment === "stripe" && (
                        <div className="mb-4 p-3 bg-white rounded-lg border">
                          <div className="text-xs text-gray-600">Card ending with {cardDetails.number.slice(-4)}</div>
                          <div className="text-sm font-medium">{cardDetails.name}</div>
                        </div>
                      )}
                      
                      <button
                        onClick={processPayment}
                        className="w-full rounded-xl bg-green-600 py-4 font-bold text-white transition-all hover:bg-green-700"
                      >
                        Confirm & Pay
                      </button>
                    </div>
                  )}

                  {paymentProcessing && (
                    <div className="max-w-md mx-auto">
                      <div className="rounded-2xl border border-gray-200 p-6 bg-yellow-50">
                        <div className="text-center">
                          <div className="text-sm text-gray-600 mb-2">
                            Processing {paymentMethods.find(m => m.id === selectedPayment)?.name} payment...
                          </div>
                          <div className="text-xs text-gray-500">
                            Do not close this window
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {!paymentProcessing && (
                  <button
                    onClick={() => setStep(2)}
                    className="w-full rounded-xl border border-gray-300 py-4 font-bold text-gray-700 transition-all hover:border-gray-400"
                  >
                    Back to Payment Methods
                  </button>
                )}
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
              Payment Successful!
            </h3>
            <p className="mb-2 text-gray-600">
              Your order has been confirmed and will be shipped within 2-3 business days.
            </p>
            <p className="mb-6 text-sm text-gray-500">
              Payment Method: {paymentMethods.find(m => m.id === selectedPayment)?.name}
              {selectedPayment === "stripe" && ` (Card ending with ${cardDetails.number.slice(-4)})`}
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
    </section>
  );
};

export default CheckoutModal;