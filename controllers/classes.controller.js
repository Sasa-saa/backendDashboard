// const Classes = require("../models/classes.model");

// // Create a new class
// const createClass = async (req, res) => {
//   try {
//     const {
//       name,
//       capacity,
//       total,
//       level,
//       shift,
//       teacher,
//       subject,
//       room,
//       status,
//     } = req.body;

//     const newClass = await Classes.create({
//       name,
//       capacity,
//       total,
//       level,
//       shift,
//       teacher,
//       subject,
//       room,
//       status: status || "open", // default to "open" if not provided
//     });

//     res.status(201).json({
//       success: true,
//       message: "Class created successfully",
//       data: newClass,
//     });
//   } catch (error) {
//     console.error(error);
//     // Handle duplicate key error (e.g., unique name or teacher)
//     if (error.code === 11000) {
//       return res.status(400).json({
//         success: false,
//         message: "Duplicate field value: name or teacher must be unique",
//       });
//     }
//     res.status(500).json({
//       success: false,
//       message: error.message,        // <-- add this
//       stack: error.stack             // <-- helps you see the actual problem
//     });
//   }
// };

// // Get all classes
// const getAllClasses = async (req, res) => {
//   try {
//     const classes = await Classes.find({});

//     // Always return 200, even if the array is empty
//     res.status(200).json({
//       success: true,
//       message: classes.length === 0 ? "No classes found" : "Classes retrieved successfully",
//       data: classes,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while retrieving classes",
//     });
//   }
// };




// // Get a single class by ID
// const getClassById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const classDoc = await Classes.findById(id);

//     if (!classDoc) {
//       return res.status(404).json({
//         success: false,
//         message: "Class not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Class retrieved successfully",
//       data: classDoc,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while retrieving the class",
//     });
//   }
// };

// // Update a class by ID
// const updateClass = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateFields = { ...req.body }; // allow any valid field from the schema

//     const updatedClass = await Classes.findByIdAndUpdate(id, updateFields, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updatedClass) {
//       return res.status(404).json({
//         success: false,
//         message: "Class not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Class updated successfully",
//       data: updatedClass,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while updating the class",
//     });
//   }
// };

// // Delete a class by ID
// const deleteClass = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedClass = await Classes.findByIdAndDelete(id);

//     if (!deletedClass) {
//       return res.status(404).json({
//         success: false,
//         message: "Class not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Class deleted successfully",
//       data: deletedClass,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while deleting the class",
//     });
//   }
// };

// module.exports = {
//   createClass,
//   getAllClasses,
//   getClassById,
//   updateClass,
//   deleteClass,
// };



const Classes = require("../models/classes.model");
const connectDb = require("../config/connectdb"); // Import the connection function

// Helper to run DB connection before any operation
const ensureDb = async () => {
  await connectDb();
};

// Create a new class
const createClass = async (req, res) => {
  try {
    await ensureDb(); // ensure database is connected

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
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate field value: name or teacher must be unique",
      });
    }
    // Send safe error details (avoid stack trace in production)
    res.status(500).json({
      success: false,
      message: process.env.NODE_ENV === "production" 
        ? "An error occurred while creating the class" 
        : error.message,
    });
  }
};

// Get all classes
const getAllClasses = async (req, res) => {
  try {
    await ensureDb(); // ensure database is connected

    const classes = await Classes.find({});

    res.status(200).json({
      success: true,
      message: classes.length === 0 ? "No classes found" : "Classes retrieved successfully",
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
    await ensureDb(); // ensure database is connected

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
    await ensureDb(); // ensure database is connected

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
    await ensureDb(); // ensure database is connected

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