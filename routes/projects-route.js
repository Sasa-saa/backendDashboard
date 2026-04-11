const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} = require("../controllers/projects.controller");

// Create a new project record
router.post("/", createProject);

// Get all project records
router.get("/", getProjects);

// Get a single project record by ID
router.get("/:id", getProject);

// Update a project record by ID
router.put("/:id", updateProject);

// Delete a project record by ID
router.delete("/:id", deleteProject);

module.exports = router;
