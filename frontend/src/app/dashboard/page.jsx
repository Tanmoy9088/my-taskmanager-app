"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import TaskList from "../../components/TaskList/TaskList";
import { useAuth } from "../../context/AuthContext"; // Adjust path as needed

const Dashboard = () => {
  const { user} = useAuth();
  const [tasks, setTasks] = useState([]);
  const [createdTasks, setCreatedTasks] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        withCredentials: true,
      });
      const allTasks = res.data;
      setTasks(allTasks);
      categorizeTasks(allTasks);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to fetch tasks");
      setLoading(false);
    }
  };

  const categorizeTasks = (tasks) => {
    const created = [];
    const assigned = [];
    const overdue = [];
    const now = new Date();

    tasks.forEach((task) => {
      const dueDate = new Date(task.dueDate);
      if (task.createdBy === user.username) { // Replace with actual user ID logic
        created.push(task);
      } else if (task.assignedTo === user.username) { // Replace with actual user ID logic
        assigned.push(task);
      }

      if (dueDate < now && task.status !== "Completed") {
        overdue.push(task);
      }
    });

    setCreatedTasks(created);
    setAssignedTasks(assigned);
    setOverdueTasks(overdue);
  };

  const handleStatusChange = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task._id !== taskId);
    setTasks(updatedTasks);
  };

  const handleEdit = (task) => {
    console.log("Edit task", task);
    // Open task editor or handle the edit logic here
  };

  if (loading) return <div>Loading...</div>;

  return (
    <motion.div className="p-6">
      <h1 className="text-4xl font-semibold mb-8">Tasks Dashboard</h1>

      <TaskList
        title="📝 Tasks You Created"
        tasks={createdTasks}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <TaskList
        title="📌 Tasks Assigned to You"
        tasks={assignedTasks}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <TaskList
        title="⏰ Overdue Tasks"
        tasks={overdueTasks}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </motion.div>
  );
};

export default Dashboard;
