const express = require("express");
const router = express.Router();
const { register, login, getUsers } = require("../controllers/authController"); // ✅ includes getUsers
const { authenticateToken } = require("../middleware/authMiddleware"); // ✅ import correctly

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected route
router.get("/users", authenticateToken, getUsers);

module.exports = router;
