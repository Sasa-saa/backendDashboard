const Task = require("../models/task.model");

// Create a new task record
const createTask = async (req, res) => {
  try {
    const { name} = req.body;

    const newTask = await Task.create({
      name,
    });

    if (!newTask) {
      return res.status(400).json({
        success: false,
        message: "Cannot create a new task record",
      });
    }

    res.status(201).json({
      success: true,
      message: "New task record created successfully",
      data: newTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the task record",
    });
  }
};

// Get all task records
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});

    if (tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No task records found",
        data: tasks,
      });
    }

    res.status(200).json({
      success: true,
      message: "Task records retrieved successfully",
      data: tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving task records",
    });
  }
};

// Get a single task record
const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task record retrieved successfully",
      data: task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the task record",
    });
  }
};

// Update a task record
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { name },
      { returnDocument: "after" }
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task record not found or could not be updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task record updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the task record",
    });
  }
};

// Delete a task record
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task record not found or could not be deleted",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task record deleted successfully",
      data: deletedTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the task record",
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};