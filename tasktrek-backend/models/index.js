const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Initialize models
db.User = require("./User")(sequelize, Sequelize.DataTypes);
db.Task = require("./Task")(sequelize, Sequelize.DataTypes);

// Define associations
db.User.hasMany(db.Task, { foreignKey: "assignedTo", as: "tasks" });
db.Task.belongsTo(db.User, { foreignKey: "assignedTo", as: "assignee" });

module.exports = db;
