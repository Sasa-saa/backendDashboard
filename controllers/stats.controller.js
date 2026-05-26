// const Stats = require("../models/stats.model");

// // CREATE a new stats document
// exports.createStats = async (req, res) => {
//   try {
//     const stats = new Stats(req.body);
//     await stats.save();
//     res.status(201).json(stats);
//   } catch (error) {
//     console.error("Error creating stats:", error);
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
const connectDb = require("../config/connectdb");

// Helper to ensure DB connection (reuses cached connection)
const ensureDb = async () => {
  await connectDb();
};

// CREATE a new stats document
exports.createStats = async (req, res) => {
  try {
    await ensureDb();

    const stats = new Stats(req.body);
    await stats.save();

    res.status(201).json({
      success: true,
      message: "Stats created successfully",
      data: stats,
    });
  } catch (error) {
    console.error("Error creating stats:", error);
    res.status(500).json({
      success: false,
      message: "Error creating stats",
      ...(process.env.NODE_ENV !== "production" && { error: error.message }),
    });
  }
};

// READ all stats documents (latest only)
exports.getAllStats = async (req, res) => {
  try {
    await ensureDb();

    const latestStats = await Stats.find().sort({ _id: -1 }).limit(1);

    res.status(200).json({
      success: true,
      data: latestStats,
      message: latestStats.length === 0 ? "No stats found" : "Stats retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching stats",
      ...(process.env.NODE_ENV !== "production" && { error: error.message }),
    });
  }
};

// READ a single stats document by ID
exports.getStatsById = async (req, res) => {
  try {
    await ensureDb();

    const stats = await Stats.findById(req.params.id);
    if (!stats) {
      return res.status(404).json({
        success: false,
        message: "Stats not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Stats retrieved successfully",
      data: stats,
    });
  } catch (error) {
    console.error("Error fetching stats by ID:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching stats",
      ...(process.env.NODE_ENV !== "production" && { error: error.message }),
    });
  }
};

// UPDATE a stats document by ID
exports.updateStats = async (req, res) => {
  try {
    await ensureDb();

    const stats = await Stats.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!stats) {
      return res.status(404).json({
        success: false,
        message: "Stats not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Stats updated successfully",
      data: stats,
    });
  } catch (error) {
    console.error("Error updating stats:", error);
    res.status(500).json({
      success: false,
      message: "Error updating stats",
      ...(process.env.NODE_ENV !== "production" && { error: error.message }),
    });
  }
};

// DELETE a stats document by ID
exports.deleteStats = async (req, res) => {
  try {
    await ensureDb();

    const stats = await Stats.findByIdAndDelete(req.params.id);
    if (!stats) {
      return res.status(404).json({
        success: false,
        message: "Stats not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Stats deleted successfully",
      data: stats,
    });
  } catch (error) {
    console.error("Error deleting stats:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting stats",
      ...(process.env.NODE_ENV !== "production" && { error: error.message }),
    });
  }
};