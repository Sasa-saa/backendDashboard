const mongoose = require("mongoose");

const hiringSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const hiring = mongoose.model("Hiring", hiringSchema);

module.exports = hiring;
