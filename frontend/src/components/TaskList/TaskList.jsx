"use client";

import TaskItem from "./TaskItem"; // Single task display

const TaskList = ({ title, tasks }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-cyan-100 mb-4">{title}</h2>

      {!tasks.length ? (
        <p className="text-gray-400">No tasks available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
