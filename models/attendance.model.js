const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = attendance;
