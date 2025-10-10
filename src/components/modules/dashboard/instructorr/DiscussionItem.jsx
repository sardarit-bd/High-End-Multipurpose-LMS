export default function DiscussionItem({ message, time }) {
  return (
    <div className="border-b border-gray-100 pb-2 mb-3">
      <p className="text-sm">{message}</p>
      <p className="text-xs text-gray-400">{time}</p>
    </div>
  );
}