// components/auth/ChangePassword.jsx
"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { toast } from "react-toastify";

// Hook for changing password
const useChangePassword = () => {
    return useMutation({
        mutationFn: async (data) => {
            const res = await api.post('/auth/change-password', data);
            return res.data;
        }
    });
};
// Reusable ChangePassword component
const ChangePassword = () => {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    // Password form state
    const changePassword = useChangePassword();
    const [passwordForm, setPasswordForm] = useState({
        oldPassword: "",
        newPassword: ""
    });

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        try {
            await changePassword.mutateAsync(passwordForm);
            toast.success("Password changed successfully!");
            setPasswordForm({ oldPassword: "", newPassword: "" });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to change password");
        }
    };

    return (
        <div className="bg-white rounded-[--radius-card] shadow-md overflow-hidden">
            <div className="border-b border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>
                <p className="text-sm text-gray-500 mt-1">Update your password to keep your account secure</p>
            </div>

            <div className="p-6">
                <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Current Password
                        </label>
                        <div className="relative">
                            <input
                                type={showOldPassword ? "text" : "password"}
                                value={passwordForm.oldPassword}
                                onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#189E75] focus:border-transparent transition pr-12"
                                placeholder="Enter current password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowOldPassword(!showOldPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700"
                            >
                                {showOldPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                value={passwordForm.newPassword}
                                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#189E75] focus:border-transparent transition pr-12"
                                placeholder="Enter new password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700"
                            >
                                {showNewPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Make sure your new password is strong and secure</p>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={changePassword.isLoading}
                            className="w-full px-4 py-3 bg-[#189E75] hover:bg-[#147c5e] text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {changePassword.isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Updating Password...
                                </>
                            ) : (
                                'Change Password'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;