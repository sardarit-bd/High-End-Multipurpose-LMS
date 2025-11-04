export default function TaskItem({ task, onOpen }) {
  return (
    <li className="p-1">
      <button
        onClick={onOpen}
        className="flex items-center justify-between w-full px-3 py-2 rounded-xl bg-white/70 hover:bg-white/90"
        style={{ boxShadow: "var(--shadow-soft)" }}
      >
        <span className="text-sm">{task?.title}</span>
        <span className="text-xs text-gray-500">{task?.type}</span>
      </button>
    </li>
  );
}
