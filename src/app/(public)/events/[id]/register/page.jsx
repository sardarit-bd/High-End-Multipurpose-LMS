'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { format } from 'date-fns';
import { usePublicEvent, useRegisterForEvent } from '@/hooks/useEvent';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/apiClient';

export default function EventRegisterPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: eventData, isLoading } = usePublicEvent(id);
  const { user } = useAuth()
  const event = eventData?.data;
  const registerForEvent = useRegisterForEvent();

  const [processing, setProcessing] = useState(false);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFreeRegistration = async () => {
    setIsProcessing(true);
    try {
      await registerForEvent.mutateAsync(id);
      toast.success('Successfully registered for the event!');
      router.push(`/dashboard`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to register');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayment = async () => {
    if (!user) {
      toast.error("Please login to continue");
      router.push(`/login?redirect=/events/${id}/register`);
      return;
    }

    setProcessing(true);
    try {
      // Create payment intent
      const paymentData = {
        eventId: id,
        paymentMethod: selectedPaymentMethod,
        currency: "USD"
      };
      // For card payments, we'd typically integrate with Stripe/PayPal
      if (selectedPaymentMethod === "stripe") {
        // Create Stripe checkout session
        const res = await api.post("/events/checkout", paymentData);

        // Redirect to Stripe checkout
        console.log(res.data?.data)
        if (res.data?.data?.checkoutUrl) {
          window.location.href = res.data?.data?.checkoutUrl;
        } else {
          toast.error("Payment initialization failed");
        }
      } else if (selectedPaymentMethod === "paypal") {
        alert("Paypal is not configured yet. Please select another payment method.");
        return
        // Handle PayPal payment
        const res = await api.post("/payments/create-paypal", paymentData);

        // Redirect to PayPal
        if (res.data.approvalUrl) {
          window.location.href = res.data.approvalUrl;
        } else {
          toast.error("PayPal initialization failed");
        }
      } else if (selectedPaymentMethod === "wallet") {
        // Handle wallet payment
        const res = await api.post("/payments/wallet-purchase", paymentData);

        if (res.data.success) {
          toast.success("Purchase completed successfully!");
          router.push(`/dashboard/learning?success=true`);
        } else {
          toast.error(res.data.message || "Payment failed");
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.response?.data?.message || "Payment processing failed");
    } finally {
      setProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] p-4 md:p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">Event not found</h2>
          <button
            onClick={() => router.push('/events')}
            className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors"
          >
            Browse Events
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'EEEE, MMMM dd, yyyy');
  };

  console.log("Event Data:", event); // Debug log
  console.log("User Data:", user); // Debug log
  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">
            {event.price === 0 ? 'Register for Event' : 'Complete Your Registration'}
          </h1>
          <p className="text-gray-600">
            You're registering for: <span className="font-semibold">{event.title}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Event Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition hover:-translate-y-0.5 mb-6">
              <h2 className="text-xl font-bold text-[var(--color-text)] mb-4">
                Event Summary
              </h2>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={event.thumbnail || 'https://placehold.co/400x400/ececec/cccccc?text=Event'}
                      alt={event.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--color-text)] mb-2">
                      {event.title}
                    </h3>
                    <div className="space-y-1 text-gray-600">
                      <p className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(event.eventDate)}
                      </p>
                      <p className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {format(new Date(event.eventDate), 'hh:mm a')} ({event.duration} minutes)
                      </p>
                      <p className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {event.location || 'Online'}
                      </p>
                    </div>
                  </div>
                </div>

                {event.pointsReward > 0 && (
                  <div className="bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-[var(--color-accent-hover)]">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-semibold">You'll earn {event.pointsReward} points after attending this event!</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Methods (only for paid events) */}
            {event.price > 0 && (
              <div className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition hover:-translate-y-0.5 p-6">
                <h2 className="text-xl font-bold text-[var(--color-text)] mb-6">
                  Select Payment Method
                </h2>

                <div className="space-y-4">
                  <label className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer border-[var(--color-primary)] transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="stripe"
                      checked={selectedPaymentMethod === 'stripe'}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      className="text-[var(--color-primary)]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Stripe</p>
                          <p className="text-sm text-gray-500">Pay with your stripe account.</p>
                        </div>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer border-[var(--color-primary)] transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={selectedPaymentMethod === 'paypal'}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      className="text-[var(--color-primary)]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 font-bold">PayPal</span>
                        </div>
                        <div>
                          <p className="font-medium">PayPal</p>
                          <p className="text-sm text-gray-500">Pay with your PayPal account</p>
                        </div>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer border-[var(--color-primary)] transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="toybpay"
                      checked={selectedPaymentMethod === 'toybpay'}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      className="text-[var(--color-primary)]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">TaybPay</p>
                          <p className="text-sm text-gray-500">Pay with your TaybPay account</p>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition hover:-translate-y-0.5 p-6 sticky top-6">
              <h2 className="text-xl font-bold text-[var(--color-text)] mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Event Fee</span>
                  <span className="font-medium">${event.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform Fee</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-[var(--color-text)]">Total</span>
                    <span className="text-2xl font-bold text-[var(--color-text)]">
                      ${event.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Registration Button */}
              {event?.attendees?.includes(user?._id) ? (
                <button
                  disabled={isProcessing}
                  className="w-full px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium opacity-40 cursor-not-allowed"
                >
                  You are already registered for this event
                </button>
              ) : event.price === 0 ? (
                <button
                  onClick={handleFreeRegistration}
                  disabled={isProcessing}
                  className="w-full px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Complete Free Registration'
                  )}
                </button>
              ) : (
                <button
                  onClick={handlePayment}
                  disabled={isProcessing || !selectedPaymentMethod}
                  className="w-full px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing Payment...
                    </span>
                  ) : (
                    `Pay $${event.price}`
                  )}
                </button>
              )}



              {/* Security Assurance */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="font-medium">Secure Payment</span>
                </div>
                <p className="text-xs text-gray-500">
                  Your payment information is encrypted and secure. We never store your card details.
                </p>
              </div>

              {/* Cancel Link */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => router.back()}
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  ← Back to event details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}