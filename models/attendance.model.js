// const mongoose = require("mongoose");

// const attendanceSchema = new mongoose.Schema(
//   {
//     day: {
//       type: String,
//       required: true,
//     },
//     count: {
//       type: Number,
//       required: true,
//     },
//     group: {
//       type: String, // e.g. "blue line" vs "purple line"
//       required: true,
//     },
//     name: { type: String, required: true }, // e.g. "Mon"
//     present: { type: Number, required: true },
//     absent: { type: Number, required: true },
//   },
//   { timestamps: true },
// );

// const attendance = mongoose.model("Attendance", attendanceSchema);

// module.exports = attendance;




const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    day: { type: String, required: true },
    count: { type: Number, required: true },
    group: { type: String, required: true },
    name: { type: String, required: true },
    present: { type: Number, required: true },
    absent: { type: Number, required: true },
    range: { type: String, enum: ["daily", "weekly", "monthly"], required: true } // NEW
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);