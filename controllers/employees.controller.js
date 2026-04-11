const Employee = require("../models/employees.model");

// Create an employee
const createEmployee = async (req, res) => {
  try {
    const { name, position, department, email } = req.body;

    const newEmployee = await Employee.create({
      name,
      position,
      department,
      email,
    });

    if (!newEmployee) {
      return res.status(400).json({
        success: false,
        message: "Cannot create a new employee",
      });
    }

    res.status(201).json({
      success: true,
      message: "New employee created successfully",
      data: newEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the employee",
    });
  }
};

// Get all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});

    if (employees.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No employees found",
        data: employees,
      });
    }

    res.status(200).json({
      success: true,
      message: "Employees retrieved successfully",
      data: employees,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving employees",
    });
  }
};

// Get a single employee
const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee retrieved successfully",
      data: employee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the employee",
    });
  }
};

// Update an employee
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, department, email } = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, position, department, email },
      { returnDocument: "after" }
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found or could not be updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: updatedEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the employee",
    });
  }
};

// Delete an employee
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found or could not be deleted",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
      data: deletedEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the employee",
    });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};