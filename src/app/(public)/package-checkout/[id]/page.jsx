"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/lib/apiClient";
import {
  Package,
  Check,
  CreditCard,
  DollarSign,
  Calendar,
  BookOpen,
  Users,
  Shield,
  Lock,
  ArrowLeft,
  Clock,
  Sparkles,
  Zap,
  Award,
  ChevronRight,
  AlertCircle
} from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";

export default function PackageCheckoutPage() {
  const router = useRouter();
  const params = useParams();
  const packageId = params.id;

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("stripe");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);

  const {user} = useAuth()

  useEffect(() => {
    fetchPackage();
  }, []);

  const fetchPackage = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/packages/${packageId}`);
      setPkg(res.data.data);
    } catch (error) {
      console.error("Error fetching package:", error);
      toast.error("Failed to load package details");
      router.back();
    } finally {
      setLoading(false);
    }
  };


  const calculateSavings = () => {
    if (!pkg) return 0;
    const totalCoursePrice = pkg.courseIds?.reduce((sum, course) => sum + (course?.price || 0), 0) || 0;
    if (totalCoursePrice > 0 && pkg.price > 0) {
      return Math.round(((totalCoursePrice - pkg.price) / totalCoursePrice) * 100);
    }
    return 0;
  };

//   const applyCoupon = async () => {
//     if (!couponCode.trim()) {
//       toast.error("Please enter a coupon code");
//       return;
//     }

//     try {
//       // Call coupon validation API
//       const res = await api.post(`/coupons/validate`, {
//         code: couponCode,
//         packageId: packageId,
//         userId: user?._id
//       });

//       if (res.data.valid) {
//         setAppliedCoupon(res.data.coupon);
//         setDiscount(res.data.discountAmount);
//         toast.success("Coupon applied successfully!");
//       } else {
//         toast.error(res.data.message || "Invalid coupon code");
//       }
//     } catch (error) {
//       console.error("Error applying coupon:", error);
//       toast.error(error.response?.data?.message || "Failed to apply coupon");
//     }
//   };

  const calculateTotal = () => {
    if (!pkg) return 0;
    const subtotal = pkg.price;
    const discountAmount = discount;
    return Math.max(0, subtotal - discountAmount);
  };

  const handlePayment = async () => {
    if (!user) {
      toast.error("Please login to continue");
      router.push(`/login?redirect=/packages/${packageId}/checkout`);
      return;
    }

    setProcessing(true);
    try {
      // Create payment intent
      const paymentData = {
        packageId,
        paymentMethod: selectedPayment,
        couponCode: appliedCoupon?.code,
        amount: calculateTotal(),
        currency: pkg.currency || "USD"
      };
      // For card payments, we'd typically integrate with Stripe/PayPal
      if (selectedPayment === "stripe") {
        // Create Stripe checkout session
        const res = await api.post("/packages/checkout", paymentData);
        
        // Redirect to Stripe checkout
        console.log(res.data?.data)
        if (res.data?.data?.checkoutUrl) {
          window.location.href = res.data?.data?.checkoutUrl;
        } else {
          toast.error("Payment initialization failed");
        }
      } else if (selectedPayment === "paypal") {
        // Handle PayPal payment
        const res = await api.post("/payments/create-paypal", paymentData);
        
        // Redirect to PayPal
        if (res.data.approvalUrl) {
          window.location.href = res.data.approvalUrl;
        } else {
          toast.error("PayPal initialization failed");
        }
      } else if (selectedPayment === "wallet") {
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

  const paymentMethods = [
    { id: "stripe", name: "Stripe", icon: CreditCard, description: "Pay with your Stript account" },
    { id: "paypal", name: "PayPal", icon: DollarSign, description: "Pay with your PayPal account" },
    // { id: "wallet", name: "Wallet Balance", icon: DollarSign, description: "Use your account balance" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-10 px-4">
        <div className="container mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded-lg w-48"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white rounded-xl p-6">
                    <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded-lg w-full mb-2"></div>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6">
                  <div className="h-8 bg-gray-200 rounded-lg w-2/3 mb-4"></div>
                  <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-4 bg-gray-200 rounded-lg w-full"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen pt-20 pb-10 px-4">
        <div className="container mx-auto text-center">
          <Package className="h-20 w-20 text-gray-300 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-700 mb-3">Package not found</h1>
          <p className="text-gray-500 mb-8">The package you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => router.push("/packages")}
            className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl hover:bg-[var(--color-primary-hover)] transition"
          >
            Browse Packages
          </button>
        </div>
      </div>
    );
  }

  const savings = calculateSavings();
  const totalValue = pkg.courseIds?.reduce((sum, course) => sum + (course?.price || 0), 0) || pkg.comparePrice;
  const finalTotal = calculateTotal();

  return (
    <div className="min-h-screen pt-16 pb-10 px-4 bg-gray-50">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push(`/packages`)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Package
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Complete Your Purchase
          </h1>
          <p className="text-gray-600">
            Review your package and choose your payment method
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Package Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Package Summary */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h2>
                  <div className="flex items-center gap-3">
                    {savings > 0 && (
                      <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        Save {savings}%
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-sm text-gray-600">
                      <BookOpen className="h-4 w-4" />
                      {pkg.courseIds?.length || 0} courses
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {pkg.accessDays || 'Lifetime'} access
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">${pkg.price.toFixed(2)}</div>
                  {totalValue > pkg.price && (
                    <div className="text-lg text-gray-500 line-through">${totalValue.toFixed(2)}</div>
                  )}
                </div>
              </div>

              {/* Included Courses */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-[var(--color-accent)]" />
                  Included Courses
                </h3>
                <div className="space-y-3">
                  {pkg.courseIds?.map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                      <div className="flex items-center gap-3">
                        {course.thumbnail ? (
                          <img 
                            src={course.thumbnail} 
                            alt={course.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-[var(--color-primary)]/20 rounded-lg flex items-center justify-center">
                            <BookOpen className="h-6 w-6 text-[var(--color-primary)]" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{course.title}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              course.level === 'beginner' ? 'bg-blue-100 text-blue-700' :
                              course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {course.level}
                            </span>
                            <span>•</span>
                            <span>{course.noOfStudents || 0} students</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-700">${course.price?.toFixed(2) || '0.00'}</div>
                        <div className="text-xs text-gray-500">Individual price</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Package Features */}
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-[var(--color-accent-special)]" />
                  Package Benefits
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {pkg.features?.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-xl text-gray-900 mb-6">Select Payment Method</h3>
              <div className="space-y-4">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        selectedPayment === method.id
                          ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${
                          selectedPayment === method.id
                            ? 'bg-[var(--color-primary)] text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{method.name}</div>
                          <div className="text-sm text-gray-600">{method.description}</div>
                        </div>
                        <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                          selectedPayment === method.id
                            ? 'border-[var(--color-primary)] bg-[var(--color-primary)]'
                            : 'border-gray-300'
                        }`}>
                          {selectedPayment === method.id && (
                            <div className="h-2 w-2 rounded-full bg-white"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Wallet Balance */}
              {selectedPayment === "wallet" && user?.walletBalance && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Available Balance</div>
                      <div className="text-2xl font-bold text-blue-600">${user.walletBalance.toFixed(2)}</div>
                    </div>
                    {user.walletBalance < finalTotal && (
                      <div className="text-sm text-red-600">
                        Insufficient balance
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-24">
              <h3 className="font-semibold text-xl text-gray-900 mb-6">Order Summary</h3>
              
              {/* Price Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Package Price</span>
                  <span>${pkg.price.toFixed(2)}</span>
                </div>
                
                {/* Coupon Section */}
                {/* {!appliedCoupon ? (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
                      />
                      <button
                        onClick={applyCoupon}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition whitespace-nowrap"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                      <div>
                        <div className="font-medium text-green-700">{appliedCoupon.code}</div>
                        <div className="text-sm text-green-600">Coupon applied</div>
                      </div>
                      <button
                        onClick={() => {
                          setAppliedCoupon(null);
                          setDiscount(0);
                          setCouponCode("");
                        }}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )} */}

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {pkg.currency} • One-time payment
                  </div>
                </div>
              </div>

              {/* Security & Guarantee */}
              <div className="mb-6 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Lock className="h-4 w-4 text-green-500" />
                  <span>Secure SSL encryption</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>30-day money-back guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <span>{pkg.accessDays || 'Lifetime'} access period</span>
                </div>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={processing || (selectedPayment === "wallet" && user?.walletBalance < finalTotal)}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                  processing || (selectedPayment === "wallet" && user?.walletBalance < finalTotal)
                    ? 'bg-gray-400 cursor-not-allowed text-white'
                    : 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white hover:opacity-90 shadow-lg hover:shadow-xl'
                }`}
              >
                {processing ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    {selectedPayment === "wallet" && user?.walletBalance < finalTotal
                      ? "Insufficient Balance"
                      : `Pay $${finalTotal.toFixed(2)}`}
                    <ChevronRight className="h-5 w-5" />
                  </>
                )}
              </button>

              {/* Agreement */}
              <div className="mt-6 text-xs text-gray-500 text-center">
                By completing your purchase, you agree to our{" "}
                <a href="/terms" className="text-[var(--color-primary)] hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-[var(--color-primary)] hover:underline">
                  Privacy Policy
                </a>
              </div>

              {/* Need Help */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-gray-400" />
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">Need help?</div>
                    <a href="/support" className="text-[var(--color-primary)] hover:underline">
                      Contact our support team
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}