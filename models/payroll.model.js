const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const payroll = mongoose.model("Payroll", payrollSchema);

module.exports = payroll;
