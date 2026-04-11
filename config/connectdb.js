const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MOONGOOSE_URI);

    console.log("Database connected successfully");
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

module.exports = connectDb();
