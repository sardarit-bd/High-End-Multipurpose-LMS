"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
// export enum Role {
//     SUPER_ADMIN = 'SUPER_ADMIN',
//     ADMIN = 'ADMIN',
//     STUDENT = 'STUDENT',
//     INSTRUCTOR = 'INSTRUCTOR',
//     ORGANIZATION = 'ORGANIZATION'
// }
export default function RegisterPage() {

  const { register: registerUser, googleLogin } = useAuth();
  const [role, setRole] = useState("STUDENT");
  const [isLoading, setIsLoading] = useState(false);

  const illustrationSrc =
    role === "student" ? "/images/student.png" : "/images/teacher.png";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { email: "", password: "", name: "" },
  });

  const onSubmit = async (formData) => {
    setIsLoading(true);
    try {
      await registerUser({ ...formData, role });
      toast.success("Account created successfully!");
      reset();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
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
            Create Account
          </h2>

          {/* Google Login */}
          <div className="flex justify-center md:justify-start gap-4 mb-6">
            <button
              type="button"
              onClick={googleLogin}
              className="flex text-[var(--color-text)] items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-2 w-full hover:bg-[var(--color-background)] transition-colors"
            >
              <FcGoogle size={20} /> Sign up with Google
            </button>
          </div>

          <div className="flex items-center mb-6">
            <hr className="flex-1 border-gray-300" />
            <span className="px-2 text-gray-400 text-sm">or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-[var(--color-text)]">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                {...register("name", { required: "Name is required" })}
                className="w-full px-4 py-2 bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

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

            {/* Role Selection */}
            <div>
              <label className="block mb-1 text-sm font-medium text-[var(--color-text)]">
                Select Role
              </label>
              <div className="flex gap-4 mb-4">
                <button
                  type="button"
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                    role === "STUDENT"
                      ? "bg-[var(--color-primary)] text-white"
                      : "bg-[var(--color-background)] text-[var(--color-text)] border border-gray-300"
                  }`}
                  onClick={() => setRole("student")}
                >
                  Student
                </button>
                <button
                  type="button"
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                    role === "INSTRUCTOR"
                      ? "bg-[var(--color-primary)] text-white"
                      : "bg-[var(--color-background)] text-[var(--color-text)] border border-gray-300"
                  }`}
                  onClick={() => setRole("INSTRUCTOR")}
                >
                  Instructor
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white py-3 rounded-lg font-semibold transition-colors"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="mt-4 text-center md:text-left text-gray-500 text-sm">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-[var(--color-primary)] font-semibold"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Right - Illustration */}
        <div className="hidden md:flex flex-1 bg-[var(--color-background)] items-center justify-center p-6">
          <img
            src={illustrationSrc}
            alt={`${role} Illustration`}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
