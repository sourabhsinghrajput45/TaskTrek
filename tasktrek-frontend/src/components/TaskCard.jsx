// 📁 TaskCard.jsx
import React from "react";

const TaskCard = ({ task, users }) => {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    "in-progress": "bg-blue-100 text-blue-800",
    done: "bg-green-100 text-green-800",
  };

  // ✅ Match assigned user by ID
  const assignedUser = users?.find((u) => u.id === Number(task.assignedTo));


  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-200">
      <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
      <p className="text-gray-600 text-sm mt-1">{task.description}</p>

      <div className="flex justify-between items-center mt-4 text-sm">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}
        >
          {task.status}
        </span>
        <span className="text-gray-500">
          Assigned to:{" "}
          {assignedUser ? `${assignedUser.username} (${assignedUser.email})` : "Unassigned"}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
