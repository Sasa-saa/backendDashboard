// const mongoose = require("mongoose");

// const connectDb = async () => {
//   try {
//     await mongoose.connect(process.env.MOONGOOSE_URI);

//     console.log("Database connected successfully");
//   } catch (error) {
//     console.log("Something went wrong", error);
//   }
// };

// module.exports = connectDb();




// const mongoose = require("mongoose");

// // Cache the connection in serverless environment
// let cached = global.mongoose;
// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// const connectDb = async () => {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false, // Disable buffering in serverless
//     };
//     cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
//       console.log("Database connected successfully");
//       return mongoose;
//     }).catch((err) => {
//       console.error("Database connection error:", err);
//       throw err; // Propagate error so server fails gracefully
//     });
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// };

// module.exports = connectDb; // Export a function, not the result





// const mongoose = require("mongoose");

// let cached = global.mongoose;
// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// const connectDb = async () => {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,      // Don't buffer commands in serverless
//       connectTimeoutMS: 30000,    // Same as URI, but safe to set here too
//       socketTimeoutMS: 30000,
//       serverSelectionTimeoutMS: 30000,
//     };

//     const mongoUri = process.env.MONGODB_URI; // or MONGODB_URI

//     if (!mongoUri) {
//       throw new Error("MongoDB URI is not defined in environment variables");
//     }

//     cached.promise = mongoose
//       .connect(mongoUri, opts)
//       .then((mongoose) => {
//         console.log("Database connected successfully");
//         return mongoose;
//       })
//       .catch((err) => {
//         console.error("Database connection error:", err);
//         // Reset cache so next request can retry
//         cached.promise = null;
//         throw err;
//       });
//   }

//   try {
//     cached.conn = await cached.promise;
//     return cached.conn;
//   } catch (err) {
//     cached.promise = null; // allow retry on next request
//     throw err;
//   }
// };

// module.exports = connectDb;




// const mongoose = require("mongoose");

// // Use a global cached variable to store the connection
// let cached = global.mongoose;
// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// const connectDb = async () => {
//   // If we have a cached connection, return it
//   if (cached.conn) {
//     return cached.conn;
//   }

//   // If there's no pending promise, create one
//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false, // Disable buffering as we want a fast fail in serverless
//       // Use these server selection timeouts to make the connection process faster
//       serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30
//       socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
//     };

//     const mongoUri = process.env.MONGODB_URI; // Use a consistent env var name

//     if (!mongoUri) {
//       console.error("FATAL ERROR: MONGODB_URI is not defined.");
//       throw new Error("MONGODB_URI environment variable is required.");
//     }

//     // Save the promise to the cache
//     cached.promise = mongoose.connect(mongoUri, opts)
//       .then((mongooseInstance) => {
//         console.log("✅ Database connected successfully");
//         return mongooseInstance;
//       })
//       .catch((err) => {
//         console.error("❌ Database connection error:", err);
//         // Reset the cache so that a future request can try to connect again
//         cached.promise = null;
//         throw err;
//       });
//   }

//   try {
//     // Await the promise and save the connection to the cache
//     cached.conn = await cached.promise;
//     return cached.conn;
//   } catch (err) {
//     // Reset the promise if await fails, so we can retry later
//     cached.promise = null;
//     throw err;
//   }
// };

// module.exports = connectDb;





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
