const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const userAuth = require("../models/auth.model");
const userMailer = require("../models/mailer.model");
const connectDb = require("../config/connectdb");

// Helper to ensure DB connection (reuses cached connection)
const ensureDb = async () => {
  await connectDb();
};

// Register route
const registerUser = async (req, res) => {
  try {
    await ensureDb();

    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email, and password are required",
      });
    }

    const existingEmail = await userAuth.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    }

    const existingUsername = await userAuth.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already taken",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newlyCreatedUser = await userAuth.create({
      email,
      username,
      password: hashedPassword,
      role: role || "student",
    });

    const userResponse = newlyCreatedUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: "New user was created successfully",
      data: userResponse,
    });
  } catch (error) {
    console.error("Registration error:", error);
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `${field} already exists`,
      });
    }
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the user",
      ...(process.env.NODE_ENV !== "production" && { error: error.message }),
    });
  }
};

// Login route
const loginUser = async (req, res) => {
  try {
    await ensureDb();

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

    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 60 * 60 * 1000,
    });

    // Send login email (non‑blocking)
    try {
      const message = "You have successfully logged in to your account.";
      const newMailerEntry = new userMailer({
        email: user.email,
        username: user.username,
        message,
      });
      await newMailerEntry.save();

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Login Successful",
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2>Hello ${user.username},</h2>
            <p>${message}</p>
            <p>Warm regards,<br/>Your App Team</p>
          </div>
        `,
      });
      console.log("Login email sent to:", user.email);
    } catch (mailError) {
      console.error("Error sending login email:", mailError);
    }

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: userResponse,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "An error occurred during login" });
  }
};

// Logout route
const logoutUser = async (req, res) => {
  try {
    await ensureDb(); // optional, but harmless
    const isProduction = process.env.NODE_ENV === "production";
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });
    res.status(200).json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ success: false, message: "An error occurred during logout" });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    await ensureDb();
    const allUsers = await userAuth.find({});
    if (!allUsers.length) {
      return res.status(404).json({ success: false, message: "No users found" });
    }
    // Remove passwords from each user
    const usersWithoutPassword = allUsers.map(user => {
      const u = user.toObject();
      delete u.password;
      return u;
    });
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: usersWithoutPassword,
    });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving users",
    });
  }
};

// Get single user
const getUser = async (req, res) => {
  try {
    await ensureDb();
    const { id } = req.params;
    const user = await userAuth.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const userResponse = user.toObject();
    delete userResponse.password;
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: userResponse,
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the user",
    });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    await ensureDb();
    const { id } = req.params;
    const { username, email, password, role } = req.body;

    const updateData = { username, email, role };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await userAuth.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found or could not be updated",
      });
    }

    const userResponse = updatedUser.toObject();
    delete userResponse.password;

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: userResponse,
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the user",
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    await ensureDb();
    const { id } = req.params;
    const deletedUser = await userAuth.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found or could not be deleted",
      });
    }
    const userResponse = deletedUser.toObject();
    delete userResponse.password;
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: userResponse,
    });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the user",
    });
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