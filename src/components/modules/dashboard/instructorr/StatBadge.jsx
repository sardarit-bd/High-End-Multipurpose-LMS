export function StatBadge({ label, value, colorClass }) {
  return (
    <div
      className={`rounded-lg px-4 py-3 shadow-sm flex flex-col gap-1 min-w-[120px] ${colorClass}`}
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      <span className="text-xs font-medium text-white/90">{label}</span>
      <span className="text-xl font-bold text-white">{value}</span>
    </div>
  );
}