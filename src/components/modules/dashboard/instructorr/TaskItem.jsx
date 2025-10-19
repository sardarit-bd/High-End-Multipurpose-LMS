export default function TaskItem({ title, time }) {
  return (
    <div className="mb-3">
      <p className="font-medium">{title}</p>
      <p className="text-xs text-gray-400">{time}</p>
    </div>
  );
}