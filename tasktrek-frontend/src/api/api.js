// 📁 src/api/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust as needed
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    console.log("📦 Token attached:", token);
    req.headers.Authorization = `Bearer ${token}`;
  } else {
    console.log("📦 Token attached: null");
  }
  return req;
});

export default API;
