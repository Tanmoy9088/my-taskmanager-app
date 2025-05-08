"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext"; // Adjust path as needed

export default function AssignTask() {
  const { user, loading } = useAuth();

  // ✅ Hooks must not be inside conditionals!
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      priority: "Medium",
      status: "Pending",
      assignedTo: "", // Add assignedTo to default values
    },
  });

  const onSubmit = async (data) => {
    if (!user) {
      toast.error("You must be logged in to assign a task.");
      return;
    }

    try {
      const payload = {
        ...data,
        createdBy: user.username, // Or user.id depending on backend
      };

      const res = await axios.post("https://my-taskmanager-app.onrender.com/api/tasks", payload, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Task created successfully!");
        reset();
      } else {
        toast.error(res.data.message || "An error occurred");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Server error");
    }
  };

  // ✅ Safe loading check — but after hooks
  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please log in to assign a task.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
        📋 Create New Task
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-blue-300 p-6 rounded-lg shadow-md space-y-4"
      >
        {/* Title Input */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            className="px-4 py-2 border rounded-md"
            placeholder="Enter task title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description")}
            className="px-4 py-2 border rounded-md"
            placeholder="Enter task description"
          />
        </div>

        {/* Due Date */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Due Date
          </label>
          <input
            type="date"
             min={new Date().toISOString().split("T")[0]}
            {...register("dueDate", { required: "Due date is required" })}
            className="px-4 py-2 border rounded-md"
          />
          {errors.dueDate && (
            <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
          )}
        </div>

        {/* Priority, Status */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              {...register("priority")}
              className="px-4 py-2 border rounded-md"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              {...register("status")}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Assigned To */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Assign To (User ID or Email)
          </label>
          <input
            {...register("assignedTo", { required: "Assignee is required" })}
            className="px-4 py-2 border rounded-md"
            placeholder="Enter assignee"
          />
          {errors.assignedTo && (
            <p className="text-red-500 text-sm">{errors.assignedTo.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md transition ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          {isSubmitting ? "Submitting..." : "➕ Create Task"}
        </button>
      </form>
    </div>
  );
}
