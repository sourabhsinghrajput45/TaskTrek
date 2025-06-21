const { Task, User } = require("../models");

// 🔐 GET /api/tasks
exports.getTasks = async (req, res) => {
  try {
    const user = req.user;
    const whereCondition = user.role === "admin" ? {} : { assignedTo: user.id };
    const tasks = await Task.findAll({ where: whereCondition });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("❌ Error fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 🆕 POST /api/tasks
exports.createTask = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "admin") {
      return res.status(403).json({ error: "Only admins can create tasks" });
    }

    const { title, description, assignedTo, dueDate } = req.body;
    const newTask = await Task.create({
      title,
      description,
      assignedTo,
      dueDate: dueDate ? new Date(dueDate) : null,
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error("❌ Error creating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ PATCH /api/tasks/:id – Member marks as ready-for-review, Admin finalizes as done
exports.updateTask = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const { status, completionNote } = req.body;

    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    let timelineEntry = null;

    // 🧑‍💻 Members can update only their assigned tasks
    if (user.role === "member") {
      if (task.assignedTo !== user.id) {
        return res.status(403).json({ error: "Access denied" });
      }

      if (status !== "ready-for-review") {
        return res.status(400).json({ error: "Only 'ready-for-review' allowed for members" });
      }

      task.status = "ready-for-review";
      task.completionNote = completionNote || null;
      task.completedAt = new Date();
      timelineEntry = { status: "ready-for-review", timestamp: new Date().toISOString() };
    }

    // 👨‍💼 Admins can finalize or change task status
    if (user.role === "admin") {
      if (status) {
        task.status = status;
        timelineEntry = { status, timestamp: new Date().toISOString() };
      }
    }

    // 🕓 Update timeline field if timelineEntry was created
    if (timelineEntry) {
      const currentTimeline = Array.isArray(task.timeline) ? task.timeline : [];
      task.timeline = [...currentTimeline, timelineEntry];
    }
    if (dueDate !== undefined) {
      task.dueDate = dueDate ? new Date(dueDate) : null;
    }

    await task.save();
    res.json(task);
  } catch (error) {
    console.error("❌ Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
