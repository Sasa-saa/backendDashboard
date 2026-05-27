// const Attendance = require("../models/attendance.model");
// const connectDb = require("../config/connectdb");

// const ensureDb = async () => {
//   await connectDb();
// };

// // Create a new attendance record (matches frontend POST needs)
// exports.createAttendance = async (req, res) => {
//   try {
//     await ensureDb();
//     const { day, present, absent, range } = req.body;

//     if (!day || present === undefined || absent === undefined || !range) {
//       return res.status(400).json({
//         success: false,
//         error: "Missing required fields: day, present, absent, range",
//       });
//     }

//     if (!["daily", "weekly", "monthly"].includes(range)) {
//       return res.status(400).json({
//         success: false,
//         error: "Invalid range. Use daily, weekly, or monthly",
//       });
//     }

//     const newAttendance = new Attendance({ day, present, absent, range });
//     await newAttendance.save();

//     res.status(201).json({
//       success: true,
//       message: "Attendance recorded",
//       data: { day: newAttendance.day, present: newAttendance.present, absent: newAttendance.absent, range: newAttendance.range },
//     });
//   } catch (error) {
//     console.error("Error creating attendance:", error);
//     res.status(500).json({ success: false, error: "Server error" });
//   }
// };

// // Bulk create multiple attendance records
// exports.bulkCreateAttendance = async (req, res) => {
//   try {
//     await ensureDb();
    
//     const records = req.body;
//     if (!Array.isArray(records) || records.length === 0) {
//       return res.status(400).json({
//         success: false,
//         error: "Request body must be a non-empty array of attendance objects"
//       });
//     }

//     const created = [];
//     for (const item of records) {
//       const { day, present, absent, range } = item;
//       if (!day || present === undefined || absent === undefined || !range) {
//         return res.status(400).json({
//           success: false,
//           error: "Each record must have day, present, absent, range"
//         });
//       }
//       const attendance = new Attendance({ day, present, absent, range });
//       await attendance.save();
//       created.push({ day, present, absent, range });
//     }

//     res.status(201).json({
//       success: true,
//       message: `${created.length} attendance records created`,
//       data: created
//     });
//   } catch (error) {
//     console.error("Bulk create error:", error);
//     res.status(500).json({ success: false, error: "Server error" });
//   }
// };


// // GET /api/attendance?type=weekly   -> returns array for frontend chart
// exports.getAttendances = async (req, res) => {
//   const { type } = req.query;

//   try {
//     await ensureDb();

//     let query = {};
//     if (type && ["daily", "weekly", "monthly"].includes(type)) {
//       query.range = type;
//     }

//     const records = await Attendance.find(query);

//     // Transform to the exact format frontend expects: { name, present, absent }
//     const chartData = records.map(record => ({
//       name: record.day,
//       present: record.present,
//       absent: record.absent,
//     }));

//     // If you want to enforce a fixed order for weekly (Sun...Sat), add sorting:
//     if (type === "weekly") {
//       const dayOrder = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//       chartData.sort((a, b) => dayOrder.indexOf(a.name) - dayOrder.indexOf(b.name));
//     }

//     // Frontend expects the array directly (not wrapped in { data: ... })
//     res.status(200).json(chartData);
//   } catch (error) {
//     console.error("Error fetching attendance:", error);
//     res.status(500).json({ success: false, error: "Server error" });
//   }
// };

// // (Keep other CRUD methods if you need them – but they are optional)
// // For completeness, here's the update method (unchanged, but adapt to new schema)
// exports.updateAttendance = async (req, res) => {
//   try {
//     await ensureDb();
//     const updated = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//     if (!updated) return res.status(404).json({ success: false, error: "Not found" });
//     res.status(200).json({ success: true, data: { name: updated.day, present: updated.present, absent: updated.absent } });
//   } catch (error) {
//     res.status(500).json({ success: false, error: "Server error" });
//   }
// };

