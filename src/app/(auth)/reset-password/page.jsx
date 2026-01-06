"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "@/lib/apiClient";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPasswordPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { resetPassword } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: { newPassword: "", confirmPassword: "" },
    });

    const newPassword = watch("newPassword");

    const onSubmit = async (data) => {
        if (data.newPassword !== data.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        setIsLoading(true);
        try {
        
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get("token");
            const id = urlParams.get("id");

            if (!token || !id) {
                toast.error("Invalid reset link");
                return;
            }

            const payload = { password: data.newPassword, id: id };
            const res = await resetPassword(payload, token);
            console.log(res);
            if(res?.data?.success !== true){ 
                throw new Error("Failed to reset password");
            }
            toast.success("Password reset successfully!");
            router.push("/login");
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Failed to reset password");
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
            <div className="relative max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden z-10 p-8">
                <Link
                    href="/forgot-password"
                    className="text-sm text-[var(--color-secondary)] hover:underline mb-4 inline-block"
                >
                    &larr; Back to Forgot Password
                </Link>

                <h2 className="text-3xl font-bold mb-6 text-[var(--color-secondary)] text-center">
                    Reset Password
                </h2>

                <p className="text-gray-500 text-sm mb-6 text-center">
                    Enter the OTP sent to your email and your new password.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-[var(--color-text)]">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                placeholder="Enter new password"
                                {...register("newPassword", {
                                    required: "New password is required",
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{8,})$/,
                                        message: "Password must be at least 8 characters long, include 1 uppercase letter, and 1 special character (!@#$%^&*)",
                                    },
                                })}
                                className="w-full px-4 py-2 pr-10 bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.newPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.newPassword.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-[var(--color-text)]">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm new password"
                                {...register("confirmPassword", {
                                    required: "Confirm password is required",
                                    validate: (value) => value === newPassword || "Passwords do not match",
                                })}
                                className="w-full px-4 py-2 pr-10 bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                        {isLoading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}