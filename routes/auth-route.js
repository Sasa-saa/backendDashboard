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

// const { authMiddleware, authCookie } = require("../middleware/auth.middleware");

// // Public routes
// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.post("/logout", logoutUser);

// // Protected routes (require authentication)
// router.get("/users", authMiddleware, getUsers);
// router.get("/users/:id", authMiddleware, getUser);
// router.put("/users/:id", authMiddleware, updateUser);
// router.delete("/users/:id", authMiddleware, deleteUser);

// module.exports = router;


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
const automationBypass = require("../middleware/automationBypass"); // import bypass middleware

// Public routes
router.post("/register", automationBypass, registerUser); // ✅ protected by bypass secret
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Protected routes (require authentication)
router.get("/users", authMiddleware, getUsers);
router.get("/users/:id", authMiddleware, getUser);
router.put("/users/:id", authMiddleware, updateUser);
router.delete("/users/:id", authMiddleware, deleteUser);

module.exports = router;
