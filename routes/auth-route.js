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
router.post("/register", registerUser); // ✅ protected by bypass secret
router.post("/login", loginUser);
router.post("/logout", authCookie, logoutUser);

// Protected routes (require authentication)
router.get("/users", authCookie, getUsers);
router.get("/users/:id", authCookie, getUser);
router.put("/users/:id", authCookie, updateUser);
router.delete("/users/:id", authCookie, deleteUser);

module.exports = router;