// const Stats = require("../models/stats.model");

// // CREATE a new stats document
// exports.createStats = async (req, res) => {
//   try {
//     const stats = new Stats(req.body);
//     await stats.save();
//     res.status(201).json(stats);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating stats", error });
//   }
// };

// // // READ all stats documents
// // exports.getAllStats = async (req, res) => {
// //   try {
// //     const stats = await Stats.find();
// //     res.json(stats);
// //   } catch (error) {
// //     res.status(500).json({ message: "Error fetching stats", error });
// //   }
// // };

// // READ all (but we’ll adjust to return latest)
// exports.getAllStats = async (req, res) => {
//   try {
//     // sort by _id descending, limit to 1
//     const latestStats = await Stats.find().sort({ _id: -1 }).limit(1);
//     res.json(latestStats);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// // READ a single stats document by ID
// exports.getStatsById = async (req, res) => {
//   try {
//     const stats = await Stats.findById(req.params.id);
//     if (!stats) {
//       return res.status(404).json({ message: "Stats not found" });
//     }
//     res.json(stats);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching stats", error });
//   }
// };

// // READ the latest stats document
// exports.getLatestStats = async (req, res) => {
//   try {
//     const latestStats = await Stats.find().sort({ _id: -1 }).limit(1);
//     res.json(latestStats);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// // UPDATE a stats document by ID
// exports.updateStats = async (req, res) => {
//   try {
//     const stats = await Stats.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );
//     if (!stats) {
//       return res.status(404).json({ message: "Stats not found" });
//     }
//     res.json(stats);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating stats", error });
//   }
// };

// // DELETE a stats document by ID
// exports.deleteStats = async (req, res) => {
//   try {
//     const stats = await Stats.findByIdAndDelete(req.params.id);
//     if (!stats) {
//       return res.status(404).json({ message: "Stats not found" });
//     }
//     res.json({ message: "Stats deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting stats", error });
//   }
// };







// const Stats = require("../models/stats.model");

// // CREATE a new stats document
// exports.createStats = async (req, res) => {
//   try {
//     const stats = new Stats(req.body);
//     await stats.save();
//     res.status(201).json(stats);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating stats", error: error.message });
//   }
// };

// // READ all stats documents (latest only)
// exports.getAllStats = async (req, res) => {
//   try {
//     const latestStats = await Stats.find().sort({ _id: -1 }).limit(1);
//     res.json(latestStats);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // READ a single stats document by ID
// exports.getStatsById = async (req, res) => {
//   try {
//     const stats = await Stats.findById(req.params.id);
//     if (!stats) {
//       return res.status(404).json({ message: "Stats not found" });
//     }
//     res.json(stats);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching stats", error: error.message });
//   }
// };

// // UPDATE a stats document by ID
// exports.updateStats = async (req, res) => {
//   try {
//     const stats = await Stats.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );
//     if (!stats) {
//       return res.status(404).json({ message: "Stats not found" });
//     }
//     res.json(stats);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating stats", error: error.message });
//   }
// };

// // DELETE a stats document by ID
// exports.deleteStats = async (req, res) => {
//   try {
//     const stats = await Stats.findByIdAndDelete(req.params.id);
//     if (!stats) {
//       return res.status(404).json({ message: "Stats not found" });
//     }
//     res.json({ message: "Stats deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting stats", error: error.message });
//   }
// };





const Stats = require("../models/stats.model");

// CREATE a new stats document
exports.createStats = async (req, res) => {
  try {
    const stats = new Stats(req.body);
    await stats.save();
    res.status(201).json(stats);
  } catch (error) {
    console.error("Error creating stats:", error);
    res.status(500).json({ message: "Error creating stats", error: error.message });
  }
};

// READ all stats documents (latest only)
exports.getAllStats = async (req, res) => {
  try {
    const latestStats = await Stats.find().sort({ _id: -1 }).limit(1);
    res.json(latestStats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ a single stats document by ID
exports.getStatsById = async (req, res) => {
  try {
    const stats = await Stats.findById(req.params.id);
    if (!stats) {
      return res.status(404).json({ message: "Stats not found" });
    }
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats", error: error.message });
  }
};

// UPDATE a stats document by ID
exports.updateStats = async (req, res) => {
  try {
    const stats = await Stats.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!stats) {
      return res.status(404).json({ message: "Stats not found" });
    }
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Error updating stats", error: error.message });
  }
};

// DELETE a stats document by ID
exports.deleteStats = async (req, res) => {
  try {
    const stats = await Stats.findByIdAndDelete(req.params.id);
    if (!stats) {
      return res.status(404).json({ message: "Stats not found" });
    }
    res.json({ message: "Stats deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting stats", error: error.message });
  }
};