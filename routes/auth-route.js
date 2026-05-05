// const express = require("express");
// const bcryptjs = require("bcryptjs");
// const UserAuth = require("../models/auth.model");
// const jwt = require("jsonwebtoken");
// const {
//   registerUser,
//   getUsers,
//   getUser,
//   updateUser,
//   deleteUser,
// } = require("../controllers/auth.controller");

// const authRouter = express.Router();

// //                               OR
// //GROUP1
// // register a user route
// authRouter.post("/register", registerUser);

// // Login user route
// authRouter.get("/login", getUsers);

// //forget password auth
// authRouter.post("/forget-password/:id", async (req, res) => {
//   try {
//     //get password from the frontend
//     const { password } = req.body;
//     const { id } = req.params;

//     //add to database
//     const user = await UserAuth.findById(id).exec();

//     if (!user) {
//       return res.status(400).json({
//         message: "User not found",
//       });
//     }

//     //hash the password
//     const salt = await bcryptjs.genSalt(10);
//     const hashedPassword = await bcryptjs.hash(password, salt);

//     user.password = hashedPassword;

//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "Your password has been changed!",
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "the server encountered an unexpected error",
//     });
//   }
// });

// //GROUP2
// // Get a single user route
// authRouter.get("/:id", getUser);

// // Update a user route
// authRouter.put("/update-user/:id", updateUser);

// // Delete a user route
// authRouter.delete("/delete-user/:id", deleteUser);

// module.exports = authRouter;

// authRouter.post("/register", async (req, res) => {
//   try {
//     //getting the user information from the request body
//     const { username, email, password, role } = req.body;

//     //check if the user is already existing in database
//     const checkExistingUser = await UserAuth.findOne({
//       $or: [{ username, email }],
//     }).exec();

//     if (checkExistingUser) {
//       return res.status(400).json({
//         success: true,
//         message: "User already exist with same username and password",
//       });
//     }

//     //hashing user password
//     const salt = await bcryptjs.genSalt(10);
//     const hashedPassword = await bcryptjs.hash(password, salt);

//     //create a new user and save in our database- recommended way
//     const newlyUser = new UserAuth({
//       username,
//       email,
//       password: hashedPassword,
//       role: role || "user",
//     });

//     await newlyUser.save();

//     //second way of creating a new user- it saves automatically
//     // const newUser = await UserAuth.create({
//     //      username, email, password: hashedPassword, role: role || "user"
//     // })

//     if (newlyUser) {
//       return res.status(200).json({
//         success: true,
//         message: "New user created successfully",
//         data: newlyUser,
//       });
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "User not created",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "the server encountered an unexpected error",
//     });
//   }
// });

// authRouter.post("/login", async (req, res) => {
//   try {
//     //getting the user information from the request body
//     const { username, password } = req.body;

//     //check if the user is already existing in database
//     const user = await UserAuth.findOne({ $or: [{ username }] }).exec();

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "User does not exist",
//       });
//     }

//     //hashing user password
//     const isPasswordMatch = await bcryptjs.compare(password, user.password);

//     if (!isPasswordMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid password",
//       });
//     }

//     //CREATE A TOKEN
//     const token = jwt.sign(
//       { userId: user._id, username: user.username, role: user.role },
//       process.env.JWT_SECRET_KEY,
//       { expiresIn: "7d" },
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Login successful",
//       data: token,
//     });
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// });



// const express = require("express");
// const router = express.Router();
// const {
//   registerUser,
//   loginUser,
//   logoutUser,
//   getUser,
//   updateUser,
//   getUsers,
//   deleteUser,
// } = require("../controllers/auth.controller");

// // Register a new user
// router.post("/register", registerUser);

// // Login (Teacher or Student depending on role)
// router.post("/login", loginUser);

// // Logout
// router.post("/logout", logoutUser);

// // Get all users
// router.get("/users", getUsers);

// // Get a single user by ID
// router.get("/users/:id", getUser);

// // Update a user by ID
// router.put("/users/:id", updateUser);

// // Delete a user by ID
// router.delete("/users/:id", deleteUser);

// module.exports = authRouter;




const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  getUsers,
  deleteUser,
} = require("../controllers/auth.controller");

const { authMiddleware, authCookie } = require("../middleware/auth.middleware");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Protected routes (require authentication)
router.get("/users", authMiddleware, getUsers);
router.get("/users/:id", authMiddleware, getUser);
router.put("/users/:id", authMiddleware, updateUser);
router.delete("/users/:id", authMiddleware, deleteUser);

module.exports = router;
