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
  ArrowUpAZ,
  ArrowDownAZ,
} from "lucide-react";

/* ========================== Mock Assignments =========================== */

const ASSIGNMENTS = [
  { id: "A-101", title: "React Components & Props", course: "Frontend Dev", due: "2025-10-20", status: "Pending", progress: 40, priority: "High" },
  { id: "A-102", title: "Database Schema Design", course: "Backend Dev", due: "2025-10-15", status: "Overdue", progress: 65, priority: "High" },
  { id: "A-103", title: "UI/UX Heuristics Report", course: "Design Basics", due: "2025-10-25", status: "Submitted", progress: 100, priority: "Medium" },
  { id: "A-104", title: "Algorithms: Sorting Lab", course: "DSA", due: "2025-10-18", status: "In Review", progress: 100, priority: "Medium" },
  { id: "A-105", title: "REST API with Express", course: "Backend Dev", due: "2025-10-28", status: "Pending", progress: 10, priority: "Low" },
  { id: "A-106", title: "Landing Page (Responsive)", course: "Frontend Dev", due: "2025-10-22", status: "Graded", score: "92/100", progress: 100, priority: "Medium" },
];

/* ============================ Small Utilities ========================== */

const STATUSES = ["All", "Pending", "Submitted", "In Review", "Graded", "Overdue"];

function formatDate(input) {
  const d = new Date(input);
  if (isNaN(d.getTime())) return input;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}

function daysUntil(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const one = 1000 * 60 * 60 * 24;
  return Math.floor((d.setHours(0, 0, 0, 0) - now.setHours(0, 0, 0, 0)) / one);
}

function classNames(...a) {
  return a.filter(Boolean).join(" ");
}

/* status color mapping via css vars */
function statusTone(status) {
  if (status === "Graded") return { bg: "var(--color-primary)", icon: CheckCircle2 };
  if (status === "Overdue") return { bg: "#ef4444", icon: AlertCircle };
  if (status === "Pending") return { bg: "var(--color-text)", icon: Clock3 };
  if (status === "In Review") return { bg: "var(--color-secondary)", icon: TimerReset };
  if (status === "Submitted") return { bg: "var(--color-secondary)", icon: UploadCloud };
  return { bg: "var(--color-text)", icon: Clock3 };
}

/* ================================ Page ================================= */

export default function AssignmentsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [course, setCourse] = useState("All");
  const [sortBy, setSortBy] = useState("dueAsc");

  const courses = useMemo(
    () => ["All", ...Array.from(new Set(ASSIGNMENTS.map((a) => a.course)))],
    []
  );

  const stats = useMemo(() => {
    const total = ASSIGNMENTS.length;
    const submitted = ASSIGNMENTS.filter((a) => a.status === "Submitted" || a.status === "In Review").length;
    const graded = ASSIGNMENTS.filter((a) => a.status === "Graded").length;
    const overdue = ASSIGNMENTS.filter((a) => a.status === "Overdue").length;
    return { total, submitted, graded, overdue };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const base = ASSIGNMENTS.filter((a) => {
      const matchesQ =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.course.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q);
      const matchesStatus = status === "All" ? true : a.status === status;
      const matchesCourse = course === "All" ? true : a.course === course;
      return matchesQ && matchesStatus && matchesCourse;
    });

    const sorted = [...base].sort((a, b) => {
      if (sortBy === "titleAsc") return a.title.localeCompare(b.title);
      if (sortBy === "titleDesc") return b.title.localeCompare(a.title);
      if (sortBy === "dueDesc") return new Date(b.due) - new Date(a.due);
      return new Date(a.due) - new Date(b.due);
    });

    return sorted;
  }, [query, status, course, sortBy]);

  return (
    <section className="space-y-6">
      {/* Header */}
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">Assignments</h1>
          <p className="text-[var(--color-text)]/70 text-sm">Track deadlines, submit work, and monitor your progress.</p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <StatCard icon={<TimerReset className="h-4 w-4" />} label="Total" value={stats.total} />
          <StatCard icon={<UploadCloud className="h-4 w-4" />} label="Submitted" value={stats.submitted} tone="secondary" />
          <StatCard icon={<CheckCircle2 className="h-4 w-4" />} label="Graded" value={stats.graded} tone="primary" />
          <StatCard icon={<AlertCircle className="h-4 w-4" />} label="Overdue" value={stats.overdue} tone="danger" />
        </div>
      </header>

      {/* Toolbar */}
      <Toolbar
        query={query}
        setQuery={setQuery}
        status={status}
        setStatus={setStatus}
        courses={courses}
        course={course}
        setCourse={setCourse}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Desktop Table */}
      <DesktopTable items={filtered} />

      {/* Mobile List */}
      <MobileList items={filtered} />
    </section>
  );
}

