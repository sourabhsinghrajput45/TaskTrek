import React, { useState } from "react";
import API from "../api/api";

const TaskCard = ({ task, userRole, users, fetchTasks }) => {
  const [memberModal, setMemberModal] = useState(false);
  const [adminModal, setAdminModal] = useState(false);
  const [note, setNote] = useState("");
  const [finalStatus, setFinalStatus] = useState("done");

  const assignedUser = users?.find((u) => u.id === task.assignedTo);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    "in-progress": "bg-blue-100 text-blue-800",
    "ready-for-review": "bg-purple-100 text-purple-800",
    done: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  const handleMemberSubmit = async () => {
    try {
      await API.patch(`/tasks/${task.id}`, {
        status: "ready-for-review",
        completionNote: note,
      });
      setMemberModal(false);
      fetchTasks();
    } catch (err) {
      console.error("❌ Failed to submit completion:", err);
    }
  };

  const handleAdminSubmit = async () => {
    try {
      await API.patch(`/tasks/${task.id}`, { status: finalStatus });
      setAdminModal(false);
      alert(`✅ Task marked as "${finalStatus}" successfully.`);
      fetchTasks();
    } catch (err) {
      console.error("❌ Failed to finalize task:", err);
      alert("❌ Something went wrong while updating the task.");
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-200 space-y-2">
      <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
      <p className="text-gray-600 text-sm">{task.description}</p>

      <div className="flex justify-between items-center mt-3 text-sm">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
          {task.status}
        </span>
        <span className="text-gray-500 text-xs">
          Assigned to: {assignedUser?.username || "Unassigned"}
        </span>
      </div>

      {task.completionNote && (
        <p className="text-sm italic text-blue-700 mt-1">📝 {task.completionNote}</p>
      )}

      {/* 👨‍💻 Member Action */}
      {userRole === "member" && task.status === "in-progress" && (
        <button
          onClick={() => setMemberModal(true)}
          className="mt-3 bg-purple-600 text-white px-4 py-1 rounded-md hover:bg-purple-700 transition text-sm"
        >
          Mark as Ready
        </button>
      )}

      {/* 👩‍⚖️ Admin Action */}
      {userRole === "admin" && task.status === "ready-for-review" && (
        <button
          onClick={() => setAdminModal(true)}
          className="mt-3 bg-indigo-600 text-white px-4 py-1 rounded-md hover:bg-indigo-700 transition text-sm"
        >
          📝 Review
        </button>
      )}

      {/* 🧾 Timeline for Admin */}
      {userRole === "admin" && Array.isArray(task.timeline) && task.timeline.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold text-gray-700 mb-2">📅 Task Timeline</h4>
          <div className="border-l-2 border-blue-400 pl-4 space-y-3">
            {task.timeline.map((entry, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-[10px] top-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                <p className="text-sm">
                  <span className="font-medium capitalize text-blue-700">{entry.status}</span>{" "}
                  <span className="text-gray-500">
                    — {new Date(entry.timestamp).toLocaleString()}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ✅ Member Modal */}
      {memberModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Submit Completion Note</h2>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Describe what you completed..."
              className="w-full border rounded-md px-3 py-2"
              rows="4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setMemberModal(false)}
                className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleMemberSubmit}
                className="px-4 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Admin Modal */}
      {adminModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Review Task</h2>
            <p><strong>Title:</strong> {task.title}</p>
            <p><strong>Description:</strong> {task.description}</p>
            <p className="italic text-blue-700">📝 {task.completionNote || "No note provided."}</p>

            <select
              value={finalStatus}
              onChange={(e) => setFinalStatus(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
            >
              <option value="done">✅ Mark as Done</option>
              <option value="pending">🔄 Send Back (Pending)</option>
              <option value="rejected">❌ Reject</option>
            </select>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setAdminModal(false)}
                className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAdminSubmit}
                className="px-4 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
