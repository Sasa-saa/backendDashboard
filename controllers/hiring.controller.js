const Hiring = require("../models/hiring.model");

// Create a new hiring record
const createHiring = async (req, res) => {
  try {
    const { name} = req.body;

    const newHiring = await Hiring.create({
      name,
    });

    if (!newHiring) {
      return res.status(400).json({
        success: false,
        message: "Cannot create a new hiring record",
      });
    }

    res.status(201).json({
      success: true,
      message: "New hiring record created successfully",
      data: newHiring,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the hiring record",
    });
  }
};

// Get all hiring records
const getHirings = async (req, res) => {
  try {
    const hirings = await Hiring.find({});

    if (hirings.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No hiring records found",
        data: hirings,
      });
    }

    res.status(200).json({
      success: true,
      message: "Hiring records retrieved successfully",
      data: hirings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving hiring records",
    });
  }
};

// Get a single hiring record
const getHiring = async (req, res) => {
  try {
    const { id } = req.params;

    const hiring = await Hiring.findById(id);

    if (!hiring) {
      return res.status(404).json({
        success: false,
        message: "Hiring record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Hiring record retrieved successfully",
      data: hiring,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the hiring record",
    });
  }
};

// Update a hiring record
const updateHiring = async (req, res) => {
  try {
    const { id } = req.params;
    const { position, department, status, candidateName, dateApplied } = req.body;

    const updatedHiring = await Hiring.findByIdAndUpdate(
      id,
      { position, department, status, candidateName, dateApplied },
      { returnDocument: "after" }
    );

    if (!updatedHiring) {
      return res.status(404).json({
        success: false,
        message: "Hiring record not found or could not be updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "Hiring record updated successfully",
      data: updatedHiring,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the hiring record",
    });
  }
};

// Delete a hiring record
const deleteHiring = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedHiring = await Hiring.findByIdAndDelete(id);

    if (!deletedHiring) {
      return res.status(404).json({
        success: false,
        message: "Hiring record not found or could not be deleted",
      });
    }

    res.status(200).json({
      success: true,
      message: "Hiring record deleted successfully",
      data: deletedHiring,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the hiring record",
    });
  }
};

module.exports = {
  createHiring,
  getHirings,
  getHiring,
  updateHiring,
  deleteHiring,
};