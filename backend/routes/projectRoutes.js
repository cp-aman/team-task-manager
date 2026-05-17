const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createProject,
  getProjects,
  addMember,
  removeMember,
} = require("../controllers/projectController");


// create project
router.post(
  "/",
  authMiddleware,
  createProject
);


// get projects
router.get(
  "/",
  authMiddleware,
  getProjects
);

// add member
router.put(
  "/add-member",
  authMiddleware,
  addMember
);

// remove member
router.put(
  "/remove-member",
  authMiddleware,
  removeMember
);

module.exports = router;  