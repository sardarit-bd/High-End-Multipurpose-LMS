import { FileText, CheckCircle, Clock, AlertCircle, Edit2, ExternalLink, MoreVertical, TrendingUp, Target, Eye, Award } from "lucide-react";

export default function TaskItem({ task, onOpen, completed = false, dueDate, priority = "medium", submission = null }) {
  const getTaskIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'assignment':
        return <Edit2 className="w-4 h-4" />;
      case 'project':
        return <TrendingUp className="w-4 h-4" />;
      case 'reading':
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return "bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border-red-200";
      case 'medium':
        return "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 border-amber-200";
      case 'low':
        return "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-200";
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-gray-300";
    }
  };

  const formatDueDate = (date) => {
    if (!date) return "No due date";

    const now = new Date();
    const due = new Date(date);
    const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays > 1 && diffDays <= 7) return `In ${diffDays} days`;
    if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;

    return due.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getSubmissionStatus = () => {
    if (!submission) return { status: 'not_submitted', label: 'Not Submitted', color: 'text-gray-500', bgColor: 'bg-gray-100' };

    switch (submission.status) {
      case 'reviewed':
        return {
          status: 'reviewed',
          label: `Reviewed (${submission.pointsAwarded || 0} pts)`,
          color: 'text-green-700',
          bgColor: 'bg-green-100',
          icon: <CheckCircle className="w-3 h-3" />
        };
      case 'pending_review':
      default:
        return {
          status: 'pending_review',
          label: 'Under Review',
          color: 'text-yellow-700',
          bgColor: 'bg-yellow-100',
          icon: <Clock className="w-3 h-3" />
        };
    }
  };

  const submissionStatus = getSubmissionStatus();

  return (
    <li className="px-2 py-1.5">
      <button
        onClick={onOpen}
        className={`group relative w-full rounded-xl p-4 text-left transition-all duration-300 ${
          completed
            ? "bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 hover:shadow-lg"
            : "bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-white border border-gray-200 hover:border-blue-300 hover:shadow-xl"
        } hover:-translate-y-0.5`}
      >
        {/* Completed indicator border */}
        {completed && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-gradient-to-b from-emerald-400 to-green-400 rounded-r-full"></div>
        )}

        {/* Priority indicator */}
        {!completed && priority && (
          <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 rounded-r-full ${
            priority === 'high' ? 'bg-gradient-to-b from-red-500 to-pink-500' :
            priority === 'medium' ? 'bg-gradient-to-b from-amber-500 to-yellow-500' :
            'bg-gradient-to-b from-emerald-500 to-green-500'
          }`}></div>
        )}

        <div className="flex items-start justify-between">
          {/* Left side: Icon and Task Info */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {/* Icon Container */}
            <div className={`relative flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5 ${
              completed
                ? "bg-gradient-to-br from-emerald-100 to-green-100"
                : "bg-gradient-to-br from-blue-100 to-cyan-100"
            }`}>
              {completed ? (
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              ) : (
                getTaskIcon(task?.type)
              )}
              
              {/* Completed badge */}
              {completed && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </div>

            {/* Task Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2">
                <h4 className={`text-sm font-medium truncate ${
                  completed ? "text-emerald-800" : "text-gray-900"
                }`}>
                  {task?.title}
                </h4>
                
                {/* Task Type Badge */}
                <span className={`px-2 py-0.5 text-xs rounded-full flex-shrink-0 ${
                  completed
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700"
                }`}>
                  {task?.type || "Task"}
                </span>
              </div>
              
              {/* Task Metadata */}
              <div className="flex items-center flex-wrap gap-3 mt-2">
                {/* Due Date */}
                {dueDate && (
                  <span className={`inline-flex items-center gap-1 text-xs ${
                    completed ? "text-emerald-600" : "text-gray-600"
                  }`}>
                    <Clock className="w-3 h-3" />
                    {formatDueDate(dueDate)}
                  </span>
                )}
                
                {/* Priority */}
                {priority && !completed && (
                  <span className={`px-2 py-0.5 text-xs rounded-full border ${getPriorityColor(priority)}`}>
                    {priority}
                  </span>
                )}
                
                {/* Points/Score */}
                {task?.maxPoints && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-700">
                    <Target className="w-3 h-3" />
                    {task.maxPoints} points
                  </span>
                )}

                {/* Submission Status */}
                {submission && (
                  <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${submissionStatus.color} ${submissionStatus.bgColor}`}>
                    {submissionStatus.icon}
                    {submissionStatus.label}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right side: Status and Actions */}
          <div className="flex items-center gap-2 ml-3">
            {/* Status Indicator */}
            {!completed && dueDate && (
              <div className="hidden sm:block">
                <div className="text-xs text-gray-500 text-right mb-1">
                  {new Date(dueDate) < new Date() ? "Overdue" : "Pending"}
                </div>
                <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex items-center gap-1">
              <button 
                className={`p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity ${
                  completed ? 'hover:bg-emerald-100' : 'hover:bg-gray-100'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle external link or attachment
                }}
              >
                <ExternalLink className={`w-4 h-4 ${completed ? 'text-emerald-600' : 'text-gray-500'}`} />
              </button>
              
              <button 
                className={`p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity ${
                  completed ? 'hover:bg-emerald-100' : 'hover:bg-gray-100'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className={`w-4 h-4 ${completed ? 'text-emerald-600' : 'text-gray-500'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Hover effect */}
        {!completed && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-blue-50/0 to-blue-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        )}

        {/* Urgent indicator */}
        {priority === 'high' && !completed && (
          <div className="absolute top-2 right-2">
            <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></div>
          </div>
        )}
      </button>
    </li>
  );
}