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




const mongoose = require("mongoose");

// Cache the connection in serverless environment
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDb = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable buffering in serverless
    };
    cached.promise = mongoose.connect(process.env.MOONGOOSE_URI, opts).then((mongoose) => {
      console.log("Database connected successfully");
      return mongoose;
    }).catch((err) => {
      console.error("Database connection error:", err);
      throw err; // Propagate error so server fails gracefully
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = connectDb; // Export a function, not the result