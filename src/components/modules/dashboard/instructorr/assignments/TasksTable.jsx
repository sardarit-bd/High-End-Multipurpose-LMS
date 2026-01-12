import { Edit, Trash2, Eye, Clock, CheckCircle, AlertCircle, Calendar, Award, FolderOpen, FileText } from "lucide-react";

export default function TasksTable({
  tasks,
  onEdit,
  onDelete,
  loading
}) {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'draft':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'expired':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTaskTypeIcon = (type) => {
    switch (type) {
      case "quiz": return <Award className="w-4 h-4 text-blue-500" />;
      case "video": return <FolderOpen className="w-4 h-4 text-emerald-500" />;
      case "pdf": return <FileText className="w-4 h-4 text-rose-500" />;
      default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTaskTypeColor = (type) => {
    switch (type) {
      case "quiz": return "bg-blue-100 text-blue-700";
      case "video": return "bg-emerald-100 text-emerald-700";
      case "pdf": return "bg-rose-100 text-rose-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 border border-emerald-100 shadow-[var(--shadow-medium)]">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]"></div>
          <span className="ml-3 text-gray-600">Loading tasks...</span>
        </div>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 border border-emerald-100 shadow-[var(--shadow-medium)]">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Tasks Found</h3>
          <p className="text-gray-600">Create your first task to get started with assignments.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-emerald-100 shadow-[var(--shadow-medium)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-emerald-50 to-blue-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Task Details
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Points
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Submissions
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr key={task._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[var(--color-primary)]" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 line-clamp-1">
                        {task.title}
                      </div>
                      <div className="text-sm text-gray-500 line-clamp-2">
                        {task.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium ${getTaskTypeColor(task.type)}`}>
                    {getTaskTypeIcon(task.type)}
                    {task.type ? task.type.charAt(0).toUpperCase() + task.type.slice(1) : "N/A"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-amber-500" />
                      <span className="font-medium">{task.maxPoints || 0}</span>
                      <span className="text-sm text-gray-500">max</span>
                    </div>
                    {task.perCorrectPoint && task.type === "quiz" && (
                      <div className="text-xs text-gray-500">
                        {task.perCorrectPoint} per question
                      </div>
                    )}
                  </div>
                </td>
              
                <td className="px-6 py-4 text-sm text-gray-900">
                  {formatDate(task.dueDate)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="flex items-center">
                    <span className="font-medium">{task.submissions?.length || 0}</span>
                    <span className="text-gray-500 ml-1">submitted</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(task)}
                      className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      title="Edit Task"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(task._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}