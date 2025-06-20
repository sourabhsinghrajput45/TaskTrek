// 📁 src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", formData);
      console.log("✅ Login Response:", res.data);

      const token = res.data.token || res.data.access_token;

      if (token) {
        localStorage.setItem("token", token);
        console.log("🔐 Token stored:", token);
        navigate("/dashboard");
      } else {
        setError("Login failed: No token received.");
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700">Login</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
