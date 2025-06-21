// 📁 src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import API from "../api/api";
import Navbar from "../components/Navbar";
import AdminDashboard from "./AdminDashboard";
import MemberDashboard from "./MemberDashboard";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
  });

  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("❌ Failed to fetch tasks:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get("/auth/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("❌ Failed to fetch users:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setFormData({ title: "", description: "", assignedTo: "" });
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      console.error("❌ Failed to create task:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/");

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
      fetchTasks();
      if (decoded.role === "admin") fetchUsers();
    } catch (err) {
      console.error("❌ Invalid token");
      localStorage.removeItem("token");
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar username={user?.role || "User"} onLogout={handleLogout} />
      <main className="max-w-6xl mx-auto px-4 py-6">
        {user?.role === "admin" ? (
          <AdminDashboard
            tasks={tasks}
            users={users}
            showForm={showForm}
            setShowForm={setShowForm}
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            fetchTasks={fetchTasks}
          />
        ) : (
          <MemberDashboard tasks={tasks} userId={user?.id} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
