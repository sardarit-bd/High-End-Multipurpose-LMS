export default function StatusPill({ status }) {
  const base =
    "inline-flex text-xs font-semibold px-3 py-1 rounded-full items-center";
  if (status === "Published")
    return <span className={`${base} bg-[var(--color-primary)] text-white`}>{status}</span>;
  if (status === "Pending")
    return <span className={`${base} bg-yellow-400 text-white`}>{status}</span>;
  if (status === "Draft")
    return <span className={`${base} bg-violet-600 text-white`}>{status}</span>;
  return <span className={`${base} bg-gray-200 text-gray-700`}>{status}</span>;
}