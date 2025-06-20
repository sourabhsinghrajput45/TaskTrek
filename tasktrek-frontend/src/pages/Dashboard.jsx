// 📁 src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import API from "../api/api";
import TaskCard from "../components/TaskCard";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
  });
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks/");
      console.log("📦 Task response:", res.data);
      Array.isArray(res.data) ? setTasks(res.data) : setTasks([]);
    } catch (err) {
      console.error("❌ Error fetching tasks:", err);
      setTasks([]);
    }
  };

const fetchUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("⚠️ No token found for user fetch");
      return;
    }

    const res = await API.get("/auth/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUsers(res.data);
    console.log("✅ Users fetched:", res.data);
  } catch (err) {
    console.error("❌ Error fetching users:", err.response?.data || err.message);
  }
};

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("⚠️ No token found");
      return navigate("/");
    }

    try {
      const decoded = jwtDecode(token);
      console.log("👤 Decoded JWT:", decoded);
      setUser(decoded);
      fetchTasks();
      if (decoded.role === "admin") {
        fetchUsers();
      }
    } catch (err) {
      console.error("❌ Invalid JWT:", err);
      localStorage.removeItem("token");
      navigate("/");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks", formData);
      setFormData({ title: "", description: "", assignedTo: "" });
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      console.error("❌ Failed to create task:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar username={user?.role || "User"} onLogout={handleLogout} />

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-700">
            Team Tasks
          </h1>

          {user?.role === "admin" && (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Cancel" : "+ Add Task"}
            </button>
          )}
        </div>

        {/* ✅ Task Creation Form */}
        {showForm && user?.role === "admin" && (
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
            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              required
            >
              <option value="">Assign to</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.username} ({u.email})
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

        {/* 🧾 Task List */}
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks assigned yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} users={users} />
          ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
