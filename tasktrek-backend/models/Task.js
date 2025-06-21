module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING,
    assignedTo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "in-progress", "ready-for-review", "done", "rejected"),
      defaultValue: "pending",
    },
    completionNote: {
      type: DataTypes.STRING,
    },
    completedAt: {
      type: DataTypes.DATE,
    },
    timeline: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  return Task;
};
