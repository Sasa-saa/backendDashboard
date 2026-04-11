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





const userAuth = require("../models/auth.model");

// Create a user route
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const newlyCreatedUser = await userAuth.create({
      username,
      email,
      password,
      role,
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
  getUser,
  updateUser,
  getUsers,
  deleteUser,
};
