// components/SortableTask.js
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

const statusColors = {
  Pending: "bg-yellow-500",
  "In Progress": "bg-blue-500",
  Completed: "bg-green-600",
};

export default function SortableTask({ task, onEdit, onStatusChange, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white/5 p-5 rounded-lg border border-white/10 hover:shadow-lg transition flex flex-col justify-between"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-white">{task.title}</h3>
          <p className="text-sm text-gray-300 mt-1">
            {task.description || "No description"}
          </p>
          <p className="text-xs mt-3 text-gray-400">
            Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
          </p>
          <span
            className={`inline-block mt-2 px-2 py-1 text-xs rounded-full text-white ${statusColors[task.status]}`}
          >
            {task.status}
          </span>
        </div>

        {/* Drag handle only */}
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab p-1 text-gray-400 hover:text-white"
          title="Drag"
        >
          <GripVertical size={18} />
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="text-xs px-2 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onStatusChange(task)}
          className="text-xs px-2 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
        >
          Status
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="text-xs px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
