const Task = require("../models/Task");


// DASHBOARD STATS
exports.getDashboardStats = async (req, res) => {
  try {

    // total tasks assigned to user
    const totalTasks = await Task.countDocuments({
      assignedTo: req.user.id,
    });

    // tasks by status
    const todoTasks = await Task.countDocuments({
      assignedTo: req.user.id,
      status: "todo",
    });

    const inProgressTasks = await Task.countDocuments({
      assignedTo: req.user.id,
      status: "in-progress",
    });

    const doneTasks = await Task.countDocuments({
      assignedTo: req.user.id,
      status: "done",
    });

    // overdue tasks
    const overdueTasks = await Task.countDocuments({
      assignedTo: req.user.id,
      dueDate: { $lt: new Date() },
      status: { $ne: "done" },
    });

    // tasks grouped by user
    const tasksPerUser = await Task.aggregate([
      {
        $group: {
          _id: "$assignedTo",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      totalTasks,

      tasksByStatus: {
        todo: todoTasks,
        inProgress: inProgressTasks,
        done: doneTasks,
      },

      overdueTasks,

      tasksPerUser,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};