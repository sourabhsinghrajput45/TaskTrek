require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Sequelize
const db = require("./models");

// Sync DB and start server
db.sequelize.sync().then(() => {
  console.log("✅ Database synced");
  app.listen(5000, () => console.log("✅ Server running on port 5000"));
}).catch((err) => {
  console.error("❌ Database sync failed:", err);
});
