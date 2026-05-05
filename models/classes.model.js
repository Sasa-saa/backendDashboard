// const mongoose = require("mongoose");
// const validator = require("validator");

// const classesSchema = new mongoose.Schema(
//   {
//     id: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     avatar: {
//       type: String,
//       required: true,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       validate: [validator.isEmail, "Invalid email address"],
//     },
//     date: {
//       type: Date,
//       required: true,
//       default: Date.now, // optional: auto‑set when document is created
//     },
//     amount: {
//       type: Number,
//       required: true,
//       min: 0, // prevents negative amounts
//     },
//     tax: {
//       type: Number,
//       required: true,
//       min: 0,
//       default: 0, // optional: default tax if not provided
//     },
//     tags: {
//       type: String,
//       required: true,
//       lowercase: true,
//       trim: true,
//       validate: {
//         validator: function (v) {
//           // must be an array with at least one valid tag
//           return (
//             Array.isArray(v) &&
//             v.length > 0 &&
//             v.every((tag) => validator.isAlphanumeric(tag.replace(/\s/g, "")))
//           );
//         },
//         message: "Tags must contain at least one valid alphanumeric string",
//       },
//     },
//   },
//   { timestamps: true },
// );

// const task = mongoose.model("Task", classesSchema);

// module.exports = task;



const mongoose = require("mongoose");
const validator = require("validator");

const classesSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      required: true,
      validate: {
        validator: v => validator.isURL(v),
        message: "Invalid avatar URL",
      },
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Invalid email address"],
    },
    // date: {
    //   type: Date,
    //   required: true,
    //   default: Date.now,
    // },
    date: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    tax: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    tags: {
      type: [String], // ✅ array of strings
      required: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return (
            Array.isArray(v) &&
            v.length > 0 &&
            v.every(tag =>
              validator.isAlphanumeric(tag.replace(/\s/g, ""))
            )
          );
        },
        message: "Tags must contain at least one valid alphanumeric string",
      },
    },
  },
  { timestamps: true }
);

const Classes = mongoose.model("Classes", classesSchema);
module.exports = Classes;
