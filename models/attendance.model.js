const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    day: { type: String, required: true },     // e.g., "Sun", "Mon", "2025-05-01"
    present: { type: Number, required: true },
    absent: { type: Number, required: true },
    range: { type: String, enum: ["daily", "weekly", "monthly"], required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);