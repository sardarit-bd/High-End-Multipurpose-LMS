import { useState, useEffect } from "react";
import { Eye, CheckCircle, XCircle, Clock, User, FileText, Calendar, Award, MessageSquare } from "lucide-react";
import api from "@/lib/apiClient";
import { toast } from "react-toastify";
import TaskReviewModal from "./TaskReviewModal";

export default function SubmissionsReview({ selectedUnit, onRefresh, onReviewComplete }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [filter, setFilter] = useState('pending_review'); // pending_review, reviewed, all

  useEffect(() => {
    if (selectedUnit) {
      fetchSubmissions();
    }
  }, [selectedUnit, filter]);

  const fetchSubmissions = async () => {
    if (!selectedUnit) return;

    setLoading(true);
    try {
      const response = await api.get(`/submissions/units/${selectedUnit}/submissions`);
      let filteredSubmissions = response.data?.data || [];

      // Apply filter
      if (filter !== 'all') {
        filteredSubmissions = filteredSubmissions.filter(sub =>
          filter === 'pending_review'
            ? sub.status === 'pending_review'
            : sub.status === 'reviewed' || sub.status === 'approved' || sub.status === 'rejected'
        );
      }

      setSubmissions(filteredSubmissions);
    } catch (error) {
      console.error('Failed to fetch submissions:', error);
      toast.error('Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (reviewData) => {
    setLoading(true);
    console.log("Review data:", reviewData);
    try {
      await api.patch(`/submissions/${selectedSubmission._id}/review`, reviewData);
      toast.success('Submission reviewed successfully!');
      setShowReviewModal(false);
      setSelectedSubmission(null);


      fetchSubmissions();
      if (onRefresh) onRefresh();
      if (onReviewComplete) onReviewComplete(selectedSubmission);
    } catch (error) {
      console.error('Failed to review submission:', error);
      toast.error(error.response?.data?.message || 'Failed to review submission');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'reviewed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending_review':
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'reviewed': return <Eye className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  if (!selectedUnit) {
    return (
      <div className="bg-white rounded-xl shadow-[var(--shadow-soft)] border border-gray-200 p-8 text-center">
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-[var(--color-text)] mb-2">Select a Unit</h3>
        <p className="text-gray-600">Choose a unit to view and review student submissions.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-[var(--shadow-soft)] border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-[var(--color-text)]">Submissions Review</h2>
            <p className="text-gray-600">Review and grade student task submissions</p>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Filter:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
            >
              <option value="pending_review">Pending Review</option>
              <option value="reviewed">Reviewed</option>
              <option value="all">All Submissions</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[var(--color-accent)]" />
              <div>
                <p className="text-sm font-medium text-[var(--color-accent)]">Pending</p>
                <p className="text-2xl font-bold text-[var(--color-accent)]">
                  {submissions.filter(s => s.status === 'pending_review').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-[var(--color-primary)]" />
              <div>
                <p className="text-sm font-medium text-[var(--color-primary)]">Reviewed</p>
                <p className="text-2xl font-bold text-[var(--color-primary)]">
                  {submissions.filter(s => s.status === 'reviewed').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">Reviewed</p>
                <p className="text-2xl font-bold text-green-900">
                  {submissions.filter(s => s.status === 'reviewed').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submissions List */}
      <div className="bg-white rounded-xl shadow-[var(--shadow-soft)] border border-gray-200">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading submissions...</p>
          </div>
        ) : submissions.length === 0 ? (
          <div className="p-8 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Submissions</h3>
            <p className="text-gray-600">
              {filter === 'pending_review'
                ? 'No submissions are currently pending review.'
                : 'No submissions found for the selected filter.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {submissions.map((submission) => (
              <div key={submission._id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Student Avatar */}
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>

                    {/* Submission Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3 mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {submission.user?.name || 'Unknown Student'}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {submission.user?.email}
                          </p>
                        </div>

                        <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(submission.status)}`}>
                          {getStatusIcon(submission.status)}
                        {submission.status === 'pending_review' ? 'Pending Review' :
                         submission.status === 'reviewed' ? 'Reviewed' : submission.status}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          <span>{submission.task?.title || 'Unknown Task'}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>Submitted {new Date(submission.createdAt).toLocaleDateString()}</span>
                        </div>

                        {submission.pointsAwarded > 0 && (
                          <div className="flex items-center gap-1">
                            <Award className="w-4 h-4" />
                            <span>{submission.pointsAwarded} points awarded</span>
                          </div>
                        )}
                      </div>

                      {submission.reviewNote && (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                          <div className="flex items-start gap-2">
                            <MessageSquare className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-gray-900 mb-1">Review Feedback</p>
                              <p className="text-sm text-gray-700">{submission.reviewNote}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 ml-4">
                    {submission.status === 'reviewed' ? (
                      <button
                        disabled
                        className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed text-sm font-medium flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Already Reviewed
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedSubmission(submission);
                          setShowReviewModal(true);
                        }}
                        className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors text-sm font-medium flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Review
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Modal */}
      <TaskReviewModal
        isOpen={showReviewModal}
        onClose={() => {
          setShowReviewModal(false);
          setSelectedSubmission(null);
        }}
        submission={selectedSubmission}
        onReview={handleReview}
        loading={loading}
      />
    </div>
  );
}