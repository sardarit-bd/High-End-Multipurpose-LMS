import { Award, TrendingUp, Clock } from "lucide-react";

export default function AssignmentsStats({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-blue-100 shadow-[var(--shadow-soft)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[var(--color-text)]/70">Total Tasks</p>
            <p className="text-2xl font-bold text-[var(--color-text)]">{stats.totalTasks}</p>
          </div>
          <div className="p-2 bg-blue-100 rounded-lg">
            <Award className="w-5 h-5 text-blue-600" />
          </div>
        </div>
      </div>
      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-emerald-100 shadow-[var(--shadow-soft)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[var(--color-text)]/70">Active Tasks</p>
            <p className="text-2xl font-bold text-[var(--color-text)]">{stats.activeTasks}</p>
          </div>
          <div className="p-2 bg-emerald-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-[var(--color-primary)]" />
          </div>
        </div>
      </div>
      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-amber-100 shadow-[var(--shadow-soft)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[var(--color-text)]/70">Upcoming Deadlines</p>
            <p className="text-2xl font-bold text-[var(--color-text)]">{stats.upcomingDeadlines}</p>
          </div>
          <div className="p-2 bg-amber-100 rounded-lg">
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
        </div>
      </div>
    </div>
  );
}