// dashboard.controller.js
const Dashboard = require("../models/dashboard.model");

// Create a dashboard route
const createDashboard = async (req, res) => {
  try {
    const { name } = req.body;

    const newlyCreatedDashboard = await Dashboard.create({
      name,
    });

    if (!newlyCreatedDashboard) {
      return res.status(400).json({
        success: false,
        message: "Cannot create a new dashboard",
      });
    }

    res.status(201).json({
      success: true,
      message: "New dashboard was created successfully",
      data: newlyCreatedDashboard,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the dashboard",
    });
  }
};

// Get all dashboards route
const getDashboards = async (req, res) => {
  try {
    const allDashboards = await Dashboard.find({});

    if (allDashboards.length === 0) {
      res.status(404).json({
        success: false,
        message: "No dashboard found",
        data: allDashboards,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "All dashboards retrieved successfully",
        data: allDashboards,
      });
    }

    console.log(allDashboards);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the dashboards",
    });
  }
};

// Get a single dashboard route
const getDashboard = async (req, res) => {
  try {
    const { id } = req.params;

    const dashboard = await Dashboard.findById(id);

    if (!dashboard) {
      return res.status(404).json({
        success: false,
        message: "Dashboard not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Dashboard retrieved successfully",
      data: dashboard,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the dashboard",
    });
  }
};

// Update a dashboard route
const updateDashboard = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedDashboard = await Dashboard.findByIdAndUpdate(
      id,
      { name },
      { returnDocument: "after" },
    );

    if (!updatedDashboard) {
      return res.status(404).json({
        success: false,
        message: "Dashboard not found or could not be updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "Dashboard updated successfully",
      data: updatedDashboard,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the dashboard",
    });
  }
};

// Delete a dashboard route
const deleteDashboard = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDashboard = await Dashboard.findByIdAndDelete(id);

    if (!deletedDashboard) {
      return res.status(404).json({
        success: false,
        message: "Dashboard not found or could not be deleted",
      });
    }

    res.status(200).json({
      success: true,
      message: "Dashboard deleted successfully",
      data: deletedDashboard,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the dashboard",
    });
  }
};

module.exports = {
  createDashboard,
  getDashboard,
  updateDashboard,
  getDashboards,
  deleteDashboard,
};
