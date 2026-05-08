const Attendance = require("../models/attendance.model");

// Create a new attendance record
exports.createAttendance = async (req, res) => {
  try {
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
      return res
        .status(400)
        .json({
          error:
            "All fields (day, count, group, name, present, absent, range) are required",
        });
    }

    if (!["daily", "weekly", "monthly"].includes(range)) {
      return res
        .status(400)
        .json({
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

    res
      .status(201)
      .json({ message: "Attendance recorded", data: newAttendance });
  } catch (error) {
    console.error("Error creating attendance:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Get all attendance records
// exports.getAttendances = async (req, res) => {
//   try {
//     const attendances = await Attendance.find();
//     res.status(200).json(attendances);
//   } catch (error) {
//     console.error("Error fetching attendance:", error);
//     res.status(500).json({ error: "Server error", details: error.message });
//   }
// };
// Get all attendance records with optional type filter
exports.getAttendances = async (req, res) => {
  const { type } = req.query;

  try {
    let query = {};
    if (type && ["daily", "weekly", "monthly"].includes(type)) {
      query.range = type;
    }

    const attendances = await Attendance.find(query);
    res.status(200).json(attendances);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Get a single attendance record by ID
exports.getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);

    if (!attendance) {
      return res.status(404).json({ error: "Attendance not found" });
    }

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Update an attendance record
exports.updateAttendance = async (req, res) => {
  try {
    const updatedAttendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedAttendance) {
      return res.status(404).json({ error: "Attendance not found" });
    }

    res
      .status(200)
      .json({ message: "Attendance updated", data: updatedAttendance });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Delete an attendance record
exports.deleteAttendance = async (req, res) => {
  try {
    const deletedAttendance = await Attendance.findByIdAndDelete(req.params.id);

    if (!deletedAttendance) {
      return res.status(404).json({ error: "Attendance not found" });
    }

    res.status(200).json({ message: "Attendance deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};