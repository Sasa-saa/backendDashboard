const jwt = require("jsonwebtoken");

// Simple cookie parser – replaces require("cookie")
const parseCookies = (cookieHeader) => {
  if (!cookieHeader) return {};
  return cookieHeader.split(";").reduce((cookies, cookie) => {
    const [name, value] = cookie.trim().split("=");
    if (name && value) cookies[name] = decodeURIComponent(value);
    return cookies;
  }, {});
};

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message:
        "Access denied. No token provided. Please log in to access this resource.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userInfo = decoded;

    if (decoded.role === "student") {
      console.log("Student authenticated");
    } else {
      console.log("Teacher authenticated");
    }

    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

const authCookie = (req, res, next) => {
  // Parse cookies without external module
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided. Unauthorized.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userInfo = decoded;

    if (decoded.role === "student") {
      console.log("Student authenticated via cookie");
    } else {
      console.log("Teacher authenticated via cookie");
    }

    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = {
  authMiddleware,
  authCookie,
};