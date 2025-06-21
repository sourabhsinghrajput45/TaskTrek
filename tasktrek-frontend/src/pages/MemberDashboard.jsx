import React, { useState } from "react";
import API from "../api/api";
import TaskCard from "../components/TaskCard";

const MemberDashboard = ({ tasks }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [completionNote, setCompletionNote] = useState("");
  const [showNoteForm, setShowNoteForm] = useState(false);

  const handleMarkAsReady = async (taskId) => {
    try {
      await API.patch(
        `/tasks/${taskId}`,
        {
          status: "ready-for-review",
          completionNote,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setCompletionNote("");
      setShowNoteForm(false);
      setSelectedTask(null);
      window.location.reload(); // ✅ simple reload instead of fetch
    } catch (err) {
      console.error("❌ Failed to update task:", err);
    }
  };

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
        Your Assigned Tasks
      </h1>

      {tasks.length === 0 ? (
        <p className="text-gray-500">You have no assigned tasks.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white shadow-md rounded-xl p-4 space-y-3 border border-gray-100 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-bold text-gray-800">{task.title}</h2>
              <p className="text-gray-600 text-sm">{task.description}</p>

              <p className="text-sm">
                <span className="font-medium text-gray-500">Status: </span>
                <span
                  className={`capitalize font-semibold ${
                    task.status === "done"
                      ? "text-green-600"
                      : task.status === "ready-for-review"
                      ? "text-indigo-600"
                      : "text-yellow-600"
                  }`}
                >
                  {task.status || "pending"}
                </span>
              </p>

              {task.status !== "done" && task.status !== "ready-for-review" && (
                <button
                  onClick={() => {
                    setSelectedTask(task.id);
                    setShowNoteForm(true);
                  }}
                  className="mt-2 bg-indigo-600 text-white px-4 py-1.5 rounded-md hover:bg-indigo-700 transition"
                >
                  ✅ Mark as Ready
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 📝 Completion Note Modal */}
      {showNoteForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-11/12 max-w-md space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Submit Completion Note
            </h3>
            <textarea
              value={completionNote}
              onChange={(e) => setCompletionNote(e.target.value)}
              placeholder="Describe what you completed..."
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
              required
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowNoteForm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleMarkAsReady(selectedTask)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MemberDashboard;
