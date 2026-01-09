import { HelpCircle, Clock, Target, Award, BarChart3, TrendingUp, ChevronRight, CheckCircle, AlertCircle, Users } from "lucide-react";

export default function QuizSection({ quizzes, onOpen, completed = false, timeLimit, passingScore = 70, averageScore }) {
  const getQuizStatus = (quiz) => {
    if (completed) return "completed";
    if (quiz.attempted) return "attempted";
    return "pending";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "from-emerald-500 to-green-500";
      case "attempted":
        return "from-amber-500 to-yellow-500";
      default:
        return "from-blue-500 to-cyan-500";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "attempted":
        return "Attempted";
      default:
        return "Ready";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "attempted":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const formatTimeLimit = (minutes) => {
    if (!minutes) return "No time limit";
    if (minutes < 60) return `${minutes} minutes`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins > 0 ? `${mins}m` : ''}`.trim();
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Knowledge Check</h4>
            <p className="text-xs text-gray-500">Test your understanding</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-2">
          <span className="px-3 py-1 bg-gradient-to-r from-violet-50 to-purple-50 text-violet-700 text-xs font-semibold rounded-full flex items-center gap-1">
            <Users className="w-3 h-3" />
            {quizzes.length} Quiz{quizzes.length !== 1 ? 'zes' : ''}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {quizzes.map((quiz) => {
          const status = getQuizStatus(quiz);
          const isCompleted = status === "completed";
          const isAttempted = status === "attempted";
          
          return (
            <div
              key={quiz._id}
              onClick={onOpen}
              className={`group relative cursor-pointer rounded-2xl p-5 transition-all duration-300 ${
                isCompleted
                  ? "bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 hover:shadow-lg"
                  : isAttempted
                    ? "bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 hover:shadow-lg"
                    : "bg-gradient-to-r from-white to-gray-50 border border-gray-200 hover:border-violet-300 hover:shadow-xl"
              } hover:-translate-y-0.5`}
            >
              {/* Status indicator border */}
              <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 rounded-r-full bg-gradient-to-b ${getStatusColor(status)}`}></div>

              <div className="flex items-start justify-between">
                {/* Left side: Quiz Info */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  {/* Quiz Icon */}
                  <div className={`relative flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center mt-0.5 ${
                    isCompleted
                      ? "bg-gradient-to-br from-emerald-100 to-green-100"
                      : isAttempted
                        ? "bg-gradient-to-br from-amber-100 to-yellow-100"
                        : "bg-gradient-to-br from-violet-100 to-purple-100"
                  }`}>
                    <HelpCircle className={`w-6 h-6 ${
                      isCompleted ? "text-emerald-600" :
                      isAttempted ? "text-amber-600" :
                      "text-violet-600"
                    }`} />
                    
                    {/* Attempts badge */}
                    {isAttempted && quiz.attempts && (
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {quiz.attempts}
                      </div>
                    )}
                    
                    {/* Score badge */}
                    {isCompleted && quiz.score && (
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {quiz.score}%
                      </div>
                    )}
                  </div>

                  {/* Quiz Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-2">
                      <h4 className={`text-sm font-semibold ${
                        isCompleted ? "text-emerald-800" :
                        isAttempted ? "text-amber-800" :
                        "text-gray-900"
                      }`}>
                        {quiz.title}
                      </h4>
                      
                      {/* Status Badge */}
                      <span className={`px-2 py-0.5 text-xs rounded-full flex-shrink-0 ${
                        isCompleted
                          ? "bg-emerald-100 text-emerald-700"
                          : isAttempted
                            ? "bg-amber-100 text-amber-700"
                            : "bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700"
                      }`}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(status)}
                          {getStatusText(status)}
                        </span>
                      </span>
                    </div>

                    {/* Quiz Metadata */}
                    <div className="flex flex-wrap items-center gap-4">
                      {/* Questions Count */}
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <BarChart3 className="w-3.5 h-3.5" />
                        {quiz.questions?.length || 0} questions
                      </div>

                      {/* Time Limit */}
                      {timeLimit && (
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Clock className="w-3.5 h-3.5" />
                          {formatTimeLimit(timeLimit)}
                        </div>
                      )}

                      {/* Passing Score */}
                      {passingScore && (
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Target className="w-3.5 h-3.5" />
                          Pass: {passingScore}%
                        </div>
                      )}

                      {/* Average Score */}
                      {averageScore && (
                        <div className="flex items-center gap-1 text-xs font-medium text-gray-700">
                          <TrendingUp className="w-3.5 h-3.5" />
                          Avg: {averageScore}%
                        </div>
                      )}
                    </div>

                    {/* Attempt History */}
                    {isAttempted && quiz.bestScore && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-600">Best attempt</span>
                          <span className="font-semibold text-gray-900">{quiz.bestScore}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full"
                            style={{ width: `${quiz.bestScore}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right side: Action */}
                <div className="flex items-center gap-2 ml-4">
                  {/* Score Progress */}
                  {isCompleted && quiz.score && (
                    <div className="hidden md:block text-right">
                      <div className="text-xs text-gray-600 mb-1">Your Score</div>
                      <div className="text-lg font-bold text-emerald-700">{quiz.score}%</div>
                      <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-400 to-green-400 rounded-full"
                          style={{ width: `${quiz.score}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {/* Take Quiz Button */}
                  <button className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-1 ${
                    isCompleted
                      ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:shadow-lg"
                      : isAttempted
                        ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:shadow-lg"
                        : "bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:shadow-lg hover:-translate-y-0.5"
                  }`}>
                    {isCompleted ? "Review" : isAttempted ? "Retake" : "Start Quiz"}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Hover effect */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                isCompleted
                  ? "bg-gradient-to-r from-transparent via-emerald-50/0 to-emerald-50/0"
                  : isAttempted
                    ? "bg-gradient-to-r from-transparent via-amber-50/0 to-amber-50/0"
                    : "bg-gradient-to-r from-transparent via-violet-50/0 to-purple-50/0"
              }`}></div>

              {/* Recommended badge */}
              {quiz.recommended && !isCompleted && (
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 text-xs font-semibold rounded-full">
                    Recommended
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quiz Stats Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
            <div className="text-xl font-bold text-gray-900">{quizzes.length}</div>
            <div className="text-xs text-gray-600">Total Quizzes</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
            <div className="text-xl font-bold text-gray-900">
              {quizzes.filter(q => getQuizStatus(q) === "completed").length}
            </div>
            <div className="text-xs text-gray-600">Completed</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
            <div className="text-xl font-bold text-gray-90">0</div>
            <div className="text-xs text-gray-600">Average Score</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
            <div className="text-xl font-bold text-gray-900">
              {quizzes.filter(q => getQuizStatus(q) === "attempted").length}
            </div>
            <div className="text-xs text-gray-600">In Progress</div>
          </div>
        </div>
      </div>
    </div>
  );
}