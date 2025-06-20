import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "member", // default role
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await API.post("/auth/register", formData);
      navigate("/");
    } catch (err) {
      setError("Registration failed. Email might already be taken.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-green-700">
          Register
        </h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
          className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition duration-200"
        >
          Register
        </button>
        <p className="text-center text-sm">
          Already have an account?{" "}
          <span
            className="text-green-600 cursor-pointer underline"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
