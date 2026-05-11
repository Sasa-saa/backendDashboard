// require("dotenv").config();
// require("./config/connectdb");
// const attendanceRouter = require("./routes/attendance-route");
// const dashboardRouter = require("./routes/dashboard-route");
// const employeesRouter = require("./routes/employees-route");
// const hiringRouter = require("./routes/hiring-route");
// const authRouter = require("./routes/auth-route");
// const payrollRouter = require("./routes/payroll-route");
// const projectsRouter = require("./routes/projects-route");
// const classesRouter = require("./routes/classes-route");
// const statsRouter = require("./routes/stats-route");
// const express = require("express");
// const app = express();
// const cors = require("cors");
// const PORT = process.env.PORT || 5000;

// //middleware
// app.use(express.json());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   }),
// );
// app.use("/api/attendance", attendanceRouter);
// app.use("/api/dashboard", dashboardRouter);
// app.use("/api/employees", employeesRouter);
// app.use("/api/hiring", hiringRouter);
// app.use("/api/auth", authRouter);
// app.use("/api/payroll", payrollRouter);
// app.use("/api/projects", projectsRouter);
// app.use("/api/classes", classesRouter);
// app.use("/api/stats", statsRouter);

// // Example for Express
// app.options("*", (req, res) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.sendStatus(200);
// });

// //home route
// app.get("/", (req, res) => {
//   res.send("Welcome to dashboard!");
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port http://localhost:${PORT}`);
// });

// require("dotenv").config();
// require("./config/connectdb");
// const express = require("express");
// const cors = require("cors");

// const attendanceRouter = require("./routes/attendance-route");
// const dashboardRouter = require("./routes/dashboard-route");
// const employeesRouter = require("./routes/employees-route");
// const hiringRouter = require("./routes/hiring-route");
// const authRouter = require("./routes/auth-route");
// const payrollRouter = require("./routes/payroll-route");
// const projectsRouter = require("./routes/projects-route");
// const classesRouter = require("./routes/classes-route");
// const statsRouter = require("./routes/stats-route");
// // const automationBypass = require("./middleware/automationBypass");

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(express.json());

// // ✅ Allow both localhost and your deployed frontend domain
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://backend-dashboard-sigma-pearl.vercel.app" // replace with your actual Vercel frontend URL
// ];

// app.use(cors({
//   origin: allowedOrigins,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   credentials: true,
// }));

// // Routes
// app.use("/api/attendance", attendanceRouter);
// app.use("/api/dashboard", dashboardRouter);
// app.use("/api/employees", employeesRouter);
// app.use("/api/hiring", hiringRouter);
// app.use("/api/auth", authRouter);
// app.use("/api/payroll", payrollRouter);
// app.use("/api/projects", projectsRouter);
// app.use("/api/classes", classesRouter);
// app.use("/api/stats", statsRouter);

// // Home route
// app.get("/", (req, res) => {
//   res.send("Welcome to dashboard!");
// });

// // Protect a specific route
// // app.post("/api/internal-task", automationBypass, (req, res) => {
// //   res.json({ success: true, message: "Internal task executed" });
// // });

// // app.listen(PORT, () => {
// //   console.log(`Server is running on port http://localhost:${PORT}`);
// // });

// // ✅ Add this instead
// module.exports = app;

// require("dotenv").config();
// require("./config/connectdb");
// const express = require("express");
// const cors = require("cors");

// const attendanceRouter = require("./routes/attendance-route");
// const dashboardRouter = require("./routes/dashboard-route");
// const employeesRouter = require("./routes/employees-route");
// const hiringRouter = require("./routes/hiring-route");
// const authRouter = require("./routes/auth-route");
// const payrollRouter = require("./routes/payroll-route");
// const projectsRouter = require("./routes/projects-route");
// const classesRouter = require("./routes/classes-route");
// const statsRouter = require("./routes/stats-route");

// const app = express();

// // Middleware
// app.use(express.json());

// // ---------------------- CORS CONFIGURATION (Vercel‑friendly) ----------------------
// // Allowed origins (replace the second one with your actual frontend URL if different)
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://your-frontend-domain.vercel.app",   // <-- CHANGE THIS to your frontend URL
// ];

// // Dynamic origin function to handle preflight and actual requests
// const corsOptions = {
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like mobile apps, curl, server-to-server)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("CORS policy: This origin is not allowed."));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   credentials: true,   // if you need cookies / authorization headers
// };

// // Apply CORS middleware globally
// app.use(cors(corsOptions));

// // Explicitly handle preflight requests for all routes (critical for Vercel)
// app.options("*", cors(corsOptions));

// // (Optional) Logging middleware to see CORS requests in Vercel logs
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.path} - Origin: ${req.headers.origin || "none"}`);
//   next();
// });
// // -------------------------------------------------------------------------------

// // Routes
// app.use("/api/attendance", attendanceRouter);
// app.use("/api/dashboard", dashboardRouter);
// app.use("/api/employees", employeesRouter);
// app.use("/api/hiring", hiringRouter);
// app.use("/api/auth", authRouter);
// app.use("/api/payroll", payrollRouter);
// app.use("/api/projects", projectsRouter);
// app.use("/api/classes", classesRouter);
// app.use("/api/stats", statsRouter);

// // Home route
// app.get("/", (req, res) => {
//   res.send("Welcome to dashboard!");
// });

// module.exports = app;

require("dotenv").config();
require("./config/connectdb");
const express = require("express");
const cors = require("cors");

const attendanceRouter = require("./routes/attendance-route");
const dashboardRouter = require("./routes/dashboard-route");
const employeesRouter = require("./routes/employees-route");
const hiringRouter = require("./routes/hiring-route");
const authRouter = require("./routes/auth-route");
const payrollRouter = require("./routes/payroll-route");
const projectsRouter = require("./routes/projects-route");
const classesRouter = require("./routes/classes-route");
const statsRouter = require("./routes/stats-route");
// const automationBypass = require("./middleware/automationBypass");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// ✅ CORS Configuration - Compatible with Express 5
const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
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

// 👇 This line has been removed as it causes the error in Express 5:
// app.options('*', cors(corsOptions));

// 🧪 (Optional) Logging middleware for debugging
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.path} - Origin: ${req.headers.origin || "none"}`,
  );
  next();
});

// Routes
app.use("/api/attendance", attendanceRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/employees", employeesRouter);
app.use("/api/hiring", hiringRouter);
app.use("/api/auth", authRouter);
app.use("/api/payroll", payrollRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/classes", classesRouter);
app.use("/api/stats", statsRouter);

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to dashboard!");
});

// Protect a specific route
// app.post("/api/internal-task", automationBypass, (req, res) => {
//   res.json({ success: true, message: "Internal task executed" });
// });

// For local development
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
}

// ✅ For Vercel deployment
module.exports = app;
