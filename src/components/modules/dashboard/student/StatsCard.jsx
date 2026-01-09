import React from "react";

const StatusCard = ({ icon, value, label, color = "from-blue-500 to-cyan-500", trend }) => {
  return (
    <div className="group relative bg-white rounded-2xl p-6 w-full transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 border border-gray-100 hover:border-gray-300">
      {/* Icon with subtle gradient background */}
      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${color} bg-opacity-10 mb-4`}>
        <div className={`text-2xl bg-gradient-to-br ${color} bg-clip-text text-transparent`}>
          {icon}
        </div>
      </div>

      {/* Value and label */}
      <div className="mb-2">
        <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
        <p className="text-sm font-medium text-gray-600 mt-1">{label}</p>
      </div>

      {/* Trend indicator */}
      {trend && (
        <div className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${trend.includes('↑') ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}`}>
          <span>{trend}</span>
        </div>
      )}

      {/* Hover accent */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${color} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
    </div>
  );
};

export default StatusCard;