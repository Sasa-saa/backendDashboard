const mongoose = require("mongoose");

const projectsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const projects = mongoose.model("Projects", projectsSchema);

module.exports = projects;
