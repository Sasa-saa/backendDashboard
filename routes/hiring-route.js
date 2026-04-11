const express = require("express");
const router = express.Router();
const {
  createHiring,
  getHirings,
  getHiring,
  updateHiring,
  deleteHiring,
} = require("../controllers/hiring.controller");

// Create a new hiring record
router.post("/", createHiring);

// Get all hiring records
router.get("/", getHirings);

// Get a single hiring record by ID
router.get("/:id", getHiring);

// Update a hiring record by ID
router.put("/:id", updateHiring);

// Delete a hiring record by ID
router.delete("/:id", deleteHiring);

module.exports = router;
