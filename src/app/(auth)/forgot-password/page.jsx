"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "@/lib/apiClient";
import { useAuth } from "@/hooks/useAuth";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [emailSent, setEmailSent] = useState("");
  const { forgotPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "" },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await forgotPassword({ email: data.email });
      console.log(result);
      setEmailSent(data.email);
      setShowSuccess(true);
      toast.success("Password reset link sent to your email!");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to send reset link");
    } finally {
      setIsLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen relative bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center px-4 py-8 overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-[-50px] left-[-50px] w-72 h-72 bg-white/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-[-60px] right-[-40px] w-96 h-96 bg-white/5 rounded-full filter blur-3xl"></div>

        {/* Auth Card */}
        <div className="relative max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden z-10 p-8 text-center">
          <Link
            href="/login"
            className="text-sm text-[var(--color-secondary)] hover:underline mb-4 inline-block"
          >
            &larr; Back to Login
          </Link>

          <h2 className="text-3xl font-bold mb-6 text-[var(--color-secondary)]">
            Check Your Email
          </h2>

          <p className="text-gray-500 text-sm mb-6">
            Password reset link is sent to your email <strong>{emailSent}</strong>. Please check your inbox and follow the instructions to reset your password.
          </p>

          <p className="text-gray-400 text-xs mb-4">
            Didn't receive the email? Check your spam folder or try again.
          </p>

          <button
            onClick={() => setShowSuccess(false)}
            className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Send Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center px-4 py-8 overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-[-50px] left-[-50px] w-72 h-72 bg-white/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-[-60px] right-[-40px] w-96 h-96 bg-white/5 rounded-full filter blur-3xl"></div>

      {/* Auth Card */}
      <div className="relative max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden z-10 p-8">
        <Link
          href="/login"
          className="text-sm text-[var(--color-secondary)] hover:underline mb-4 inline-block"
        >
          &larr; Back to Login
        </Link>

        <h2 className="text-3xl font-bold mb-6 text-[var(--color-secondary)] text-center">
          Forgot Password
        </h2>

        <p className="text-gray-500 text-sm mb-6 text-center">
          Enter your email address and we'll send you a password reset link.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-[var(--color-text)]">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              className="w-full px-4 py-2 bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white py-3 rounded-lg font-semibold transition-colors"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}