/* ============================== Components ============================= */

function Toolbar({ query, setQuery, status, setStatus, courses, course, setCourse, sortBy, setSortBy }) {
  return (
    <div
      className="rounded-2xl p-3 md:p-4"
      style={{ background: "rgba(255,255,255,var(--container-opacity))", boxShadow: "var(--shadow-medium)" }}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <label
          className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 md:min-w-[320px]"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <Search className="opacity-60 h-5 w-5" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, course, or ID"
            className="w-full bg-transparent outline-none text-[var(--color-text)] placeholder-[var(--color-text)]/50"
          />
        </label>

        {/* Status filter chips */}
        <div className="flex flex-wrap items-center gap-2">
          {STATUSES.map((s) => (
            <Pill
              key={s}
              active={status === s}
              onClick={() => setStatus(s)}
              label={s}
              tone={s === "Overdue" ? "danger" : s === "Graded" ? "primary" : s === "All" ? "muted" : "secondary"}
            />
          ))}
        </div>

        {/* Course & Sort */}
        <div className="flex flex-wrap items-center gap-2">
          <Select
            label="Course"
            value={course}
            onChange={(v) => setCourse(v)}
            options={courses.map((c) => ({ label: c, value: c }))}
          />
          <Select
            label="Sort"
            value={sortBy}
            onChange={(v) => setSortBy(v)}
            options={[
              { label: "Due ↑ (Soonest)", value: "dueAsc", icon: <ArrowUpAZ className="h-4 w-4" /> },
              { label: "Due ↓ (Latest)", value: "dueDesc", icon: <ArrowDownAZ className="h-4 w-4" /> },
              { label: "Title A–Z", value: "titleAsc", icon: <ArrowUpAZ className="h-4 w-4" /> },
              { label: "Title Z–A", value: "titleDesc", icon: <ArrowDownAZ className="h-4 w-4" /> },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function DesktopTable({ items }) {
  return (
    <div
      className="hidden overflow-hidden rounded-2xl bg-white md:block"
      style={{ boxShadow: "var(--shadow-medium)" }}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="sticky top-0 z-10">
            <tr className="bg-[var(--color-background)] text-left">
              {["ID", "Title", "Course", "Due", "Progress", "Status", "Action"].map((h) => (
                <th key={h} className="p-4 text-xs font-semibold uppercase tracking-wide text-[var(--color-text)]/70">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-[var(--color-text)]/70">
                  No assignments match your filters.
                </td>
              </tr>
            )}
            {items.map((a) => (
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
                  <DueCell due={a.due} />
                </td>
                <td className="p-4">
                  <div className="min-w-[160px]">
                    <ProgressBar value={a.progress ?? 0} />
                  </div>
                </td>
                <td className="p-4">
                  <StatusBadge status={a.status} score={a.score} />
                </td>
                <td className="p-4">
                  <ActionsFor status={a.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MobileList({ items }) {
  return (
    <div className="grid gap-4 md:hidden">
      {items.length === 0 && (
        <div
          className="rounded-xl bg-white p-4 text-center text-[var(--color-text)]/70"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          No assignments match your filters.
        </div>
      )}

      {items.map((a) => (
        <article
          key={a.id}
          className="rounded-2xl bg-white p-4 space-y-3"
          style={{ boxShadow: "var(--shadow-medium)" }}
        >
          <header className="flex items-start justify-between gap-3">
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
            <StatusBadge status={a.status} score={a.score} />
          </header>

          <div>
            <ProgressBar value={a.progress ?? 0} />
          </div>

          <footer className="flex items-center justify-end gap-2">
            <ActionsFor status={a.status} />
          </footer>
        </article>
      ))}
    </div>
  );
}

/* =============================== UI Bits =============================== */

function StatCard({ icon, label, value, tone = "default" }) {
  const bg =
    tone === "primary" ? "var(--color-primary)" :
      tone === "secondary" ? "var(--color-secondary)" :
        tone === "danger" ? "#ef4444" :
          "var(--color-text)";
  return (
    <div className="rounded-xl px-4 py-3 text-white" style={{ background: bg, boxShadow: "var(--shadow-medium)" }}>
      <div className="flex items-center justify-between">
        <span className="text-xs opacity-90">{label}</span>
        <span className="opacity-90">{icon}</span>
      </div>
      <div className="mt-1 text-lg font-bold">{value}</div>
    </div>
  );
}

function Pill({ label, active, onClick, tone = "secondary" }) {
  const bgActive =
    tone === "danger" ? "bg-red-500" :
      tone === "primary" ? "bg-[var(--color-primary)]" :
        tone === "muted" ? "bg-[var(--color-text)]/70" :
          "bg-[var(--color-secondary)]";

  return (
    <button
      onClick={onClick}
      className={classNames(
        "rounded-full px-3 py-1.5 text-sm transition shadow-sm",
        active ? `${bgActive} text-white` : "bg-white text-[var(--color-text)] hover:bg-[var(--color-background)]"
      )}
    >
      {label}
    </button>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="inline-flex items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-sm">
      <span className="text-sm text-[var(--color-text)]/60">{label}:</span>
      <select
        className="text-sm bg-transparent outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.value ?? o} value={o.value ?? o}>
            {o.icon ? " " : ""}
            {o.label ?? o}
          </option>
        ))}
      </select>
    </label>
  );
}

function StatusBadge({ status, score }) {
  const { bg, icon: Icon } = statusTone(status);
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs text-white"
      style={{ background: bg, boxShadow: "var(--shadow-soft)" }}
      title={score ? `Score: ${score}` : undefined}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{status}</span>
      {score && <span className="ml-1 opacity-90">• {score}</span>}
    </span>
  );
}

function ProgressBar({ value }) {
  const safe = Math.max(0, Math.min(100, value));
  const done = safe === 100;
  return (
    <div className="h-2 w-full rounded-full bg-black/10 overflow-hidden">
      <div
        className={classNames("h-2 rounded-full transition-all", done ? "bg-[var(--color-primary)]" : "bg-[var(--color-secondary)]")}
        style={{ width: `${safe}%` }}
      />
    </div>
  );
}

function ActionsFor({ status }) {
  const primaryLabel = status === "Pending" || status === "Overdue" ? "Submit" : "Resubmit";
  return (
    <div className="flex items-center gap-2">
      <ActionBtn tone="ghost" icon={<Eye className="h-4 w-4" />} label="View" />
      <ActionBtn tone={status === "Pending" || status === "Overdue" ? "primary" : "soft"} icon={<UploadCloud className="h-4 w-4" />} label={primaryLabel} />
    </div>
  );
}

function ActionBtn({ icon, label, tone = "primary" }) {
  const base = "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";
  const styles =
    tone === "primary"
      ? "bg-[var(--color-secondary)] text-white hover:opacity-90 focus:ring-[var(--color-secondary)]"
      : tone === "soft"
        ? "bg-black/5 text-[var(--color-text)] hover:bg-black/10 focus:ring-black/20"
        : "bg-transparent text-[var(--color-text)] hover:bg-black/5 focus:ring-black/10";
  return (
    <button className={classNames(base, styles)} aria-label={label} title={label}>
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function DueCell({ due }) {
  const d = formatDate(due);
  const left = daysUntil(due);
  const isSoon = left >= 0 && left <= 3;
  const isOver = left < 0;
  return (
    <div className="flex items-center gap-2">
      <Calendar className={classNames("h-4 w-4", isOver ? "text-red-500" : isSoon ? "text-amber-500" : "text-black/60")} />
      <span className="whitespace-nowrap">{d}</span>
      {isOver && <span className="text-xs text-red-500">• Overdue</span>}
      {!isOver && isSoon && <span className="text-xs text-amber-600">• Due in {left}d</span>}
    </div>
  );
}
