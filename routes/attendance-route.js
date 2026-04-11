// attendance-route.js
const express = require("express");
const attendanceRouter = express.Router();
const attendanceController = require("../controllers/attendance.controller");

// Create a new attendance record
attendanceRouter.post("/", attendanceController.createAttendance);

// Get all attendance records
attendanceRouter.get("/", attendanceController.getAttendances);

// Get a single attendance record by ID
attendanceRouter.get("/:id", attendanceController.getAttendanceById);

// Update an attendance record
attendanceRouter.put("/:id", attendanceController.updateAttendance);

// Delete an attendance record
attendanceRouter.delete("/:id", attendanceController.deleteAttendance);

module.exports = attendanceRouter;
