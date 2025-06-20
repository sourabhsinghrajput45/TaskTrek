const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware"); // ✅ Use destructuring
const { getTasks, createTask } = require("../controllers/taskController");

router.get("/", authenticateToken, getTasks);
router.post("/", authenticateToken, createTask);

module.exports = router;
