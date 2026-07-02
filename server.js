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

// ========== MIDDLEWARE ==========
app.use(express.json());

// CORS Configuration
// const allowedOrigins = ["https://sasiffer-dashboard.vercel.app", "*"];
const allowedOrigins = ["*"];
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

// Logging middleware
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.path} - Origin: ${req.headers.origin || "none"}`,
  );
  next();
});

// ========== DEBUG ROUTES ==========
app.get("/version", (req, res) =>
  res.json({ version: "v3-dynamic", time: Date.now() }),
);

app.get("/ping", (req, res) => res.json({ pong: true, timestamp: Date.now() }));

app.post("/api/auth/login-direct", (req, res) => {
  res.json({ message: "Direct login route works" });
});

// ========== API ROUTES ==========
app.use("/api/attendance", attendanceRouter);
app.use("/attendance", attendanceRouter);
app.use("/api/auth", authRouter);
console.log("authRouter:", authRouter);
console.log("authRouter stack:", authRouter?.stack);
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

// ========== DYNAMIC ROUTE LISTER (replaces hardcoded catch‑all) ==========
// This endpoint shows all registered routes
app.get("/debug/routes", (req, res) => {
  const routes = [];
  const collectRoutes = (stack, basePath = "") => {
    stack.forEach((layer) => {
      if (layer.route) {
        const methods = Object.keys(layer.route.methods)
          .join(",")
          .toUpperCase();
        routes.push(`${methods} ${basePath}${layer.route.path}`);
      } else if (layer.name === "router" && layer.handle.stack) {
        // Get the base path from the router's regexp (simplified)
        let routerPath = "";
        if (layer.regexp) {
          const pathStr = layer.regexp.source
            .replace(/\\\//g, "/")
            .replace(/\^/g, "")
            .replace(/\?/g, "")
            .replace(/\(\?:\(\[\^\/\]\+\?\)\)/g, ":param");
          routerPath = pathStr;
        }
        collectRoutes(layer.handle.stack, basePath + routerPath);
      }
    });
  };
  collectRoutes(app._router.stack);
  res.json({ registeredRoutes: routes });
});

// Catch‑all 404 (must be last)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// ========== DATABASE INIT (lazy) ==========
const connectDb = require("./config/connectdb");
connectDb().catch((err) => console.error("Initial DB connection error:", err));

// ========== EXPORT FOR VERCEL ==========
module.exports = app;

// Local dev server
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}
