const Attendance = require("../models/attendance.model");

// Create a new attendance record
exports.createAttendance = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const newAttendance = new Attendance({ name });
    await newAttendance.save();

    res
      .status(201)
      .json({ message: "Attendance recorded", data: newAttendance });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Get all attendance records
exports.getAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.find();
    res.status(200).json(attendances);
  } catch (error) {
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
    const { name } = req.body;
    const updatedAttendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      { name },
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

// // attendance.controller.js
// const Attendance = require("../models/attendance"); // adjust path if needed

// // Create a new attendance record
// exports.createAttendance = async (req, res) => {
//   try {
//     const { name } = req.body;

//     if (!name) {
//       return res.status(400).json({ error: "Name is required" });
//     }

//     const newAttendance = new Attendance({ name });
//     await newAttendance.save();

//     res.status(201).json({ message: "Attendance recorded", data: newAttendance });
//   } catch (error) {
//     res.status(500).json({ error: "Server error", details: error.message });
//   }
// };

// // Get all attendance records
// exports.getAttendances = async (req, res) => {
//   try {
//     const attendances = await Attendance.find();
//     res.status(200).json(attendances);
//   } catch (error) {
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
