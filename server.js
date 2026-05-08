require("dotenv").config();
require("./config/connectdb");
const attendanceRouter = require("./routes/attendance-route");
const dashboardRouter = require("./routes/dashboard-route");
const employeesRouter = require("./routes/employees-route");
const hiringRouter = require("./routes/hiring-route");
const authRouter = require("./routes/auth-route");
const payrollRouter = require("./routes/payroll-route");
const projectsRouter = require("./routes/projects-route");
const classesRouter = require("./routes/classes-route");
const statsRouter = require("./routes/stats-route");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use("/api/attendance", attendanceRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/employees", employeesRouter);
app.use("/api/hiring", hiringRouter);
app.use("/api/auth", authRouter);
app.use("/api/payroll", payrollRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/classes", classesRouter);
app.use("/api/stats", statsRouter);

// Example for Express
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

//home route
app.get("/", (req, res) => {
  res.send("Welcome to dashboard!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
