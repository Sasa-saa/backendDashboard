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





const mongoose = require("mongoose");

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDb = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,      // Don't buffer commands in serverless
      connectTimeoutMS: 30000,    // Same as URI, but safe to set here too
      socketTimeoutMS: 30000,
      serverSelectionTimeoutMS: 30000,
    };

    const mongoUri = process.env.MONGODB_URI; // or MONGODB_URI

    if (!mongoUri) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }

    cached.promise = mongoose
      .connect(mongoUri, opts)
      .then((mongoose) => {
        console.log("Database connected successfully");
        return mongoose;
      })
      .catch((err) => {
        console.error("Database connection error:", err);
        // Reset cache so next request can retry
        cached.promise = null;
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    cached.promise = null; // allow retry on next request
    throw err;
  }
};

module.exports = connectDb;