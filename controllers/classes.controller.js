const Classes = require("../models/classes.model");

// Create a new Classes record
const createClasses = async (req, res) => {
  try {
    const { id, avatar, name, email, date, amount, tax, tags } = req.body;

    const newClasses = await Classes.create({
      id,
      avatar,
      name,
      email,
      date,
      amount,
      tax,
      tags,
    });

    if (!newClasses) {
      return res.status(400).json({
        success: false,
        message: "Cannot create a new Classes record",
      });
    }

    res.status(201).json({
      success: true,
      message: "New Classes record created successfully",
      data: newClasses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the Classes record",
    });
  }
};

// Get all Classes records
const getClassess = async (req, res) => {
  try {
    const Classess = await Classes.find({});

    if (Classess.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Classes records found",
        data: Classess,
      });
    }

    res.status(200).json({
      success: true,
      message: "Classes records retrieved successfully",
      data: Classess,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving Classes records",
    });
  }
};

// Get a single Classes record
const getClasses = async (req, res) => {
  try {
    const { id } = req.params;

    const Classes = await Classes.findById(id);

    if (!Classes) {
      return res.status(404).json({
        success: false,
        message: "Classes record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Classes record retrieved successfully",
      data: Classes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the Classes record",
    });
  }
};

// Update a Classes record
const updateClasses = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: newId, avatar, name, email, date, amount, tax, tags } = req.body;

    const updatedClasses = await Classes.findByIdAndUpdate(
      id,
      { name },
      { returnDocument: "after" }
    );

    if (!updatedClasses) {
      return res.status(404).json({
        success: false,
        message: "Classes record not found or could not be updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "Classes record updated successfully",
      data: updatedClasses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the Classes record",
    });
  }
};

// Delete a Classes record
const deleteClasses = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedClasses = await Classes.findByIdAndDelete(id);

    if (!deletedClasses) {
      return res.status(404).json({
        success: false,
        message: "Classes record not found or could not be deleted",
      });
    }

    res.status(200).json({
      success: true,
      message: "Classes record deleted successfully",
      data: deletedClasses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the Classes record",
    });
  }
};

module.exports = {
  createClasses,
  getClassess,
  getClasses,
  updateClasses,
  deleteClasses,
};




// const Classes = require("../models/Classes.model");

// // Create a new Classes record
// const createClasses = async (req, res) => {
//   try {
//     const newClasses = await Classes.create(req.body);

//     res.status(201).json({
//       success: true,
//       message: "New Classes record created successfully",
//       data: newClasses,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({
//       success: false,
//       message: "Error creating Classes record",
//       error: error.message,
//     });
//   }
// };

// // Get all Classes records
// const getClassess = async (req, res) => {
//   try {
//     const Classess = await Classes.find({});
//     res.status(200).json({
//       success: true,
//       message: "Classes records retrieved successfully",
//       data: Classess,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Error retrieving Classes records",
//     });
//   }
// };

// // Get a single Classes record by custom id
// const getClasses = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const Classes = await Classes.findOne({ id }); // ✅ use custom id

//     if (!Classes) {
//       return res.status(404).json({
//         success: false,
//         message: "Classes record not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Classes record retrieved successfully",
//       data: Classes,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Error retrieving Classes record",
//     });
//   }
// };

// // Update a Classes record
// const updateClasses = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedClasses = await Classes.findOneAndUpdate(
//       { id }, // ✅ use custom id
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!updatedClasses) {
//       return res.status(404).json({
//         success: false,
//         message: "Classes record not found or could not be updated",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Classes record updated successfully",
//       data: updatedClasses,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({
//       success: false,
//       message: "Error updating Classes record",
//       error: error.message,
//     });
//   }
// };

// // Delete a Classes record
// const deleteClasses = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedClasses = await Classes.findOneAndDelete({ id }); // ✅ use custom id

//     if (!deletedClasses) {
//       return res.status(404).json({
//         success: false,
//         message: "Classes record not found or could not be deleted",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Classes record deleted successfully",
//       data: deletedClasses,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Error deleting Classes record",
//     });
//   }
// };

// module.exports = {
//   createClasses,
//   getClassess,
//   getClasses,
//   updateClasses,
//   deleteClasses,
// };
