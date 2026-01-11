"use client";
import { PlayCircle, CheckCircle, Clock, Lock, ExternalLink, Download, MoreVertical } from "lucide-react";

export default function LessonItem({ lesson, currentLesson, setCurrentLesson, completed = false }) {
  const isActive = currentLesson?._id === lesson._id;
  const isCompleted = completed;
  const isLocked = false; // You can add logic for locked lessons

  // Calculate dynamic duration from lesson data
  const formatDuration = (durationSec) => {
    if (!durationSec) return "No timer";
    const minutes = Math.floor(durationSec / 60);
    const seconds = durationSec % 60;
    return minutes > 0 ? `${minutes}:${seconds.toString().padStart(2, '0')}` : `${seconds}s`;
  };

  const duration = formatDuration(lesson.durationSec);

  return (
    <li className="px-2 py-1.5">
      <button
        onClick={() => !isLocked && setCurrentLesson(lesson)}
        disabled={isLocked}
        className={`group relative w-full rounded-xl p-4 text-left transition-all duration-300 ${
          isActive 
            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/20" 
            : isLocked
              ? "bg-gradient-to-br from-gray-100 to-gray-50 text-gray-400 cursor-not-allowed border border-gray-200"
              : "bg-gradient-to-br from-white to-gray-50 hover:shadow-xl hover:-translate-y-0.5 border border-gray-200 hover:border-blue-200"
        }`}
      >
        {/* Left border accent */}
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-gradient-to-b from-white to-blue-100 rounded-r-full"></div>
        )}
        
        {isCompleted && !isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-gradient-to-b from-emerald-400 to-green-400 rounded-r-full"></div>
        )}

        <div className="flex items-center justify-between">
          {/* Left side: Icon and Title */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Icon Container */}
            <div className={`relative flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
              isActive 
                ? "bg-white/20" 
                : isLocked
                  ? "bg-gray-200"
                  : isCompleted
                    ? "bg-gradient-to-br from-emerald-100 to-green-100"
                    : "bg-gradient-to-br from-blue-100 to-cyan-100"
            }`}>
              {isLocked ? (
                <Lock className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
              ) : isCompleted ? (
                <CheckCircle className={`w-5 h-5 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
              ) : (
                <PlayCircle className={`w-5 h-5 ${isActive ? 'text-white' : 'text-blue-600'}`} />
              )}
              
              {/* Badge for completed */}
              {isCompleted && !isActive && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              )}
            </div>

            {/* Lesson Info */}
            <div className="flex-1 min-w-0">
              <h4 className={`text-sm font-medium truncate ${
                isActive 
                  ? "text-white" 
                  : isLocked
                    ? "text-gray-400"
                    : "text-gray-900"
              }`}>
                {lesson?.title}
              </h4>
              
              <div className="flex items-center gap-3 mt-1">
                {/* Duration */}
                <span className={`inline-flex items-center gap-1 text-xs ${
                  isActive ? "text-blue-100" : "text-gray-500"
                }`}>
                  <Clock className="w-3 h-3" />
                  {duration}
                </span>
                
                {/* Content Type Badge */}
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  isActive
                    ? "bg-white/20 text-white"
                    : isLocked
                      ? "bg-gray-200 text-gray-500"
                      : "bg-gray-100 text-gray-700"
                }`}>
                  {lesson?.contentType || "Video"}
                </span>
              </div>
            </div>
          </div>

          {/* Right side: Actions and Status */}
          <div className="flex items-center gap-2 ml-3">
            {/* Progress indicator */}
            {!isLocked && !isCompleted && !isActive && (
              <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" style={{ width: '30%' }}></div>
              </div>
            )}

            {/* Lesson status indicator */}
            {isActive && !isCompleted && !isLocked && (
              <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                Now Playing
              </div>
            )}

            {/* Action buttons */}
            {!isLocked && (
              <div className="flex items-center gap-1">
                {lesson?.contentUrl?.includes('youtube') && (
                  <button
                    className={`p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity ${
                      isActive ? 'hover:bg-white/20' : 'hover:bg-gray-100'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(lesson.contentUrl, '_blank');
                    }}
                  >
                    <ExternalLink className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  </button>
                )}

                {lesson?.materials && lesson.materials.length > 0 && (
                  <button
                    className={`p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity ${
                      isActive ? 'hover:bg-white/20' : 'hover:bg-gray-100'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle download
                    }}
                  >
                    <Download className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  </button>
                )}

                <button
                  className={`p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity ${
                    isActive ? 'hover:bg-white/20' : 'hover:bg-gray-100'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Hover effect */}
        {!isActive && !isLocked && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-blue-50/0 to-blue-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        )}

        {/* Active lesson indicator */}
        {isActive && (
          <div className="absolute top-2 right-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        )}
      </button>
    </li>
  );
}