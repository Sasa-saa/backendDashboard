const Projects = require("../models/projects.model");

// Create a new project record
const createProject = async (req, res) => {
  try {
    const { name} = req.body;

    const newprojects = await Projects.create({
      name,
    });

    if (!newprojects) {
      return res.status(400).json({
        success: false,
        message: "Cannot create a new project record",
      });
    }

    res.status(201).json({
      success: true,
      message: "New project record created successfully",
      data: newprojects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the project record",
    });
  }
};

// Get all project records
const getProjects = async (req, res) => {
  try {
    const projects = await Projects.find({});

    if (projects.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No project records found",
        data: projects,
      });
    }

    res.status(200).json({
      success: true,
      message: "Project records retrieved successfully",
      data: projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving project records",
    });
  }
};

// Get a single project record
const getProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Projects.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project record retrieved successfully",
      data: project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the project record",
    });
  }
};

// Update a project record
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedProject = await Projects.findByIdAndUpdate(
      id,
      { name },
      { returnDocument: "after" }
    );

    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        message: "Project record not found or could not be updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project record updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the project record",
    });
  }
};

// Delete a project record
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProject = await Projects.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({
        success: false,
        message: "Project record not found or could not be deleted",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project record deleted successfully",
      data: deletedProject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the project record",
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
};