export default function StatCard({ icon, title, value, accent }) {
  return (
    <div
      className={`flex items-center justify-between bg-white rounded-[var(--radius-card)] shadow-sm p-4 ${
        accent ? "text-white bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]" : ""
      }`}
    >
      <div className="flex flex-col">
        <span className="text-sm opacity-80">{title}</span>
        <span className="text-xl font-bold">{value}</span>
      </div>
      <div className="text-2xl opacity-80">{icon}</div>
    </div>
  );
}