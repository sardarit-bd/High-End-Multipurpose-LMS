"use client";

import { useMemo, useState } from "react";
import {
  Calendar,
  Search,
  Clock3,
  BookOpen,
  UploadCloud,
  Eye,
  CheckCircle2,
  AlertCircle,
  TimerReset,
} from "lucide-react";

/* --------------------------- Mock Assignments --------------------------- */

const ASSIGNMENTS = [
  {
    id: "A-101",
    title: "React Components & Props",
    course: "Frontend Dev",
    due: "2025-10-20",
    status: "Pending",
    progress: 40,
    priority: "High",
  },
  {
    id: "A-102",
    title: "Database Schema Design",
    course: "Backend Dev",
    due: "2025-10-15",
    status: "Overdue",
    progress: 65,
    priority: "High",
  },
  {
    id: "A-103",
    title: "UI/UX Heuristics Report",
    course: "Design Basics",
    due: "2025-10-25",
    status: "Submitted",
    progress: 100,
    priority: "Medium",
  },
  {
    id: "A-104",
    title: "Algorithms: Sorting Lab",
    course: "DSA",
    due: "2025-10-18",
    status: "In Review",
    progress: 100,
    priority: "Medium",
  },
  {
    id: "A-105",
    title: "REST API with Express",
    course: "Backend Dev",
    due: "2025-10-28",
    status: "Pending",
    progress: 10,
    priority: "Low",
  },
  {
    id: "A-106",
    title: "Landing Page (Responsive)",
    course: "Frontend Dev",
    due: "2025-10-22",
    status: "Graded",
    score: "92/100",
    progress: 100,
    priority: "Medium",
  },
];

