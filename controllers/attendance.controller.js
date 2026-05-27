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




// const Attendance = require("../models/attendance.model");
// const connectDb = require("../config/connectdb"); // Import connection function

// // Helper to ensure DB connection before any operation
// const ensureDb = async () => {
//   await connectDb();
// };

// // Create a new attendance record
// exports.createAttendance = async (req, res) => {
//   try {
//     await ensureDb();

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
//       return res.status(400).json({
//         success: false,
//         error: "All fields (day, count, group, name, present, absent, range) are required",
//       });
//     }

//     if (!["daily", "weekly", "monthly"].includes(range)) {
//       return res.status(400).json({
//         success: false,
//         error: "Invalid range. Allowed values are daily, weekly, monthly.",
//       });
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

//     res.status(201).json({
//       success: true,
//       message: "Attendance recorded",
//       data: newAttendance,
//     });
//   } catch (error) {
//     console.error("Error creating attendance:", error);
//     res.status(500).json({
//       success: false,
//       error: "Server error",
//       details: process.env.NODE_ENV === "production" ? undefined : error.message,
//     });
//   }
// };

// // Get all attendance records with optional type filter
// exports.getAttendances = async (req, res) => {
//   const { type } = req.query;

//   try {
//     await ensureDb();

//     let query = {};
//     if (type && ["daily", "weekly", "monthly"].includes(type)) {
//       query.range = type;
//     }

//     const attendances = await Attendance.find(query);
//     res.status(200).json({
//       success: true,
//       data: attendances,
//     });
//   } catch (error) {
//     console.error("Error fetching attendance:", error);
//     res.status(500).json({
//       success: false,
//       error: "Server error",
//       details: process.env.NODE_ENV === "production" ? undefined : error.message,
//     });
//   }
// };

// // Get a single attendance record by ID
// exports.getAttendanceById = async (req, res) => {
//   try {
//     await ensureDb();

//     const attendance = await Attendance.findById(req.params.id);

//     if (!attendance) {
//       return res.status(404).json({
//         success: false,
//         error: "Attendance not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: attendance,
//     });
//   } catch (error) {
//     console.error("Error fetching attendance by ID:", error);
//     res.status(500).json({
//       success: false,
//       error: "Server error",
//       details: process.env.NODE_ENV === "production" ? undefined : error.message,
//     });
//   }
// };

// // Update an attendance record
// exports.updateAttendance = async (req, res) => {
//   try {
//     await ensureDb();

//     const updatedAttendance = await Attendance.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true },
//     );

//     if (!updatedAttendance) {
//       return res.status(404).json({
//         success: false,
//         error: "Attendance not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Attendance updated",
//       data: updatedAttendance,
//     });
//   } catch (error) {
//     console.error("Error updating attendance:", error);
//     res.status(500).json({
//       success: false,
//       error: "Server error",
//       details: process.env.NODE_ENV === "production" ? undefined : error.message,
//     });
//   }
// };

// // Delete an attendance record
// exports.deleteAttendance = async (req, res) => {
//   try {
//     await ensureDb();

//     const deletedAttendance = await Attendance.findByIdAndDelete(req.params.id);

//     if (!deletedAttendance) {
//       return res.status(404).json({
//         success: false,
//         error: "Attendance not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Attendance deleted",
//     });
//   } catch (error) {
//     console.error("Error deleting attendance:", error);
//     res.status(500).json({
//       success: false,
//       error: "Server error",
//       details: process.env.NODE_ENV === "production" ? undefined : error.message,
//     });
//   }
// };






const Attendance = require("../models/attendance.model");
const connectDb = require("../config/connectdb");

const ensureDb = async () => {
  await connectDb();
};

// Create a new attendance record (matches frontend POST needs)
exports.createAttendance = async (req, res) => {
  try {
    await ensureDb();
    const { day, present, absent, range } = req.body;

    if (!day || present === undefined || absent === undefined || !range) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: day, present, absent, range",
      });
    }

    if (!["daily", "weekly", "monthly"].includes(range)) {
      return res.status(400).json({
        success: false,
        error: "Invalid range. Use daily, weekly, or monthly",
      });
    }

    const newAttendance = new Attendance({ day, present, absent, range });
    await newAttendance.save();

    res.status(201).json({
      success: true,
      message: "Attendance recorded",
      data: { day: newAttendance.day, present: newAttendance.present, absent: newAttendance.absent, range: newAttendance.range },
    });
  } catch (error) {
    console.error("Error creating attendance:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Bulk create multiple attendance records
exports.bulkCreateAttendance = async (req, res) => {
  try {
    await ensureDb();
    
    const records = req.body;
    if (!Array.isArray(records) || records.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Request body must be a non-empty array of attendance objects"
      });
    }

    const created = [];
    for (const item of records) {
      const { day, present, absent, range } = item;
      if (!day || present === undefined || absent === undefined || !range) {
        return res.status(400).json({
          success: false,
          error: "Each record must have day, present, absent, range"
        });
      }
      const attendance = new Attendance({ day, present, absent, range });
      await attendance.save();
      created.push({ day, present, absent, range });
    }

    res.status(201).json({
      success: true,
      message: `${created.length} attendance records created`,
      data: created
    });
  } catch (error) {
    console.error("Bulk create error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};


// GET /api/attendance?type=weekly   -> returns array for frontend chart
exports.getAttendances = async (req, res) => {
  const { type } = req.query;

  try {
    await ensureDb();

    let query = {};
    if (type && ["daily", "weekly", "monthly"].includes(type)) {
      query.range = type;
    }

    const records = await Attendance.find(query);

    // Transform to the exact format frontend expects: { name, present, absent }
    const chartData = records.map(record => ({
      name: record.day,
      present: record.present,
      absent: record.absent,
    }));

    // If you want to enforce a fixed order for weekly (Sun...Sat), add sorting:
    if (type === "weekly") {
      const dayOrder = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      chartData.sort((a, b) => dayOrder.indexOf(a.name) - dayOrder.indexOf(b.name));
    }

    // Frontend expects the array directly (not wrapped in { data: ... })
    res.status(200).json(chartData);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// (Keep other CRUD methods if you need them – but they are optional)
// For completeness, here's the update method (unchanged, but adapt to new schema)
exports.updateAttendance = async (req, res) => {
  try {
    await ensureDb();
    const updated = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ success: false, error: "Not found" });
    res.status(200).json({ success: true, data: { name: updated.day, present: updated.present, absent: updated.absent } });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    await ensureDb();
    const deleted = await Attendance.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, error: "Not found" });
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.getAttendanceById = async (req, res) => {
  try {
    await ensureDb();
    const record = await Attendance.findById(req.params.id);
    if (!record) return res.status(404).json({ success: false, error: "Not found" });
    res.status(200).json({ success: true, data: { name: record.day, present: record.present, absent: record.absent } });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};