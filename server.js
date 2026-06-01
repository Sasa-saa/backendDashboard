// require("dotenv").config();
// const connectDb = require("./config/connectdb");
// const express = require("express");
// const cors = require("cors");
// const { addClient, removeClient, broadcastUpdate } = require("./utils/sse"); // ✅ import broadcastUpdate too

// const attendanceRouter = require("./routes/attendance-route");
// const authRouter = require("./routes/auth-route");
// const classesRouter = require("./routes/classes-route");
// const statsRouter = require("./routes/stats-route");

// // Start DB connection
// connectDb().catch(console.error);

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(express.json());

// // CORS Configuration
// const allowedOrigins = ['https://sasiffer-dashboard.vercel.app', 'http://localhost:5173'];
// app.use(
//   cors({
//     origin: function (origin, callback) {
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

// // Logging middleware
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.path} - Origin: ${req.headers.origin || "none"}`);
//   next();
// });

// // Routes
// app.use("/api/attendance", attendanceRouter);
// app.use("/attendance", attendanceRouter);
// app.use("/api/auth", authRouter);
// app.use("/auth", authRouter);
// app.use("/api/classes", classesRouter);
// app.use("/classes", classesRouter);
// app.use("/api/stats", statsRouter);
// app.use("/stats", statsRouter);

// // Home route
// app.get("/", (req, res) => {
//   res.send("Welcome to dashboard!");
// });

// // 🔥 SSE Setup
// app.get("/events", (req, res) => {
//   res.setHeader("Content-Type", "text/event-stream");
//   res.setHeader("Cache-Control", "no-cache");
//   res.setHeader("Connection", "keep-alive");

//   addClient(res);

//   res.write(`data: ${JSON.stringify({ message: "Connected to SSE" })}\n\n`);

//   req.on("close", () => {
//     removeClient(res);
//     res.end();
//   });
// });

// // Local dev
// if (process.env.NODE_ENV !== "production") {
//   app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
//   });
// }

// // For Vercel deployment
// module.exports = app;





// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const { addClient, removeClient } = require("./utils/sse");

// const attendanceRouter = require("./routes/attendance-route");
// const authRouter = require("./routes/auth-route");
// const classesRouter = require("./routes/classes-route");
// const statsRouter = require("./routes/stats-route");

// const app = express();
// const PORT = process.env.PORT || 5000;

// // ========== MIDDLEWARE (order matters) ==========
// app.use(express.json()); // must be before routes

// // CORS Configuration
// const allowedOrigins = [
//   'https://sasiffer-dashboard.vercel.app',
//   'http://localhost:5173'
// ];
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error("CORS policy: This origin is not allowed."));
//       }
//     },
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     credentials: true,
//   })
// );

// // Logging middleware (helpful for debugging)
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.path} - Origin: ${req.headers.origin || "none"}`);
//   next();
// });

// // ========== HEALTH / DEBUG ROUTES ==========
// app.get("/ping", (req, res) => res.json({ pong: true, timestamp: Date.now() }));

// // ========== API ROUTES ==========
// app.use("/api/attendance", attendanceRouter);
// app.use("/attendance", attendanceRouter);
// app.use("/api/auth", authRouter);
// app.use("/auth", authRouter);
// app.use("/api/classes", classesRouter);
// app.use("/classes", classesRouter);
// app.use("/api/stats", statsRouter);
// app.use("/stats", statsRouter);

// // ========== SSE STREAM ==========
// app.get("/events", (req, res) => {
//   res.setHeader("Content-Type", "text/event-stream");
//   res.setHeader("Cache-Control", "no-cache");
//   res.setHeader("Connection", "keep-alive");
//   addClient(res);
//   res.write(`data: ${JSON.stringify({ message: "Connected to SSE" })}\n\n`);
//   req.on("close", () => {
//     removeClient(res);
//     res.end();
//   });
// });

// // ========== HOME & CATCH‑ALL ==========
// app.get("/", (req, res) => {
//   res.send("Welcome to dashboard!");
// });

// // Catch-all for debugging (returns 404 with available routes)
// app.use("*", (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Route ${req.method} ${req.path} not found`,
//     availableRoutes: [
//       "GET /ping",
//       "GET /",
//       "POST /api/auth/login",
//       "POST /api/auth/register",
//       "GET /events",
//       "GET /api/attendance",
//       "GET /api/classes",
//       "GET /api/stats"
//     ]
//   });
// });

// // ========== INITIALIZE DATABASE (lazy, not blocking startup) ==========
// const connectDb = require("./config/connectdb");
// // Do NOT await here – let the first request trigger the connection
// connectDb().catch(err => console.error("Initial DB connection error:", err));

// // ========== EXPORT FOR VERCEL ==========
// module.exports = app;

// // Local dev server (only when not on Vercel)
// if (process.env.NODE_ENV !== "production") {
//   app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
//   });
// }




// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const { addClient, removeClient } = require("./utils/sse");

// const attendanceRouter = require("./routes/attendance-route");
// const authRouter = require("./routes/auth-route");
// const classesRouter = require("./routes/classes-route");
// const statsRouter = require("./routes/stats-route");

