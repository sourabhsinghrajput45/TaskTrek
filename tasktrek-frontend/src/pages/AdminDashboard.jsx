import React from "react";
import TaskCard from "../components/TaskCard";
import API from "../api/api";

const AdminDashboard = ({
  tasks = [],
  users = [],
  showForm,
  setShowForm,
  formData,
  handleChange,
  handleSubmit,
  fetchTasks,
}) => {
  const handleMarkDone = async (taskId) => {
    try {
      await API.patch(
        `/tasks/${taskId}`,
        { status: "done" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchTasks();
    } catch (error) {
      console.error("❌ Error marking task as done:", error);
    }
  };

  const groupedTasks = {
    pending: tasks.filter((t) => t.status === "pending"),
    "ready-for-review": tasks.filter((t) => t.status === "ready-for-review"),
    done: tasks.filter((t) => t.status === "done"),
  };

  const statusTitles = {
    pending: "🕒 Pending",
    "ready-for-review": "🔍 Review",
    done: "✅ Done",
  };

  return (
    <>
      {/* 🔧 Header + Form Toggle */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-700">
          Admin Panel – Manage Tasks
        </h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "+ Add Task"}
        </button>
      </div>

      {/* 📝 Task Creation Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded-md shadow space-y-3 mb-6"
        >
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
          <textarea
            name="description"
            placeholder="Task Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            />
          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            required
          >
            <option value="">Assign to</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username} ({user.email})
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Create Task
          </button>
        </form>
      )}

      {/* 🧾 Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.keys(groupedTasks).map((status) => (
          <div
            key={status}
            className="bg-gray-100 p-4 rounded-xl shadow-sm min-h-[300px]"
          >
            <h2 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-1">
              {statusTitles[status]}
            </h2>
            <div className="space-y-4">
              {groupedTasks[status].length === 0 ? (
                <p className="text-gray-400 text-sm">No tasks</p>
              ) : (
                groupedTasks[status].map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    users={users}
                    userRole="admin"
                    fetchTasks={fetchTasks}
                  />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminDashboard;
