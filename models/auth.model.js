// const mongoose = require("mongoose");

// const userAuthSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true },
// );

// const userAuth = mongoose.model("UserAuth", userAuthSchema);

// module.exports = userAuth;



const mongoose = require("mongoose");

const userAuthSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);

const userAuth = mongoose.model("UserAuth", userAuthSchema);

module.exports = userAuth;
