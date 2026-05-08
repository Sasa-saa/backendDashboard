const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userAuth = require("../models/auth.model");

// Register route
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await userAuth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newlyCreatedUser = await userAuth.create({
      email,
      username,
      password: hashedPassword,
      role: role || "student", // default role if not provided
    });

    res.status(201).json({
      success: true,
      message: "New user was created successfully",
      data: newlyCreatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the user",
    });
  }
};

// Login route
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userAuth.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred during login" });
  }
};

// Logout route
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred during logout" });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const allUsers = await userAuth.find({});
    if (!allUsers.length) {
      return res.status(404).json({ success: false, message: "No users found" });
    }
    res.status(200).json({ success: true, message: "Users retrieved successfully", data: allUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred while retrieving users" });
  }
};

// Get single user
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userAuth.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User retrieved successfully", data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred while retrieving the user" });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, role } = req.body;

    const updateData = { username, email, role };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await userAuth.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found or could not be updated" });
    }

    res.status(200).json({ success: true, message: "User updated successfully", data: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred while updating the user" });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userAuth.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found or could not be deleted" });
    }
    res.status(200).json({ success: true, message: "User deleted successfully", data: deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred while deleting the user" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
