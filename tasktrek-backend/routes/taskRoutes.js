// 📁 routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");
const { getTasks, createTask, updateTask } = require("../controllers/taskController");

router.get("/", authenticateToken, getTasks);
router.post("/", authenticateToken, createTask);
router.patch("/:id", authenticateToken, updateTask); // ✅ New route

module.exports = router;
