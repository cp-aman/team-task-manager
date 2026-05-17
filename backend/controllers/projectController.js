const Project = require("../models/Project");
const User = require("../models/User");

// CREATE PROJECT
exports.createProject = async (req, res) => {
  try {

    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const project = await Project.create({
      title,
      description,
      createdBy: req.user.id,

      // creator automatically added
      members: [req.user.id],
    });

    res.status(201).json({
      message: "Project created",
      project,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// GET PROJECTS
exports.getProjects = async (req, res) => {
  try {

    const projects = await Project.find({
      members: req.user.id,
    })
    .populate("createdBy", "name email")
    .populate("members", "name email role");

    res.status(200).json(projects);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// ADD MEMBER
exports.addMember = async (req, res) => {
  try {

    const { projectId, userId } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // only admin/creator allowed
    if (project.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Only admin can add members",
      });
    }

    // check user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // avoid duplicates
    if (project.members.includes(userId)) {
      return res.status(400).json({
        message: "User already member",
      });
    }

    project.members.push(userId);

    await project.save();

    res.status(200).json({
      message: "Member added",
      project,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// REMOVE MEMBER

exports.removeMember = async (req, res) => {
  try {

    const { projectId, userId } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // admin only
    if (project.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Only admin can remove members",
      });
    }

    project.members = project.members.filter(
      (member) => member.toString() !== userId
    );

    await project.save();

    res.status(200).json({
      message: "Member removed",
      project,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
