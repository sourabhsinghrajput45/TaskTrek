module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    assignedTo: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Task;
};
