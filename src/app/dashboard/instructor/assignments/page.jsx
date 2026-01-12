"use client";

import { useEffect, useState } from "react";
import api from "@/lib/apiClient";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";

// Import the new components
import AssignmentsHeader from "@/components/modules/dashboard/instructorr/assignments/AssignmentsHeader";
import AssignmentsStats from "@/components/modules/dashboard/instructorr/assignments/AssignmentsStats";
import CourseUnitSelector from "@/components/modules/dashboard/instructorr/assignments/CourseUnitSelector";
import TasksTable from "@/components/modules/dashboard/instructorr/assignments/TasksTable";
import TaskModal from "@/components/modules/dashboard/instructorr/assignments/TaskModal";
import TaskReviewModal from "@/components/modules/dashboard/instructorr/assignments/TaskReviewModal";
import SubmissionsReview from "@/components/modules/dashboard/instructorr/assignments/SubmissionsReview";

export default function TaskManagerPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [units, setUnits] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('tasks'); // 'tasks' or 'submissions'
  const [stats, setStats] = useState({ totalTasks: 0, activeTasks: 0, upcomingDeadlines: 0 });

  // === Fetch all courses ===
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/courses?instructor=${user._id}`);
        const coursesData = res.data?.data || [];
        setCourses(coursesData);
        
        // Auto-select first course
        if (coursesData.length > 0 && !selectedCourse) {
          const firstCourse = coursesData[0];
          setSelectedCourse(firstCourse._id);
        }
      } catch {
        toast.error("Failed to load courses");
      }
    })();
  }, [user?._id]);

  // === Fetch units for selected course ===
  useEffect(() => {
    if (!selectedCourse) return;
    (async () => {
      try {
        const res = await api.get(`/units/${selectedCourse}`);
        const unitsData = res.data?.data || [];
        setUnits(unitsData);
        
        // Auto-select first unit
        if (unitsData.length > 0 && !selectedUnit) {
          const firstUnit = unitsData[0];
          setSelectedUnit(firstUnit._id);
        }
      } catch {
        toast.error("Failed to load units");
      }
    })();
  }, [selectedCourse]);

  // === Fetch tasks for selected unit ===
  useEffect(() => {
    if (!selectedUnit) return;
    fetchTasks(selectedUnit);
  }, [selectedUnit]);

  const fetchTasks = async (unitId) => {
    if (!unitId) return;
    setLoading(true);
    try {
      const res = await api.get(`/tasks/${unitId}`);
      const tasksData = res.data?.data || [];
      setTasks(tasksData);
      
      // Calculate stats
      const now = new Date();
      const upcomingDeadlines = tasksData.filter(task => 
        task.dueDate && new Date(task.dueDate) > now
      ).length;
      
      setStats({
        totalTasks: tasksData.length,
        activeTasks: tasksData.filter(t => t.status === 'active').length,
        upcomingDeadlines
      });
    } catch {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  // === Delete task ===
  const deleteTask = async (id) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      toast.success("Task deleted successfully");
      fetchTasks(selectedUnit);
    } catch {
      toast.error("Failed to delete task");
    }
  };

  // === Review submission ===
  const reviewSubmission = async (reviewData) => {
    setLoading(true);
    try {
      await api.patch(`/submissions/${selectedSubmission._id}/review`, reviewData);
      toast.success("Submission reviewed successfully!");
      setShowReviewModal(false);
      setSelectedSubmission(null);
      fetchTasks(selectedUnit); // Refresh to update stats
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || "Failed to review submission";

      // Handle specific validation errors
      if (errorMessage.includes("already been reviewed")) {
        toast.error("This submission has already been reviewed and cannot be reviewed again.");
        setShowReviewModal(false);
        setSelectedSubmission(null);
        // Refresh the list to update the UI
        fetchTasks(selectedUnit);
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      {/* Header */}
      <AssignmentsHeader
        selectedUnit={selectedUnit}
        onCreateTask={() => {
          setSelectedTask(null);
          setShowModal(true);
        }}
      />

      {/* Stats Cards */}
      <AssignmentsStats stats={stats} />

      {/* Course & Unit Selection */}
      <CourseUnitSelector
        courses={courses}
        units={units}
        selectedCourse={selectedCourse}
        selectedUnit={selectedUnit}
        onCourseChange={(e) => {
          setSelectedCourse(e.target.value);
          setSelectedUnit("");
          setUnits([]);
          setTasks([]);
        }}
        onUnitChange={(e) => {
          setSelectedUnit(e.target.value);
        }}
      />

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-[var(--shadow-soft)] border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('tasks')}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'tasks'
                  ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Tasks Management
            </button>
            <button
              onClick={() => setActiveTab('submissions')}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'submissions'
                  ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Review Submissions
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'tasks' ? (
            <TasksTable
              tasks={tasks}
              onEdit={(task) => {
                setSelectedTask(task);
                setShowModal(true);
              }}
              onDelete={deleteTask}
              onReview={(task) => {
                setActiveTab('submissions');
              }}
              onView={(task) => {
                // Handle view task - could open a view modal or navigate to task details
                console.log('View task:', task);
              }}
              loading={loading}
            />
          ) : (
            <SubmissionsReview
              selectedUnit={selectedUnit}
              onRefresh={() => fetchTasks(selectedUnit)}
              onReviewComplete={(submission) => {
                // Invalidate taskSubmission query for the reviewed submission
                if (typeof window !== 'undefined') {
                  import('@tanstack/react-query').then(({ queryClient }) => {
                    queryClient.invalidateQueries({
                      queryKey: ["taskSubmission", submission?.task?._id || submission?.task]
                    });
                  });
                }
              }}
            />
          )}
        </div>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={async (formData) => {
          setLoading(true);
          try {
            const payload = {
              title: formData.title,
              description: formData.description,
              dueDate: formData.dueDate || null,
              maxPoints: parseInt(formData.maxPoints || 0),
              type: formData.type,
              // status: formData.status,
              unitId: selectedUnit,
            };

            if (selectedTask?._id) {
              await api.put(`/tasks/${selectedTask._id}`, payload);
              toast.success("Task updated successfully!");
            } else {
              await api.post("/tasks/create", payload);
              toast.success("Task created successfully!");
            }

            setShowModal(false);
            fetchTasks(selectedUnit);
          } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to save task");
          } finally {
            setLoading(false);
          }
        }}
        task={selectedTask}
        loading={loading}
      />

      {/* Task Review Modal */}
      <TaskReviewModal
        isOpen={showReviewModal}
        onClose={() => {
          setShowReviewModal(false);
          setSelectedSubmission(null);
        }}
        submission={selectedSubmission}
        onReview={reviewSubmission}
        loading={loading}
      />
    </div>
  );
}

