// const userAuth = require("../models/auth.model");

// // Create a user route
// const registerUser = async (req, res) => {
//   try {
//     const { name } = req.body;

//     const newlyCreatedUser = await userAuth.create({
//       name,
//     });

//     if (!newlyCreatedUser) {
//       return res.status(400).json({
//         success: false,
//         message: "Cannot create a new user",
//       });
//     }

//     res.status(201).json({
//       success: true,
//       message: "New user was created successfully",
//       data: newlyCreatedUser,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while creating the user",
//     });
//   }
// };

// // Get all users route
// const getUsers = async (req, res) => {
//   try {
//     // Get all users
//     const allUsers = await userAuth.find({});

//     if (allUsers.length === 0) {
//       res.status(404).json({
//         success: false,
//         message: "No user found",
//         data: allUsers,
//       });
//     } else {
//       res.status(201).json({
//         success: true,
//         message: "All users retrieved successfully",
//         data: allUsers,
//       });
//     }

//     console.log(allUsers);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while retrieving the users",
//     });
//   }
// };

// // Get a single user route
// const getUser = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const getUser = await userAuth.findById(id);

//     if (!getUser) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "User retrieved successfully",
//       data: getUser,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while retrieving the user",
//     });
//   }
// };

// // Update a user route
// const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name } = req.body;

//     const updateUser = await Book.findByIdAndUpdate(
//       id,
//       {
//         name,
//       },
//       { returnDocument: "after" },
//     );

//     if (!updateUser) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found or could not be updated",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "User updated successfully",
//       data: updateUser,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while updating the user",
//     });
//   }
// };

// // Delete a user route
// const deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deleteUser = await userAuth.findByIdAndDelete(id);

//     if (!deleteUser) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found or could not be deleted",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "User deleted successfully",
//       data: deleteUser,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while deleting the user",
//     });
//   }
// };

// module.exports = {
//   registerUser,
//   getUser,
//   updateUser,
//   getUsers,
//   deleteUser,
// };

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userAuth = require("../models/auth.model");

// Create a user route
const registerUser = async (req, res) => {
  try {
    const {  email, username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newlyCreatedUser = await userAuth.create({
      email,
      username,
      password: hashedPassword,
    });

    if (!newlyCreatedUser) {
      return res.status(400).json({
        success: false,
        message: "Cannot create a new user",
      });
    }

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



// // Unified login route with role check
// const loginUser = async (req, res) => {
//   try {
//     const { email, password, role } = req.body; 
//     // role will be passed from frontend when user clicks Teacher or Student button

//     // Check if user exists
//     const user = await userAuth.findOne({ email, role }); 
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: `No ${role} account found with this email`,
//       });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid credentials",
//       });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     // Store token in cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "development",
//       sameSite: "strict",
//       maxAge: 60 * 60 * 1000, // 1 hour
//     });

//     // Respond differently based on role
//     if (role === "teacher") {
//       return res.status(200).json({
//         success: true,
//         message: "Teacher login successful",
//         data: user,
//       });
//     } else if (role === "student") {
//       return res.status(200).json({
//         success: true,
//         message: "Student login successful",
//         data: user,
//       });
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid role selected",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred during login",
//     });
//   }
// };

// with cookies
// Login / Sign-in route
const loginUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Check if user exists
    const user = await userAuth.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: user,
      token  
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred during login",
    });
  }
};



// Login / Sign-in route without cookies (using localStorage on client)
// // Login / Sign-in route with cookies
// const loginUser = async (req, res) => {
//   try {
//     const { email, username, password } = req.body;

//     // Check if user exists
//     const user = await userAuth.findOne({ email });
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid credentials",
//       });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     // Store token in HTTP-only cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production", // only https in production
//       sameSite: "strict",
//       maxAge: 60 * 60 * 1000, // 1 hour
//     });

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       data: user,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred during login",
//     });
//   }
// };





// // Logout route
// const logoutUser = async (req, res) => {
//   try {
//     // If using cookies, clear the cookie
//     res.clearCookie("token");

//     // If using localStorage on client, just instruct client to remove token
//     res.status(200).json({
//       success: true,
//       message: "User logged out successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred during logout",
//     });
//   }
// };

// Logout route
const logoutUser = async (req, res) => {
  try {
    // If you’re storing JWT in cookies:
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // If you’re storing JWT in localStorage on the client,
    // just send a success response and let the client remove it.
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred during logout",
    });
  }
};

// BLACKLIST TOKEN APPROACH (optional, if you want to implement token invalidation on logout)
// const tokenBlacklist = [];

// const logoutUser = async (req, res) => {
//   try {
//     const token = req.headers["authorization"]?.split(" ")[1];
//     if (token) {
//       tokenBlacklist.push(token); // store invalidated token
//     }

//     res.status(200).json({
//       success: true,
//       message: "User logged out successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred during logout",
//     });
//   }
// };

// Get all users route
const getUsers = async (req, res) => {
  try {
    // Get all users
    const allUsers = await userAuth.find({});

    if (allUsers.length === 0) {
      res.status(404).json({
        success: false,
        message: "No user found",
        data: allUsers,
      });
    } else {
      res.status(201).json({
        success: true,
        message: "All users retrieved successfully",
        data: allUsers,
      });
    }

    console.log(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the users",
    });
  }
};

// Get a single user route
const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const getUser = await userAuth.findById(id);

    if (!getUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: getUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the user",
    });
  }
};

// Update a user route
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, role } = req.body;

    const updateUser = await Book.findByIdAndUpdate(
      id,
      {
        username,
        email,
        password,
        role,
      },
      { returnDocument: "after" },
    );

    if (!updateUser) {
      return res.status(404).json({
        success: false,
        message: "User not found or could not be updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updateUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the user",
    });
  }
};

// Delete a user route
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteUser = await userAuth.findByIdAndDelete(id);

    if (!deleteUser) {
      return res.status(404).json({
        success: false,
        message: "User not found or could not be deleted",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deleteUser,
    });
  } catch (error) {
    console.error(error);
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
  getUser,
  updateUser,
  getUsers,
  deleteUser,
};
