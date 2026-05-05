// const jwt = require('jsonwebtoken')

// const authMiddleware = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     console.log(authHeader)
//     const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the "Bearer <token>" format

//     if (!token) {
//         return res.status(401).json({
//             success: false, 
//             message: 'Access denied. No token provided. Please log in to access this resource.' 
//         });
//     }

//     try {
//         const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);

//         const userDetail = jwtDecode(decodedTokenInfo)
//         req.userInfo = userDetail; // Attach the decoded token information to the request object for later use

//         console.log(userDetail)

//         next(); // Proceed to the next middleware or route handler
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: 'Internal server error. Failed to authenticate token.'
//         });
//     }
// }

// const authCookie = (req, res, next) => {
//     const token = req.cookies.accessToken;

//     if(!token) {
//         return res.status(401).json({
//             success: false, 
//             message: 'Access denied. No token provided. Unauthorized.' 
//         });
//     }

//     try {
//         const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
//         res.json({
//             message: "Welcome",
//             user: decode
//         })
//     } catch (error) {
//         res.status(403).json({
//             message: 'Invalid or expired token'
//         })
//     }
// }

// module.exports = {
//     authMiddleware,
//     authCookie
// }


const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided. Please log in to access this resource.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Attach decoded info to request
    req.userInfo = decoded;

    // Role-based branching
    if (decoded.role === "student") {
      console.log("Student authenticated");
      // You can add student-specific checks or permissions here
    } else {
      console.log("Teacher authenticated");
      // You can add teacher-specific checks or permissions here
    }

    next(); // Continue to the route handler
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

const authCookie = (req, res, next) => {
  const token = req.cookies.token;

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
      message: "Invalid or expired token",
    });
  }
};

module.exports = {
  authMiddleware,
  authCookie,
};
