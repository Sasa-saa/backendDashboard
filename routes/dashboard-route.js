// dashboard-route.js
const express = require("express");
const router = express.Router();
const { createDashboard, getDashboards, getDashboard, updateDashboard, deleteDashboard } = require("../controllers/dashboard.controller");

// Create a new dashboard
router.post("/", createDashboard);

// Get all dashboards
router.get("/", getDashboards);

// Get a single dashboard by ID
router.get("/:id",getDashboard);

// Update a dashboard by ID
router.put("/:id", updateDashboard);

// Delete a dashboard by ID
router.delete("/:id", deleteDashboard);

module.exports = router;