// 📁 controllers/taskController.js
const { Task, User } = require("../models");

// 🔐 GET /api/tasks - Users see their own tasks, admins see all
exports.getTasks = async (req, res) => {
  try {
    const user = req.user; // You set this in authMiddleware
    const whereCondition = user.role === "admin" ? {} : { assignedTo: user.id };

    const tasks = await Task.findAll({ where: whereCondition });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("❌ Error fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 🆕 POST /api/tasks - Admins assign tasks to members
exports.createTask = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "admin") {
      return res.status(403).json({ error: "Only admins can create tasks" });
    }

    const { title, description, assignedTo } = req.body;

    const newTask = await Task.create({ title, description, assignedTo });
    res.status(201).json(newTask);
  } catch (error) {
    console.error("❌ Error creating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
