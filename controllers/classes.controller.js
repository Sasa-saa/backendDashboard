// const Classes = require("../models/classes.model");

// // Create a new Classes record
// const createClasses = async (req, res) => {
//   try {
//     const { id, avatar, name, email, date, amount, tax, tags, status } = req.body;

//     const newClasses = await Classes.create({
//       id,
//       avatar,
//       name,
//       email,
//       date,
//       amount,
//       tax,
//       tags,
//       status,
//     });

//     if (!newClasses) {
//       return res.status(400).json({
//         success: false,
//         message: "Cannot create a new Classes record",
//       });
//     }

//     res.status(201).json({
//       success: true,
//       message: "New Classes record created successfully",
//       data: newClasses,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while creating the Classes record",
//     });
//   }
// };

// // Get all Classes records
// const getClassess = async (req, res) => {
//   try {
//     const Classess = await Classes.find({});

//     if (Classess.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No Classes records found",
//         data: Classess,
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Classes records retrieved successfully",
//       data: Classess,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while retrieving Classes records",
//     });
//   }
// };

// // Get a single Classes record
// const getClasses = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const Classes = await Classes.findById(id);

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
//       message: "An error occurred while retrieving the Classes record",
//     });
//   }
// };

// // Update a Classes record
// const updateClasses = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { id: newId, avatar, name, email, date, amount, tax, tags, status } = req.body;

//     const updatedClasses = await Classes.findByIdAndUpdate(
//       id,
//       { name, status },
//       { returnDocument: "after" }
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
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while updating the Classes record",
//     });
//   }
// };

// // Delete a Classes record
// const deleteClasses = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedClasses = await Classes.findByIdAndDelete(id);

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
//       message: "An error occurred while deleting the Classes record",
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



const Classes = require("../models/classes.model");

// Helper function to determine status when missing
const computeStatus = (doc) => {
  // If status already exists and is one of the allowed values, return it
  if (doc.status && ["present", "absent", "partialPaid"].includes(doc.status)) {
    return doc.status;
  }

  // Check tags field (array of strings)
  if (doc.tags && Array.isArray(doc.tags)) {
    const lowerTags = doc.tags.map(t => t.toLowerCase());
    if (lowerTags.includes("present")) return "present";
    if (lowerTags.includes("absent")) return "absent";
    if (lowerTags.includes("partialpaid") || lowerTags.includes("partialPaid")) return "partialPaid";
  }

  // If we have amount and tax, use them for a simple rule
  if (typeof doc.amount === "number") {
    if (doc.amount === 0) return "absent";
    // Example: if amount >= tax (or > 0) treat as present
    // Adjust condition to your needs
    if (doc.amount > 0) return "present";
  }

  // Final fallback
  return "present";
};

// Create a new Classes record
const createClasses = async (req, res) => {
  try {
    const { id, avatar, name, email, date, amount, tax, tags, status } = req.body;

    const newClasses = await Classes.create({
      id,
      avatar,
      name,
      email,
      date,
      amount,
      tax,
      tags,
      status,
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

// Get all Classes records (FIXED: adds status to any missing document)
const getClassess = async (req, res) => {
  try {
    let classesDocs = await Classes.find({});

    // Add status field to every document that lacks it
    classesDocs = classesDocs.map(doc => {
      const obj = doc.toObject();
      if (!obj.status || !["present", "absent", "partialPaid"].includes(obj.status)) {
        obj.status = computeStatus(obj);
      }
      return obj;
    });

    if (classesDocs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Classes records found",
        data: classesDocs,
      });
    }

    res.status(200).json({
      success: true,
      message: "Classes records retrieved successfully",
      data: classesDocs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving Classes records",
    });
  }
};

// Get a single Classes record (also ensures status exists)
const getClasses = async (req, res) => {
  try {
    const { id } = req.params;

    const classDoc = await Classes.findById(id);

    if (!classDoc) {
      return res.status(404).json({
        success: false,
        message: "Classes record not found",
      });
    }

    let result = classDoc.toObject();
    if (!result.status || !["present", "absent", "partialPaid"].includes(result.status)) {
      result.status = computeStatus(result);
    }

    res.status(200).json({
      success: true,
      message: "Classes record retrieved successfully",
      data: result,
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
    const { id: newId, avatar, name, email, date, amount, tax, tags, status } = req.body;

    // Build update object dynamically (allows updating any field)
    const updateFields = {};
    if (newId !== undefined) updateFields.id = newId;
    if (avatar !== undefined) updateFields.avatar = avatar;
    if (name !== undefined) updateFields.name = name;
    if (email !== undefined) updateFields.email = email;
    if (date !== undefined) updateFields.date = date;
    if (amount !== undefined) updateFields.amount = amount;
    if (tax !== undefined) updateFields.tax = tax;
    if (tags !== undefined) updateFields.tags = tags;
    if (status !== undefined) updateFields.status = status;

    const updatedClasses = await Classes.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true } // 'new' returns updated doc, 'runValidators' ensures schema rules
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