const express = require("express");
const router = express.Router();
const {
  createClasses,
  getClassess,
  getClasses,
  updateClasses,
  deleteClasses,
} = require("../controllers/classes.controller");

// Create a new classes record
router.post("/", createClasses);

// Get all classes records
router.get("/", getClassess);

// Get a single classes record by ID
router.get("/:id", getClasses);

// Update a classes record by ID
router.put("/:id", updateClasses);

// Delete a classes record by ID
router.delete("/:id", deleteClasses);

module.exports = router;
