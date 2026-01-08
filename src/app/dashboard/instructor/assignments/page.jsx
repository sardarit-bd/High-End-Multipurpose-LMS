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

export default function TaskManagerPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [units, setUnits] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
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

      {/* Tasks Table */}
      <TasksTable
        tasks={tasks}
        onEdit={(task) => {
          setSelectedTask(task);
          setShowModal(true);
        }}
        onDelete={deleteTask}
        onView={(task) => {
          // Handle view task - could open a view modal or navigate to task details
          console.log('View task:', task);
        }}
        loading={loading}
      />

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
              perCorrectPoint: parseInt(formData.perCorrectPoint || 0),
              type: formData.type,
              status: formData.status,
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
    </div>
  );
}

