"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { XCircle, CreditCard, AlertTriangle } from "lucide-react";

export default function Page() {
    const searchParams = useSearchParams();
    const reason = searchParams.get("reason");      // e.g. "card_declined"
    const code = searchParams.get("code");          // e.g. "payment_intent_authentication_failure"

    return (
        <div className="min-h-screen flex items-center justify-center brandBg px-6 py-16">
            <div className="bg-white text-gray-900 rounded-2xl shadow-2xl max-w-lg w-full p-8 text-center">
                {/* Header */}
                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h1 className="text-3xl font-semibold mb-2 brandColor">Payment Failed</h1>
                <p className="text-gray-600 mb-6">
                    We couldn’t complete your payment. Please review the details below and try again.
                </p>

                {/* Optional error details */}
                {(reason || code) && (
                    <div className="bg-red-50 border border-red-100 text-left rounded-xl p-4 mb-6">
                        <div className="flex items-start gap-2 text-red-700">
                            <AlertTriangle className="w-5 h-5 mt-0.5" />
                            <div className="text-sm">
                                {reason && (
                                    <div className="mb-1">
                                        <span className="font-medium">Reason:</span> {reason.replaceAll("_", " ")}
                                    </div>
                                )}
                                {code && (
                                    <div>
                                        <span className="font-medium">Code:</span> {code}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Helpful hints */}
                <div className="bg-gray-50 rounded-xl p-5 mb-6 text-left border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">How to fix</h2>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                        <li>Check your card details or try a different card.</li>
                        <li>Ensure sufficient balance and 3-D Secure/OTP completion.</li>
                        <li>If the issue persists, contact your bank or our support.</li>
                    </ul>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <Link
                        href="/checkout"
                        className="flex-1 bg-[var(--color-primary)] text-white font-medium py-3 rounded-full hover:opacity-90 transition inline-flex items-center justify-center gap-2"
                    >
                        <CreditCard className="w-4 h-4" />
                        Try Again
                    </Link>
                    <Link
                        href="/orders"
                        className="flex-1 border border-gray-300 text-gray-700 font-medium py-3 rounded-full hover:bg-gray-100 transition"
                    >
                        View Orders
                    </Link>
                </div>

                {/* Secondary links */}
                <div className="mt-6 text-sm text-gray-500">
                    Prefer help?{" "}
                    <Link href="/support" className="font-medium underline underline-offset-4">
                        Contact Support
                    </Link>{" "}
                    or{" "}
                    <Link href="/" className="font-medium underline underline-offset-4">
                        Back to Home
                    </Link>
                    .
                </div>
            </div>
        </div>
    );
}
