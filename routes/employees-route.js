const express = require("express");
const router = express.Router();
const {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employees.controller");

// Create a new employee
router.post("/", createEmployee);

// Get all employees
router.get("/", getEmployees);

// Get a single employee by ID
router.get("/:id", getEmployee);

// Update an employee by ID
router.put("/:id", updateEmployee);

// Delete an employee by ID
router.delete("/:id", deleteEmployee);

module.exports = router;