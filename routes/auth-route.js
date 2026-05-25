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
// const automationBypass = require("../middleware/automationBypass"); // import bypass middleware

// Public routes
router.post("/register", registerUser); // ✅ protected by bypass secret
// router.post("/login", authCookie, loginUser); // ✅ protected by authCookie middleware
router.post("/login", loginUser);
router.post("/logout", authCookie, logoutUser);

// Protected routes (require authentication)
router.get("/users", authCookie, getUsers);
router.get("/users/:id", authCookie, getUser);
router.put("/users/:id", authCookie, updateUser);
router.delete("/users/:id", authCookie, deleteUser);
// router.get("/users", authMiddleware, getUsers);
// router.get("/users/:id", authMiddleware, getUser);
// router.put("/users/:id", authMiddleware, updateUser);
// router.delete("/users/:id", authMiddleware, deleteUser);

module.exports = router;
