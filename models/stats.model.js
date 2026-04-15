// const mongoose = require("mongoose");

// const statsSchema = new mongoose.Schema({
//   totalEmployees: {
//     type: Number,
//     default: 0
//   },
//   jobApplicants: {
//     type: Number,
//     default: 0
//   },
//   revenue: {
//     type: Number,
//     default: 0
//   },
//   attendance: {
//     type: Number,
//     default: 0
//   }
// });

// const Stats = mongoose.model("Stats", statsSchema);


// module.exports = { Stats };


const mongoose = require("mongoose");

const statsSchema = new mongoose.Schema({
  totalEmployees: { type: Number, default: 0 },
  jobApplicants: { type: Number, default: 0 },
  revenue: { type: Number, default: 0 },
  attendance: { type: Number, default: 0 }
});

const Stats = mongoose.model("Stats", statsSchema);

// Export the model directly
module.exports = Stats;