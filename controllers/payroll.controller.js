const Payroll = require("../models/payroll.model");

// Create a new payroll record
const createPayroll = async (req, res) => {
  try {
    const { name} = req.body;

    const newPayroll = await Payroll.create({
      name,
    });

    if (!newPayroll) {
      return res.status(400).json({
        success: false,
        message: "Cannot create a new payroll record",
      });
    }

    res.status(201).json({
      success: true,
      message: "New payroll record created successfully",
      data: newPayroll,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the payroll record",
    });
  }
};

// Get all payroll records
const getPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find({});

    if (payrolls.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No payroll records found",
        data: payrolls,
      });
    }

    res.status(200).json({
      success: true,
      message: "Payroll records retrieved successfully",
      data: payrolls,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving payroll records",
    });
  }
};

// Get a single payroll record
const getPayroll = async (req, res) => {
  try {
    const { id } = req.params;

    const payroll = await Payroll.findById(id);

    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: "Payroll record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payroll record retrieved successfully",
      data: payroll,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the payroll record",
    });
  }
};

// Update a payroll record
const updatePayroll = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedPayroll = await Payroll.findByIdAndUpdate(
      id,
      { name },
      { returnDocument: "after" }
    );

    if (!updatedPayroll) {
      return res.status(404).json({
        success: false,
        message: "Payroll record not found or could not be updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payroll record updated successfully",
      data: updatedPayroll,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the payroll record",
    });
  }
};

// Delete a payroll record
const deletePayroll = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPayroll = await Payroll.findByIdAndDelete(id);

    if (!deletedPayroll) {
      return res.status(404).json({
        success: false,
        message: "Payroll record not found or could not be deleted",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payroll record deleted successfully",
      data: deletedPayroll,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the payroll record",
    });
  }
};

module.exports = {
  createPayroll,
  getPayrolls,
  getPayroll,
  updatePayroll,
  deletePayroll,
};