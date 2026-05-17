const Task = require("../models/Task");
const Project = require("../models/Project");


// CREATE TASK
exports.createTask = async (req, res) => {
  try {

    const {
      title,
      description,
      dueDate,
      priority,
      project,
      assignedTo,
    } = req.body;

    // check project exists
    const existingProject = await Project.findById(project);

    if (!existingProject) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // assigned user must be project member
    if (
      !existingProject.members.includes(assignedTo)
    ) {
      return res.status(400).json({
        message: "User not in project",
      });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      project,
      assignedTo,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Task created",
      task,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// GET TASKS OF PROJECT
exports.getProjectTasks = async (req, res) => {
  try {

    const tasks = await Task.find({
      project: req.params.projectId,
    })
    .populate("assignedTo", "name email")
    .populate("createdBy", "name email");

    res.status(200).json(tasks);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// UPDATE TASK STATUS
exports.updateTaskStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // only assigned user can update
    if (task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    task.status = status;

    await task.save();

    res.status(200).json({
      message: "Task updated",
      task,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};