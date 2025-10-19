import React from "react";
const StatusCard = ({ icon, value, label }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-xl p-6 w-full transition hover:shadow-lg">
      <div className="text-4xl mb-2 text-[var(--color-primary)]">{icon}</div>
      <h2 className="text-2xl font-bold text-[var(--color-text)]">{value}</h2>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
};

export default StatusCard;
