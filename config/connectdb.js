const mongoose = require("mongoose");

// Global cache for serverless environment (prevents multiple connections per invocation)
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDb = async () => {
  // Return existing connection if available
  if (cached.conn) {
    console.log("✅ Using cached database connection");
    return cached.conn;
  }

  // If no pending promise, create one
  if (!cached.promise) {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error("❌ MONGODB_URI is not defined in environment variables");
      throw new Error("MONGODB_URI is required");
    }

    const opts = {
      bufferCommands: false, // Important for serverless – fail quickly
      serverSelectionTimeoutMS: 5000, // 5 seconds to find a server
      socketTimeoutMS: 45000, // Close sockets after 45s idle
    };

    console.log("⏳ Connecting to MongoDB...");
    cached.promise = mongoose
      .connect(mongoUri, opts)
      .then((mongooseInstance) => {
        console.log("✅ Database connected successfully");
        return mongooseInstance;
      })
      .catch((err) => {
        console.error("❌ Database connection error:", err);
        cached.promise = null; // Allow retry on next request
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    cached.promise = null;
    throw err;
  }
};

module.exports = connectDb;
