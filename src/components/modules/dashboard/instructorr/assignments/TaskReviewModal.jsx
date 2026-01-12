import { useState, useEffect } from "react";
import { X, Save, User, FileText, Award, MessageSquare, Calendar, Clock } from "lucide-react";

export default function TaskReviewModal({
  isOpen,
  onClose,
  submission,
  onReview,
  loading
}) {
  const [formData, setFormData] = useState({
    pointsAwarded: '',
    reviewNote: '',
    shortAnswerScores: [] // For quiz short answers
  });

  useEffect(() => {
    if (submission) {
      // Initialize short answer scores from existing breakdown
      const shortAnswerScores = [];
      if (submission.breakdown) {
        submission.breakdown.forEach((item, index) => {
          if (item.type === 'short') {
            shortAnswerScores.push({
              qIndex: item.qIndex,
              points: item.reviewPoints || 0,
              maxPoints: item.perCorrectPoint || 0
            });
          }
        });
      }

      setFormData({
        pointsAwarded: submission.pointsAwarded || '',
        reviewNote: submission.reviewNote || '',
        shortAnswerScores
      });
    }
  }, [submission]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent submission if already reviewed
    if (submission?.status === 'reviewed') {
      return;
    }

    // Check if this is a quiz submission (has breakdown)
    const isQuiz = submission?.breakdown && submission.breakdown.length > 0;

    if (isQuiz) {
      // For quiz: send short answer scores
      const scores = formData.shortAnswerScores.map(score => ({
        qIndex: score.qIndex,
        reviewPoints: parseInt(score.points || 0)
      }));

      onReview({
        scores,
        reviewNote: formData.reviewNote
      });
    } else {
      // For task: send total points
      onReview({
        pointsAwarded: parseInt(formData.pointsAwarded || 0),
        reviewNote: formData.reviewNote
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleShortAnswerScoreChange = (qIndex, points) => {
    setFormData(prev => ({
      ...prev,
      shortAnswerScores: prev.shortAnswerScores.map(score =>
        score.qIndex === qIndex
          ? { ...score, points: parseInt(points || 0) }
          : score
      )
    }));
  };

  if (!isOpen || !submission) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'reviewed': return 'text-[var(--color-secondary)] bg-[var(--color-primary)]/10';
      default: return 'text-[var(--color-accent)] bg-[var(--color-accent)]/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {submission?.status === 'reviewed' ? 'View Reviewed Submission' : 'Review Submission'}
                </h2>
                <p className="text-[var(--color-background)] text-sm">
                  {submission?.status === 'reviewed'
                    ? 'View the completed review and grading'
                    : 'Review and grade student submission'
                  }
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          {/* Student Info */}
          <div className="bg-[var(--color-background)] rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{submission.user?.name}</h3>
                <p className="text-sm text-gray-600">{submission.user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Submitted: {new Date(submission.createdAt).toLocaleDateString()}
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                {getStatusIcon(submission.status)}
                {submission.status === 'pending_review' ? 'Pending Review' :
                 submission.status === 'reviewed' ? 'Reviewed' :
                 submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
              </div>
              {submission.status === 'reviewed' && submission.reviewedAt && (
                <div className="text-xs text-gray-500 mt-1">
                  Reviewed on {new Date(submission.reviewedAt).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>

          {/* Submission Content */}
          {submission.artifactUrl && (
            <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">Submitted File</h4>
              <a
                href={submission.artifactUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <FileText className="w-4 h-4" />
                View Submission
              </a>
            </div>
          )}

          {submission.note && (
            <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">Student Note</h4>
              <p className="text-gray-700">{submission.note}</p>
            </div>
          )}

          {/* Quiz Answers (if applicable) */}
          {submission.breakdown && submission.breakdown.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-[var(--shadow-soft)]">
              <h4 className="font-semibold text-gray-900 mb-4">Quiz Answers</h4>
              <div className="space-y-3">
                {submission.breakdown.map((item, index) => {
                  console.log('Quiz Item:', item);
                  const shortAnswerScore = formData.shortAnswerScores.find(s => s.qIndex === item.qIndex);
                  return (
                    <div key={index} className="border border-gray-100 rounded-lg p-3">
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">
                          Question {item.qIndex + 1} {item.type === 'short' ? '(Short Answer)' : '(Multiple Choice)'}
                        </span>
                        <div className="flex items-center gap-2">
                          {item.type === 'short' && (
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                min="0"
                                max={item.perCorrectPoint || 0}
                                value={shortAnswerScore?.points || 0}
                                onChange={(e) => handleShortAnswerScoreChange(item.qIndex, e.target.value)}
                                disabled={submission?.status === 'reviewed'}
                                className={`w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] ${
                                  submission?.status === 'reviewed' ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''
                                }`}
                                placeholder="0"
                              />
                              <span className="text-sm text-gray-600">
                                / {item.perCorrectPoint|| 0} pts
                              </span>
                            </div>
                          )}
                          {item.type === 'mcq' && (
                            <div className="flex items-center gap-1">
                              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                                (item.autoPoints || 0) > 0
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}>
                                {(item.autoPoints || 0) > 0 ? '✓ Correct' : '✗ Incorrect'}
                              </span>
                              <span className="text-sm text-gray-600">
                                {item.autoPoints || 0} pts awarded
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Question Text */}
                      {item.question && (
                        <div className="bg-[var(--color-background)] border border-[var(--color-primary)]/20 rounded-lg p-3 mb-3">
                          <p className="text-[var(--color-text)] font-medium">{item.question}</p>
                        </div>
                      )}

                      {/* Student Answer */}
                      {item.type === 'short' && item.text && (
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                          <div className="flex items-start gap-2">
                            <span className="text-sm font-medium text-gray-700 flex-shrink-0">Answer:</span>
                            <p className="text-gray-700">{item.text}</p>
                          </div>
                        </div>
                      )}
                      {item.type === 'mcq' && item.selected && (
                        <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 border border-gray-200">
                          <span className="font-medium">Selected option(s):</span> {item.selected.join(', ')}
                        </div>
                      )}
                    </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Task Max Points Display (for non-quiz tasks) */}
          {!submission?.breakdown?.length && submission?.task?.maxPoints && (
            <div className="bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[var(--color-primary)]" />
                <span className="text-sm font-medium text-[var(--color-text)]">
                  Task Maximum Points: {submission.task.maxPoints}
                </span>
              </div>
            </div>
          )}

          {/* Review Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-[var(--shadow-soft)]">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Review & Grading
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                {/* For non-quiz tasks, show points input */}
                {!submission?.breakdown?.length && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Points Awarded *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="pointsAwarded"
                        value={formData.pointsAwarded}
                        onChange={handleChange}
                        required
                        min="0"
                        max={submission?.task?.maxPoints || undefined}
                        disabled={submission?.status === 'reviewed'}
                        className={`w-full p-3 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-all ${
                          submission?.status === 'reviewed' ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''
                        }`}
                        placeholder={`Max: ${submission?.task?.maxPoints || 0}`}
                      />
                      <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                    {submission?.task?.maxPoints && (
                      <p className="text-xs text-gray-500 mt-1">
                        Maximum points: {submission.task.maxPoints}
                      </p>
                    )}
                  </div>
                )}

                {/* For quiz tasks, show point breakdown */}
                {submission?.breakdown?.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Point Breakdown
                    </label>
                    <div className="space-y-2">
                      {/* MCQ Points (already awarded) */}
                      <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                        <span className="text-sm font-medium text-green-800">MCQ Points (Auto-graded)</span>
                        <span className="text-sm font-bold text-green-700">
                          {submission.breakdown
                            .filter(item => item.type === 'mcq')
                            .reduce((sum, item) => sum + (item.autoPoints || 0), 0)} pts
                        </span>
                      </div>

                      {/* Short Answer Points */}
                      <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <span className="text-sm font-medium text-blue-800">Short Answer Points</span>
                        <span className="text-sm font-bold text-blue-700">
                          {formData.shortAnswerScores
                            .reduce((sum, score) => sum + (parseInt(score.points) || 0), 0)} pts
                        </span>
                      </div>

                      {/* Total */}
                      <div className="flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-lg">
                        <span className="text-sm font-medium text-purple-800">Total Points</span>
                        <span className="text-sm font-bold text-purple-700">
                          {(() => {
                            const mcqPoints = submission.breakdown
                              .filter(item => item.type === 'mcq')
                              .reduce((sum, item) => sum + (item.autoPoints || 0), 0);
                            const shortPoints = formData.shortAnswerScores
                              .reduce((sum, score) => sum + (parseInt(score.points) || 0), 0);
                            return mcqPoints + shortPoints;
                          })()} pts
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Review Feedback
                </label>
                <textarea
                  name="reviewNote"
                  value={formData.reviewNote}
                  onChange={handleChange}
                  rows={4}
                  disabled={submission?.status === 'reviewed'}
                  className={`w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-all resize-none ${
                    submission?.status === 'reviewed' ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''
                  }`}
                  placeholder="Provide constructive feedback to the student..."
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors font-medium"
              >
                Cancel
              </button>
              {submission?.status === 'reviewed' ? (
                <div className="px-6 py-2.5 bg-gray-300 text-gray-500 rounded-xl font-medium flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Already Reviewed
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white rounded-xl hover:from-[var(--color-primary-hover)] hover:to-[var(--color-secondary-hover)] transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Submit Review
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}