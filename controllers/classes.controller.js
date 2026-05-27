const Classes = require("../models/classes.model");
const connectDb = require("../config/connectdb");
const { broadcastUpdate } = require("../utils/sse"); // 🔥 import SSE helper

// Helper to run DB connection before any operation
const ensureDb = async () => {
  await connectDb();
};

// Create a new class
const createClass = async (req, res) => {
  try {
    await ensureDb();

    const {
      name,
      capacity,
      total,
      level,
      shift,
      teacher,
      subject,
      room,
      status,
    } = req.body;

    const newClass = await Classes.create({
      name,
      capacity,
      total,
      level,
      shift,
      teacher,
      subject,
      room,
      status: status || "open",
    });

    res.status(201).json({
      success: true,
      message: "Class created successfully",
      data: newClass,
    });

    // 🔥 Broadcast creation
    broadcastUpdate({
      type: "class_create",
      data: newClass,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate field value: name or teacher must be unique",
      });
    }
    res.status(500).json({
      success: false,
      message:
        process.env.NODE_ENV === "production"
          ? "An error occurred while creating the class"
          : error.message,
    });
  }
};

// Get all classes
const getAllClasses = async (req, res) => {
  try {
    await ensureDb();
    const classes = await Classes.find({});
    res.status(200).json({
      success: true,
      message:
        classes.length === 0
          ? "No classes found"
          : "Classes retrieved successfully",
      data: classes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving classes",
    });
  }
};

// Get a single class by ID
const getClassById = async (req, res) => {
  try {
    await ensureDb();
    const { id } = req.params;
    const classDoc = await Classes.findById(id);

    if (!classDoc) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Class retrieved successfully",
      data: classDoc,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the class",
    });
  }
};

// Update a class by ID
const updateClass = async (req, res) => {
  try {
    await ensureDb();
    const { id } = req.params;
    const updateFields = { ...req.body };

    const updatedClass = await Classes.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Class updated successfully",
      data: updatedClass,
    });

    // 🔥 Broadcast update
    broadcastUpdate({
      type: "class_update",
      data: updatedClass,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the class",
    });
  }
};

// Delete a class by ID
const deleteClass = async (req, res) => {
  try {
    await ensureDb();
    const { id } = req.params;
    const deletedClass = await Classes.findByIdAndDelete(id);

    if (!deletedClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Class deleted successfully",
      data: deletedClass,
    });

    // 🔥 Broadcast deletion
    broadcastUpdate({
      type: "class_delete",
      data: { id },
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the class",
    });
  }
};

module.exports = {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
};
