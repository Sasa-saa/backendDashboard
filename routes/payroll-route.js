const express = require("express");
const router = express.Router();
const {
  createPayroll,
  getPayrolls,
  getPayroll,
  updatePayroll,
  deletePayroll,
} = require("../controllers/payroll.controller");

// Create a new payroll record
router.post("/", createPayroll);

// Get all payroll records
router.get("/", getPayrolls);

// Get a single payroll record by ID
router.get("/:id", getPayroll);

// Update a payroll record by ID
router.put("/:id", updatePayroll);

// Delete a payroll record by ID
router.delete("/:id", deletePayroll);

module.exports = router;
