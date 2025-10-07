export default function CourseItem({ title, code, price, subs }) {
  return (
    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-400">{code}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-[var(--color-primary)]">{price}</p>
        <p className="text-xs text-gray-400">{subs}</p>
      </div>
    </div>
  );
}