/* ------------------------------- Page ---------------------------------- */
export default function AssignmentsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [course, setCourse] = useState("All");

  const courses = useMemo(
    () => Array.from(new Set(ASSIGNMENTS.map((a) => a.course))),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ASSIGNMENTS.filter((a) => {
      const matchesQ =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.course.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q);
      const matchesStatus = status === "All" ? true : a.status === status;
      const matchesCourse = course === "All" ? true : a.course === course;
      return matchesQ && matchesStatus && matchesCourse;
    }).sort((a, b) => (a.due > b.due ? 1 : -1));
  }, [query, status, course]);

  const stats = useMemo(() => {
    const total = ASSIGNMENTS.length;
    const submitted = ASSIGNMENTS.filter((a) => a.status === "Submitted" || a.status === "In Review").length;
    const graded = ASSIGNMENTS.filter((a) => a.status === "Graded").length;
    const overdue = ASSIGNMENTS.filter((a) => a.status === "Overdue").length;
    return { total, submitted, graded, overdue };
  }, []);

  return (
    <section className="space-y-6">
      {/* Header */}
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">Assignments</h1>
          <p className="text-[var(--color-text)]/70 text-sm">
            Track deadlines, submit work, and monitor your progress.
          </p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <StatCard
            icon={<TimerReset className="h-4 w-4" />}
            label="Total"
            value={stats.total}
          />
          <StatCard
            icon={<UploadCloud className="h-4 w-4" />}
            label="Submitted"
            value={stats.submitted}
            tone="secondary"
          />
          <StatCard
            icon={<CheckCircle2 className="h-4 w-4" />}
            label="Graded"
            value={stats.graded}
            tone="primary"
          />
          <StatCard
            icon={<AlertCircle className="h-4 w-4" />}
            label="Overdue"
            value={stats.overdue}
            tone="danger"
          />
        </div>
      </header>

      {/* Filters */}
      <div
        className="rounded-2xl p-3 md:p-4"
        style={{ background: "rgba(255,255,255,var(--container-opacity))", boxShadow: "var(--shadow-medium)" }}
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div
            className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 md:min-w-[320px]"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <Search className="opacity-60 h-5 w-5" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, course, or ID"
              className="w-full bg-transparent outline-none text-[var(--color-text)] placeholder-[var(--color-text)]/50"
            />
          </div>

          {/* Status filter chips */}
          <div className="flex flex-wrap items-center gap-2">
            {(["All", "Pending", "Submitted", "In Review", "Graded", "Overdue"]).map((s) => {
              const active = status === s;
              return (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`rounded-full px-3 py-1.5 text-sm transition ${
                    active ? "text-white" : "text-[var(--color-text)]"
                  }`}
                  style={{
                    background: active
                      ? s === "Overdue"
                        ? "#ef4444"
                        : s === "Graded"
                        ? "var(--color-primary)"
                        : "var(--color-secondary)"
                      : "rgba(255,255,255,1)",
                    boxShadow: "var(--shadow-soft)",
                  }}
                >
                  {s}
                </button>
              );
            })}
          </div>

          {/* Course filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-[var(--color-text)]/60">Course:</span>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <FilterPill
                label="All"
                active={course === "All"}
                onClick={() => setCourse("All")}
              />
              {courses.map((c) => (
                <FilterPill
                  key={c}
                  label={c}
                  active={course === c}
                  onClick={() => setCourse(c)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div
        className="hidden overflow-hidden rounded-2xl bg-white md:block"
        style={{ boxShadow: "var(--shadow-medium)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="sticky top-0">
              <tr className="bg-[var(--color-background)] text-left">
                {["ID", "Title", "Course", "Due", "Status", "Action"].map((h) => (
                  <th
                    key={h}
                    className="p-4 text-xs font-semibold uppercase tracking-wide text-[var(--color-text)]/70"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-[var(--color-text)]/70">
                    No assignments match your filters.
                  </td>
                </tr>
              )}
              {filtered.map((a) => (
                <tr key={a.id} className="transition hover:bg-[var(--color-background)]/60">
                  <td className="p-4 font-medium">{a.id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 opacity-70" />
                      <span className="font-medium text-[var(--color-text)]">{a.title}</span>
                    </div>
                  </td>
                  <td className="p-4">{a.course}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 opacity-70" />
                      <span>{formatDate(a.due)}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <StatusPill status={a.status} score={a.score} />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <ActionBtn tone="ghost" icon={<Eye className="h-4 w-4" />} label="View" />
                      {a.status === "Pending" || a.status === "Overdue" ? (
                        <ActionBtn tone="primary" icon={<UploadCloud className="h-4 w-4" />} label="Submit" />
                      ) : (
                        <ActionBtn tone="soft" icon={<UploadCloud className="h-4 w-4" />} label="Resubmit" />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 md:hidden">
        {filtered.length === 0 && (
          <div
            className="rounded-xl bg-white p-4 text-center text-[var(--color-text)]/70"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            No assignments match your filters.
          </div>
        )}

        {filtered.map((a) => (
          <article
            key={a.id}
            className="rounded-2xl bg-white p-4"
            style={{ boxShadow: "var(--shadow-medium)" }}
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-[var(--color-text)]">{a.title}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[var(--color-text)]/70">
                  <span className="inline-flex items-center gap-1">
                    <BookOpen className="h-4 w-4" /> {a.course}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> {formatDate(a.due)}
                  </span>
                </div>
              </div>
              <StatusPill status={a.status} score={a.score} />
            </div>


            <div className="flex items-center justify-end gap-2">
              <ActionBtn tone="ghost" icon={<Eye className="h-4 w-4" />} label="View" />
              {a.status === "Pending" || a.status === "Overdue" ? (
                <ActionBtn tone="primary" icon={<UploadCloud className="h-4 w-4" />} label="Submit" />
              ) : (
                <ActionBtn tone="soft" icon={<UploadCloud className="h-4 w-4" />} label="Resubmit" />
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------- UI Pieces ------------------------------ */
function StatCard({
  icon,
  label,
  value,
  tone = "default",
}) {
  const bg =
    tone === "primary"
      ? "var(--color-primary)"
      : tone === "secondary"
      ? "var(--color-secondary)"
      : tone === "danger"
      ? "#ef4444"
      : "var(--color-text)";
  return (
    <div
      className="rounded-xl px-4 py-3 text-white"
      style={{ background: bg, boxShadow: "var(--shadow-medium)" }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs opacity-90">{label}</span>
        <span className="opacity-90">{icon}</span>
      </div>
      <div className="mt-1 text-lg font-bold">{value}</div>
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}) {
  return (
    <button
      className={`rounded-full px-3 py-1.5 text-sm transition ${
        active ? "text-white" : "text-[var(--color-text)]"
      }`}
      style={{
        background: active ? "var(--color-primary)" : "rgba(255,255,255,1)",
        boxShadow: "var(--shadow-soft)",
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function StatusPill({
  status,
  score,
}) {
  let bg = "var(--color-secondary)";
  if (status === "Graded") bg = "var(--color-primary)";
  if (status === "Overdue") bg = "#ef4444";
  if (status === "Pending") bg = "var(--color-text)";

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs text-white"
      style={{ background: bg, boxShadow: "var(--shadow-soft)" }}
      title={score ? `Score: ${score}` : undefined}
    >
      {status === "Graded" ? <CheckCircle2 className="h-3.5 w-3.5" /> : null}
      {status === "Overdue" ? <AlertCircle className="h-3.5 w-3.5" /> : null}
      {status === "Pending" ? <Clock3 className="h-3.5 w-3.5" /> : null}
      {status === "In Review" ? <TimerReset className="h-3.5 w-3.5" /> : null}
      <span>{status}</span>
      {score && <span className="ml-1 opacity-90">• {score}</span>}
    </span>
  );
}

function ProgressBar({ value }) {
  const safe = Math.max(0, Math.min(100, value));
  return (
    <div className="h-2 w-full rounded-full bg-black/10">
      <div
        className="h-2 rounded-full transition-all"
        style={{
          width: `${safe}%`,
          background: safe === 100 ? "var(--color-primary)" : "var(--color-secondary)",
        }}
      />
    </div>
  );
}

function ActionBtn({
  icon,
  label,
  tone = "primary",
}) {
  const style =
    tone === "primary"
      ? {
          background: "var(--color-secondary)",
          color: "white",
          hover: "var(--color-secondary-hover)",
        }
      : tone === "soft"
      ? {
          background: "rgba(0,0,0,0.04)",
          color: "var(--color-text)",
          hover: "rgba(0,0,0,0.08)",
        }
      : {
          background: "transparent",
          color: "var(--color-text)",
          hover: "rgba(0,0,0,0.06)",
        };

  return (
    <button
      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition"
      style={{ background: style.background, color: style.color, boxShadow: "var(--shadow-soft)" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = style.hover)}
      onMouseLeave={(e) => (e.currentTarget.style.background = style.background)}
      aria-label={label}
      title={label}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

/* ------------------------------ Helpers ------------------------------- */
function formatDate(input) {
  // Expecting ISO like "2025-10-20" or natural strings; keep simple + consistent.
  const d = new Date(input);
  if (isNaN(d.getTime())) return input;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}
