// require("dotenv").config();
// require("./config/connectdb");
// const express = require("express");
// const cors = require("cors");

// const attendanceRouter = require("./routes/attendance-route");
// const authRouter = require("./routes/auth-route");
// const classesRouter = require("./routes/classes-route");
// const statsRouter = require("./routes/stats-route");

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(express.json());

// // ✅ CORS Configuration - Compatible with Express 5
// const allowedOrigins = ["http://localhost:5173"];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Allow requests with no origin (like mobile apps or curl)
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error("CORS policy: This origin is not allowed."));
//       }
//     },
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     credentials: true,
//   }),
// );

// // 🧪 (Optional) Logging middleware for debugging
// app.use((req, res, next) => {
//   console.log(
//     `${req.method} ${req.path} - Origin: ${req.headers.origin || "none"}`,
//   );
//   next();
// });

// // Routes
// app.use("/api/attendance", attendanceRouter);
// app.use("/api/auth", authRouter);
// app.use("/api/classes", classesRouter);
// app.use("/api/stats", statsRouter);

// // Home route
// app.get("/", (req, res) => {
//   res.send("Welcome to dashboard!");
// });

// // For local development
// if (process.env.NODE_ENV !== "production") {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port http://localhost:${PORT}`);
//   });
// }

// // ✅ For Vercel deployment
// module.exports = app;



require("dotenv").config();
const connectDb = require("./config/connectdb"); // now a function
const express = require("express");
const cors = require("cors");

const attendanceRouter = require("./routes/attendance-route");
const authRouter = require("./routes/auth-route");
const classesRouter = require("./routes/classes-route");
const statsRouter = require("./routes/stats-route");

// Start connection in background (cached promise) – does not block
connectDb().catch(console.error);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// CORS Configuration
const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy: This origin is not allowed."));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

// Optional logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Origin: ${req.headers.origin || "none"}`);
  next();
});

// Routes
app.use("/api/attendance", attendanceRouter);
app.use("/api/auth", authRouter);
app.use("/api/classes", classesRouter);
app.use("/api/stats", statsRouter);

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to dashboard!");
});

// For local development
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
}

// For Vercel deployment
module.exports = app;