// const app = express();
// const PORT = process.env.PORT || 5000;

// // ========== MIDDLEWARE (order matters) ==========
// app.use(express.json()); // must be before routes

// // CORS Configuration
// const allowedOrigins = [
//   'https://sasiffer-dashboard.vercel.app',
//   'http://localhost:5173'
// ];
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error("CORS policy: This origin is not allowed."));
//       }
//     },
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     credentials: true,
//   })
// );

// // Logging middleware (helpful for debugging)
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.path} - Origin: ${req.headers.origin || "none"}`);
//   next();
// });

// // ========== HEALTH / DEBUG ROUTES ==========
// app.get("/ping", (req, res) => res.json({ pong: true, timestamp: Date.now() }));

// // ========== API ROUTES ==========
// app.use("/api/attendance", attendanceRouter);
// app.use("/attendance", attendanceRouter);
// app.use("/api/auth", authRouter);
// app.use("/auth", authRouter);
// app.use("/api/classes", classesRouter);
// app.use("/classes", classesRouter);
// app.use("/api/stats", statsRouter);
// app.use("/stats", statsRouter);

// // ========== SSE STREAM ==========
// app.get("/events", (req, res) => {
//   res.setHeader("Content-Type", "text/event-stream");
//   res.setHeader("Cache-Control", "no-cache");
//   res.setHeader("Connection", "keep-alive");
//   addClient(res);
//   res.write(`data: ${JSON.stringify({ message: "Connected to SSE" })}\n\n`);
//   req.on("close", () => {
//     removeClient(res);
//     res.end();
//   });
// });

// // ========== HOME ==========
// app.get("/", (req, res) => {
//   res.send("Welcome to dashboard!");
// });

// // ========== CATCH‑ALL (must be last) ==========
// // ✅ FIXED: use '/*' instead of '*' for Express 5 compatibility
// app.use("/*", (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Route ${req.method} ${req.path} not found`,
//     availableRoutes: [
//       "GET /ping",
//       "GET /",
//       "POST /api/auth/login",
//       "POST /api/auth/register",
//       "GET /events",
//       "GET /api/attendance",
//       "GET /api/classes",
//       "GET /api/stats"
//     ]
//   });
// });

// // ========== INITIALIZE DATABASE (lazy, non‑blocking) ==========
// const connectDb = require("./config/connectdb");
// connectDb().catch(err => console.error("Initial DB connection error:", err));

// // ========== EXPORT FOR VERCEL ==========
// module.exports = app;

// // Local dev server (only when not on Vercel)
// if (process.env.NODE_ENV !== "production") {
//   app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
//   });
// }




require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { addClient, removeClient } = require("./utils/sse");

const attendanceRouter = require("./routes/attendance-route");
const authRouter = require("./routes/auth-route");
const classesRouter = require("./routes/classes-route");
const statsRouter = require("./routes/stats-route");

const app = express();
const PORT = process.env.PORT || 5000;

// ========== MIDDLEWARE (order matters) ==========
app.use(express.json());

// CORS Configuration
const allowedOrigins = [
  'https://sasiffer-dashboard.vercel.app',
  'http://localhost:5173'
];
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
  })
);

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Origin: ${req.headers.origin || "none"}`);
  next();
});


// DIRECT TEST – bypasses authRouter entirely
app.post("/api/auth/login-direct", (req, res) => {
  res.json({ message: "Direct login route works" });
});

// ========== HEALTH / DEBUG ROUTES ==========
app.get("/ping", (req, res) => res.json({ pong: true, timestamp: Date.now() }));

// ========== API ROUTES ==========
app.use("/api/attendance", attendanceRouter);
app.use("/attendance", attendanceRouter);
app.use("/api/auth", authRouter);
app.use("/auth", authRouter);
app.use("/api/classes", classesRouter);
app.use("/classes", classesRouter);
app.use("/api/stats", statsRouter);
app.use("/stats", statsRouter);

// ========== SSE STREAM ==========
app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  addClient(res);
  res.write(`data: ${JSON.stringify({ message: "Connected to SSE" })}\n\n`);
  req.on("close", () => {
    removeClient(res);
    res.end();
  });
});

// ========== HOME ==========
app.get("/", (req, res) => {
  res.send("Welcome to dashboard!");
});

// ========== CATCH‑ALL 404 HANDLER (no pattern, just middleware) ==========
// ✅ This works with Express 5 – placed after all legitimate routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
    availableRoutes: [
      "GET /ping",
      "GET /",
      "POST /api/auth/login",
      "POST /api/auth/register",
      "GET /events",
      "GET /api/attendance",
      "GET /api/classes",
      "GET /api/stats"
    ]
  });
});

// ========== INITIALIZE DATABASE (lazy, non‑blocking) ==========
const connectDb = require("./config/connectdb");
connectDb().catch(err => console.error("Initial DB connection error:", err));

// ========== EXPORT FOR VERCEL ==========
module.exports = app;

// Local dev server (only when not on Vercel)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}