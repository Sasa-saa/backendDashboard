const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

// Create a new task record
router.post("/", createTask);

// Get all task records
router.get("/", getTasks);

// Get a single task record by ID
router.get("/:id", getTask);

// Update a task record by ID
router.put("/:id", updateTask);

// Delete a task record by ID
router.delete("/:id", deleteTask);

module.exports = router;
