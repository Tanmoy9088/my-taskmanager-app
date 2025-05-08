"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const statusOrder = ["Pending", "In Progress", "Completed"];

const TaskItem = ({ task, onStatusChange, onDelete, onEdit }) => {
  const [status, setStatus] = useState(task.status);

  const handleStatusChange = async () => {
    const nextStatus =
      statusOrder[(statusOrder.indexOf(status) + 1) % statusOrder.length];

    try {
      await axios.put(
        `https://my-taskmanager-app.onrender.com/api/tasks/${task._id}`,
        { status: nextStatus },
        { withCredentials: true }
      );
      setStatus(nextStatus); // Update status locally
      toast.success(`Status updated to ${nextStatus}`);
      onStatusChange && onStatusChange(task._id, nextStatus);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`https://my-taskmanager-app.onrender.com/api/tasks/${task._id}`, {
          withCredentials: true,
        });
        toast.success("Task deleted successfully");
        onDelete && onDelete(task._id); // Optional callback for parent component to remove task from state
      } catch (error) {
        toast.error("Failed to delete task");
      }
    }
  };

  const handleEdit = () => {
    onEdit && onEdit(task);
  };

  return (
    <motion.div
      className="p-4 bg-gray-800 rounded-lg shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-xl font-semibold">{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {status}</p>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handleStatusChange}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Change Status
        </button>
        <button
          onClick={handleEdit}
          className="p-2 bg-yellow-500 text-white rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="p-2 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default TaskItem;
