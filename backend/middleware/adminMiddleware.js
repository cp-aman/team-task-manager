const Project = require("../models/Project");

const adminMiddleware = async (req, res, next) => {

  try {

    const projectId = req.body.project || req.params.projectId;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // only creator/admin allowed
    if (project.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Admin access required",
      });
    }

    next();

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = adminMiddleware;