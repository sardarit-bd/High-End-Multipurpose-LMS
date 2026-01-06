"use client";

import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "@/lib/apiClient";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // ✅ React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const {login, googleLogin} = useAuth()

  const onSubmit = async (data) => {
    setIsLoading(true);
    await login(data);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center px-4 py-8 overflow-hidden">

      {/* Decorative Circles */}
      <div className="absolute top-[-50px] left-[-50px] w-72 h-72 bg-white/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-[-60px] right-[-40px] w-96 h-96 bg-white/5 rounded-full filter blur-3xl"></div>

      {/* Auth Card */}
      <div className="relative max-w-4xl w-full bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden z-10">

        {/* Left - Form */}
        <div className="flex-1 p-8 md:p-12">
          <Link
            href="/"
            className="text-sm text-[var(--color-secondary)] hover:underline mb-4 inline-block"
          >
            &larr; Back to Home
          </Link>

          <h2 className="text-3xl font-bold mb-6 text-[var(--color-secondary)] text-center md:text-left">
            Stay Learning
          </h2>

          <div className="flex justify-center md:justify-start gap-4 mb-6">
            <button
              type="button"
              onClick={() => googleLogin()}
              className="flex text-[var(--color-text)] items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-2 w-full hover:bg-[var(--color-background)] transition-colors"
            >
              <FcGoogle size={20} /> Google
            </button>
          </div>

          <div className="flex items-center mb-6">
            <hr className="flex-1 border-gray-300" />
            <span className="px-2 text-gray-400 text-sm">or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* React Hook Form */}
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

            <div>
              <label className="block mb-1 text-sm font-medium text-[var(--color-text)]">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
                className="w-full px-4 py-2 bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white py-3 rounded-lg font-semibold transition-colors"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-center md:text-left text-gray-500 text-sm">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-[var(--color-primary)] font-semibold"
            >
              Register
            </Link>
          </p>
        </div>

        {/* Right - Illustration */}
        <div className="hidden md:flex flex-1 bg-[var(--color-background)] items-center justify-center p-6">
          <img
            src="/images/LMSLogin.png"
            alt="Online Learning Illustration"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
