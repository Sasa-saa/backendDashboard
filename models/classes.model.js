const mongoose = require("mongoose");
const validator = require("validator");

const classesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    capacity: {
      type: Number, // changed from String to Number
      required: true,
      min: 0,
    },
    total: {
      type: Number, // matches frontend "Total Seats"
      required: true,
      min: 0,
    },
    level: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    shift: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    teacher: {
      type: String,
      required: true,
      unique: true,
    },
    subject: {
      type: String,
      required: true,
    },
    room: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
  },
  { timestamps: true },
);


const Classes = mongoose.model("Classes", classesSchema);
module.exports = Classes;
