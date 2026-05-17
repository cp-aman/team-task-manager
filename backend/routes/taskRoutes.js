const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const adminMiddleware = require("../middleware/adminMiddleware");

const {
  createTask,
  getProjectTasks,
  updateTaskStatus,
} = require("../controllers/taskController");


// create task (admin only)
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createTask
);


// get tasks of project
router.get(
  "/project/:projectId",
  authMiddleware,
  getProjectTasks
);


// update task status
router.put(
  "/:taskId",
  authMiddleware,
  updateTaskStatus
);

module.exports = router;