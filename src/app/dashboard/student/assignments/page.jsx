"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import {
  Search,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Clock3,
  Eye,
} from "lucide-react";

/* ============================ Utilities ========================== */

const STATUSES = ["All", "Pending", "Reviewed"];

function classNames(...a) {
  return a.filter(Boolean).join(" ");
}

// Custom hook for fetching submissions
const useStudentSubmissions = () => {
  return useQuery({
    queryKey: ['studentSubmissions'],
    queryFn: async () => {
      const res = await api.get('/submissions/me');
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
};

/* ================================ Page ================================= */

export default function AssignmentsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");

  const { data: submissionsData, isLoading, error } = useStudentSubmissions();
  
  const submissions = useMemo(() => {
    if (!submissionsData?.data) return [];
    return submissionsData.data;
  }, [submissionsData]);

  const stats = useMemo(() => {
    const total = submissions.length;
    const pending = submissions.filter((s) => s.status === "pending").length;
    const reviewed = submissions.filter((s) => s.status === "reviewed").length;
    return { total, pending, reviewed };
  }, [submissions]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return submissions.filter((s) => {
      const matchesQ =
        !q ||
        s.task?.title?.toLowerCase().includes(q) ||
        s.course?.title?.toLowerCase().includes(q);
      const matchesStatus = 
        status === "All" ? true : 
        status === "Pending" ? s.status === "pending" :
        s.status === "reviewed";
      return matchesQ && matchesStatus;
    });
  }, [query, status, submissions]);

  if (isLoading) {
    return (
      <section className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-xl">
        Error loading submissions. Please try again later.
      </div>
    );
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">My Submissions</h1>
          <p className="text-[var(--color-text)]/70 text-sm">Track your task submissions and grades</p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-2">
          <StatCard icon={<BookOpen className="h-4 w-4" />} label="Total" value={stats.total} />
          <StatCard icon={<Clock3 className="h-4 w-4" />} label="Pending" value={stats.pending} tone="secondary" />
          <StatCard icon={<CheckCircle2 className="h-4 w-4" />} label="Reviewed" value={stats.reviewed} tone="primary" />
        </div>
      </header>

      {/* Toolbar */}
      <div className="rounded-2xl p-3 md:p-4 bg-white shadow-md">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <label className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2 md:min-w-[320px]">
            <Search className="opacity-60 h-5 w-5" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by task or course"
              className="w-full bg-transparent outline-none text-[var(--color-text)] placeholder-[var(--color-text)]/50"
            />
          </label>

          {/* Status filter */}
          {/* <div className="flex flex-wrap items-center gap-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={classNames(
                  "rounded-full px-3 py-1.5 text-sm transition shadow-sm",
                  status === s 
                    ? "bg-[var(--color-secondary)] text-white" 
                    : "bg-white text-[var(--color-text)] hover:bg-gray-50"
                )}
              >
                {s}
              </button>
            ))}
          </div> */}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl bg-white md:block shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="sticky top-0 z-10 bg-gray-50">
              <tr className="text-left">
                {["Task", "Course", "Status", "Points", "Max Points", "Review Note"].map((h) => (
                  <th key={h} className="p-4 text-xs font-semibold uppercase tracking-wide text-[var(--color-text)]/70">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-[var(--color-text)]/70">
                    No submissions found.
                  </td>
                </tr>
              )}
              {filtered.map((s) => (
                <tr key={s._id} className="transition hover:bg-gray-50 border-b border-gray-100">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 opacity-70" />
                      <span className="font-medium text-[var(--color-text)]">{s.task?.title || "N/A"}</span>
                    </div>
                  </td>
                  <td className="p-4">{s.course?.title || "N/A"}</td>
                  <td className="p-4">
                    <StatusBadge status={s.status} />
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-[var(--color-primary)]">{s.pointsAwarded || 0}</span>
                  </td>
                  <td className="p-4">{s.task?.maxPoints || 0}</td>
                  <td className="p-4">
                    <span className="text-sm text-[var(--color-text)]/70">
                      {s.reviewNote || "-"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile List */}
      <div className="grid gap-4 md:hidden">
        {filtered.length === 0 && (
          <div className="rounded-xl bg-white p-4 text-center text-[var(--color-text)]/70 shadow-sm">
            No submissions found.
          </div>
        )}

        {filtered.map((s) => (
          <article key={s._id} className="rounded-2xl bg-white p-4 space-y-3 shadow-md">
            <header className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-[var(--color-text)]">{s.task?.title || "N/A"}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[var(--color-text)]/70">
                  <span className="inline-flex items-center gap-1">
                    <BookOpen className="h-4 w-4" /> {s.course?.title || "N/A"}
                  </span>
                </div>
              </div>
              <StatusBadge status={s.status} />
            </header>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-[var(--color-text)]/60">Points:</span>
                <span className="ml-2 font-semibold text-[var(--color-primary)]">{s.pointsAwarded || 0}</span>
                <span className="text-[var(--color-text)]/60"> / {s.task?.maxPoints || 0}</span>
              </div>
            </div>

            {s.reviewNote && (
              <div className="text-sm">
                <span className="text-[var(--color-text)]/60">Review: </span>
                <span>{s.reviewNote}</span>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

/* =============================== UI Components =============================== */

function StatCard({ icon, label, value, tone = "default" }) {
  const bg =
    tone === "primary" ? "var(--color-primary)" :
    tone === "secondary" ? "var(--color-secondary)" :
    "var(--color-text)";
    
  return (
    <div className="rounded-xl px-4 py-3 text-white shadow-md" style={{ background: bg }}>
      <div className="flex items-center justify-between">
        <span className="text-xs opacity-90">{label}</span>
        <span className="opacity-90">{icon}</span>
      </div>
      <div className="mt-1 text-lg font-bold">{value}</div>
    </div>
  );
}

function StatusBadge({ status }) {
  const config = status === "reviewed" 
    ? { bg: "var(--color-primary)", icon: CheckCircle2, label: "Reviewed" }
    : { bg: "var(--color-secondary)", icon: Clock3, label: "Pending" };

  const Icon = config.icon;
  
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs text-white shadow-sm"
      style={{ background: config.bg }}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{config.label}</span>
    </span>
  );
}