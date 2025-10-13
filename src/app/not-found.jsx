"use client";

import Link from "next/link";
import { ArrowLeft, Search, Home, Compass, BookOpen, LifeBuoy } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const [q, setQ] = useState("");

  const onSearch = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <main className="relative min-h-[100vh] overflow-hidden px-6 py-12 grid place-items-center">
      {/* subtle background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.08),transparent_40%),radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.08),transparent_40%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_60%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 w-full max-w-3xl">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 backdrop-blur px-3 py-1 text-xs tracking-wide text-[var(--color-text)]/70 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-[var(--color-primary)]" />
          404 — Page Not Found
        </span>

        {/* Headline */}
        <h1 className="mt-4 text-5xl sm:text-6xl font-extrabold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">
            Oops,
          </span>{" "}
          <span className="text-[var(--color-primary)]">we couldn’t find that page.</span>
        </h1>

        {/* Subtext */}
        <p className="mt-3 text-[var(--color-text)]/80">
          The link may be broken or the page might have moved. Try searching, go back home,
          or explore some helpful links below.
        </p>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-white shadow-[var(--shadow-soft)] hover:opacity-95 transition"
            style={{ background: "var(--color-primary)" }}
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white/80 backdrop-blur px-4 py-2 text-[var(--color-text)] hover:bg-white transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>

        {/* Search */}
        <form
          onSubmit={onSearch}
          className="mt-6 flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur px-3 py-2 shadow-[var(--shadow-soft)]"
        >
          <Search className="h-5 w-5 text-[var(--color-text)]/60" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search courses, pages, or topics..."
            className="w-full bg-transparent outline-none text-[var(--color-text)] placeholder:text-[var(--color-text)]/50"
          />
          <button
            type="submit"
            className="rounded-xl px-3 py-1.5 text-sm text-white"
            style={{ background: "var(--color-secondary)" }}
          >
            Search
          </button>
        </form>

        {/* Helpful links */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: "Explore Courses", href: "/courses", icon: BookOpen },
            { title: "Discover", href: "/about", icon: Compass },
            { title: "Support", href: "/faq", icon: LifeBuoy },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur p-4 shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-medium)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-[var(--color-text)]/80" />
                  <span className="font-medium text-[var(--color-text)]">{item.title}</span>
                </div>
                <span className="text-[var(--color-text)]/40 group-hover:text-[var(--color-text)] transition">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Diagnostic block */}
        <div className="mt-10 rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur p-5 text-[var(--color-text)]/70 shadow-[var(--shadow-soft)]">
          <div className="flex items-center justify-between">
            <code className="block text-xs sm:text-sm">Error: 404_NOT_FOUND</code>
            <span className="hidden sm:inline text-xs text-[var(--color-text)]/60">
              Tip: Press <kbd className="rounded border px-1">/</kbd> to focus search
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