// exports.deleteAttendance = async (req, res) => {
//   try {
//     await ensureDb();
//     const deleted = await Attendance.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ success: false, error: "Not found" });
//     res.status(200).json({ success: true, message: "Deleted" });
//   } catch (error) {
//     res.status(500).json({ success: false, error: "Server error" });
//   }
// };

// exports.getAttendanceById = async (req, res) => {
//   try {
//     await ensureDb();
//     const record = await Attendance.findById(req.params.id);
//     if (!record) return res.status(404).json({ success: false, error: "Not found" });
//     res.status(200).json({ success: true, data: { name: record.day, present: record.present, absent: record.absent } });
//   } catch (error) {
//     res.status(500).json({ success: false, error: "Server error" });
//   }
// };






const Attendance = require("../models/attendance.model");
const connectDb = require("../config/connectdb");
const { broadcastUpdate } = require("../utils/sse"); // 🔥 import SSE helper

const ensureDb = async () => {
  await connectDb();
};

// Create a new attendance record
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

    const responseData = {
      day: newAttendance.day,
      present: newAttendance.present,
      absent: newAttendance.absent,
      range: newAttendance.range,
    };

    res.status(201).json({
      success: true,
      message: "Attendance recorded",
      data: responseData,
    });

    // 🔥 Broadcast to SSE clients
    broadcastUpdate({
      type: "attendance",
      data: responseData,
      timestamp: Date.now(),
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
        error: "Request body must be a non-empty array of attendance objects",
      });
    }

    const created = [];
    for (const item of records) {
      const { day, present, absent, range } = item;
      if (!day || present === undefined || absent === undefined || !range) {
        return res.status(400).json({
          success: false,
          error: "Each record must have day, present, absent, range",
        });
      }
      const attendance = new Attendance({ day, present, absent, range });
      await attendance.save();
      created.push({ day, present, absent, range });
    }

    res.status(201).json({
      success: true,
      message: `${created.length} attendance records created`,
      data: created,
    });

    // 🔥 Broadcast bulk creation
    broadcastUpdate({
      type: "attendance_bulk",
      data: created,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("Bulk create error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// GET /api/attendance?type=weekly
exports.getAttendances = async (req, res) => {
  const { type } = req.query;

  try {
    await ensureDb();

    let query = {};
    if (type && ["daily", "weekly", "monthly"].includes(type)) {
      query.range = type;
    }

    const records = await Attendance.find(query);

    const chartData = records.map((record) => ({
      name: record.day,
      present: record.present,
      absent: record.absent,
    }));

    if (type === "weekly") {
      const dayOrder = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      chartData.sort(
        (a, b) => dayOrder.indexOf(a.name) - dayOrder.indexOf(b.name)
      );
    }

    res.status(200).json(chartData);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Update attendance
exports.updateAttendance = async (req, res) => {
  try {
    await ensureDb();
    const updated = await Attendance.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated)
      return res.status(404).json({ success: false, error: "Not found" });

    const responseData = {
      name: updated.day,
      present: updated.present,
      absent: updated.absent,
    };

    res.status(200).json({ success: true, data: responseData });

    // 🔥 Broadcast update
    broadcastUpdate({
      type: "attendance_update",
      data: responseData,
      timestamp: Date.now(),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Delete attendance
exports.deleteAttendance = async (req, res) => {
  try {
    await ensureDb();
    const deleted = await Attendance.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, error: "Not found" });

    res.status(200).json({ success: true, message: "Deleted" });

    // 🔥 Broadcast deletion
    broadcastUpdate({
      type: "attendance_delete",
      data: { id: req.params.id },
      timestamp: Date.now(),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Get attendance by ID
exports.getAttendanceById = async (req, res) => {
  try {
    await ensureDb();
    const record = await Attendance.findById(req.params.id);
    if (!record)
      return res.status(404).json({ success: false, error: "Not found" });

    const responseData = {
      name: record.day,
      present: record.present,
      absent: record.absent,
    };

    res.status(200).json({ success: true, data: responseData });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};
