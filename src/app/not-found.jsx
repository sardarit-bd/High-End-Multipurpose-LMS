"use client";

import Link from "next/link";
import { ArrowLeft, Search, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] grid place-items-center bg-[--color-background] px-6">
      <div className="max-w-xl w-full text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs tracking-wide text-[var(--color-text)]/70">
          <span className="h-2 w-2 rounded-full bg-[--color-primary]" />
          404 — Page Not Found
        </span>

        {/* Headline */}
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-[var(--color-text)]">
          Oops. We couldn’t find that page.
        </h1>

        {/* Subtext */}
        <p className="mt-3 text-[var(--color-text)]/80">
          The link may be broken or the page may have been moved. Try going back
          home or explore our courses.
        </p>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-[--radius-default] bg-[--color-primary] px-4 py-2 font-medium text-[var(--color-text)] shadow-sm hover:opacity-90"
          >
            <Home size={16} />
            Go Home
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-[--radius-default] border px-4 py-2 font-medium text-[var(--color-text)] hover:bg-white/60"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </div>

        {/* Helpful links */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          {[
            { title: "All Courses", href: "/courses" },
            { title: "Pricing", href: "/pricing" },
            { title: "Support", href: "/support" },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-2xl border p-4 hover:bg-white/60 transition"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-[var(--color-text)]">
                  {item.title}
                </span>
                <span className="text-[var(--color-text)]/50 group-hover:text-[var(--color-text)]">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Illustration-ish block */}
        <div className="mt-10 rounded-2xl bg-black/5 p-6 text-[var(--color-text)]/70">
          <code className="block text-sm">Error: 404_NOT_FOUND</code>
        </div>
      </div>
    </main>
  );
}
