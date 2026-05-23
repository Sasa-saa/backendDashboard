const mongoose = require("mongoose");

const userMailerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const userMailer = mongoose.model("UserMailer", userMailerSchema);

module.exports = userMailer;
