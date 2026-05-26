// const Attendance = require("../models/attendance.model");

// // Create a new attendance record
// exports.createAttendance = async (req, res) => {
//   try {
//     const { day, count, group, name, present, absent, range } = req.body;

//     if (
//       !day ||
//       !count ||
//       !group ||
//       !name ||
//       present == null ||
//       absent == null ||
//       !range
//     ) {
//       return res
//         .status(400)
//         .json({
//           error:
//             "All fields (day, count, group, name, present, absent, range) are required",
//         });
//     }

//     if (!["daily", "weekly", "monthly"].includes(range)) {
//       return res
//         .status(400)
//         .json({
//           error: "Invalid range. Allowed values are daily, weekly, monthly.",
//         });
//     }

//     const newAttendance = new Attendance({
//       day,
//       count,
//       group,
//       name,
//       present,
//       absent,
//       range,
//     });
//     await newAttendance.save();

//     res
//       .status(201)
//       .json({ message: "Attendance recorded", data: newAttendance });
//   } catch (error) {
//     console.error("Error creating attendance:", error);
//     res.status(500).json({ error: "Server error", details: error.message });
//   }
// };

// // Get all attendance records
// // exports.getAttendances = async (req, res) => {
// //   try {
// //     const attendances = await Attendance.find();
// //     res.status(200).json(attendances);
// //   } catch (error) {
// //     console.error("Error fetching attendance:", error);
// //     res.status(500).json({ error: "Server error", details: error.message });
// //   }
// // };
// // Get all attendance records with optional type filter
// exports.getAttendances = async (req, res) => {
//   const { type } = req.query;

//   try {
//     let query = {};
//     if (type && ["daily", "weekly", "monthly"].includes(type)) {
//       query.range = type;
//     }

//     const attendances = await Attendance.find(query);
//     res.status(200).json(attendances);
//   } catch (error) {
//     console.error("Error fetching attendance:", error);
//     res.status(500).json({ error: "Server error", details: error.message });
//   }
// };

// // Get a single attendance record by ID
// exports.getAttendanceById = async (req, res) => {
//   try {
//     const attendance = await Attendance.findById(req.params.id);

//     if (!attendance) {
//       return res.status(404).json({ error: "Attendance not found" });
//     }

//     res.status(200).json(attendance);
//   } catch (error) {
//     res.status(500).json({ error: "Server error", details: error.message });
//   }
// };

// // Update an attendance record
// exports.updateAttendance = async (req, res) => {
//   try {
//     const updatedAttendance = await Attendance.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true },
//     );

//     if (!updatedAttendance) {
//       return res.status(404).json({ error: "Attendance not found" });
//     }

//     res
//       .status(200)
//       .json({ message: "Attendance updated", data: updatedAttendance });
//   } catch (error) {
//     res.status(500).json({ error: "Server error", details: error.message });
//   }
// };

// // Delete an attendance record
// exports.deleteAttendance = async (req, res) => {
//   try {
//     const deletedAttendance = await Attendance.findByIdAndDelete(req.params.id);

//     if (!deletedAttendance) {
//       return res.status(404).json({ error: "Attendance not found" });
//     }

//     res.status(200).json({ message: "Attendance deleted" });
//   } catch (error) {
//     res.status(500).json({ error: "Server error", details: error.message });
//   }
// };




const Attendance = require("../models/attendance.model");
const connectDb = require("../config/connectdb"); // Import connection function

// Helper to ensure DB connection before any operation
const ensureDb = async () => {
  await connectDb();
};

// Create a new attendance record
exports.createAttendance = async (req, res) => {
  try {
    await ensureDb();

    const { day, count, group, name, present, absent, range } = req.body;

    if (
      !day ||
      !count ||
      !group ||
      !name ||
      present == null ||
      absent == null ||
      !range
    ) {
      return res.status(400).json({
        success: false,
        error: "All fields (day, count, group, name, present, absent, range) are required",
      });
    }

    if (!["daily", "weekly", "monthly"].includes(range)) {
      return res.status(400).json({
        success: false,
        error: "Invalid range. Allowed values are daily, weekly, monthly.",
      });
    }

    const newAttendance = new Attendance({
      day,
      count,
      group,
      name,
      present,
      absent,
      range,
    });
    await newAttendance.save();

    res.status(201).json({
      success: true,
      message: "Attendance recorded",
      data: newAttendance,
    });
  } catch (error) {
    console.error("Error creating attendance:", error);
    res.status(500).json({
      success: false,
      error: "Server error",
      details: process.env.NODE_ENV === "production" ? undefined : error.message,
    });
  }
};

// Get all attendance records with optional type filter
exports.getAttendances = async (req, res) => {
  const { type } = req.query;

  try {
    await ensureDb();

    let query = {};
    if (type && ["daily", "weekly", "monthly"].includes(type)) {
      query.range = type;
    }

    const attendances = await Attendance.find(query);
    res.status(200).json({
      success: true,
      data: attendances,
    });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({
      success: false,
      error: "Server error",
      details: process.env.NODE_ENV === "production" ? undefined : error.message,
    });
  }
};

// Get a single attendance record by ID
exports.getAttendanceById = async (req, res) => {
  try {
    await ensureDb();

    const attendance = await Attendance.findById(req.params.id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        error: "Attendance not found",
      });
    }

    res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    console.error("Error fetching attendance by ID:", error);
    res.status(500).json({
      success: false,
      error: "Server error",
      details: process.env.NODE_ENV === "production" ? undefined : error.message,
    });
  }
};

// Update an attendance record
exports.updateAttendance = async (req, res) => {
  try {
    await ensureDb();

    const updatedAttendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedAttendance) {
      return res.status(404).json({
        success: false,
        error: "Attendance not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Attendance updated",
      data: updatedAttendance,
    });
  } catch (error) {
    console.error("Error updating attendance:", error);
    res.status(500).json({
      success: false,
      error: "Server error",
      details: process.env.NODE_ENV === "production" ? undefined : error.message,
    });
  }
};

// Delete an attendance record
exports.deleteAttendance = async (req, res) => {
  try {
    await ensureDb();

    const deletedAttendance = await Attendance.findByIdAndDelete(req.params.id);

    if (!deletedAttendance) {
      return res.status(404).json({
        success: false,
        error: "Attendance not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Attendance deleted",
    });
  } catch (error) {
    console.error("Error deleting attendance:", error);
    res.status(500).json({
      success: false,
      error: "Server error",
      details: process.env.NODE_ENV === "production" ? undefined : error.message,
    });
  }
};