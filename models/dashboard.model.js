const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const dashboard = mongoose.model("Dashboard", dashboardSchema);

module.exports = dashboard;
