const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log(`Database connection successful ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`Error while connecting to Database ${error}`);
  }
};

module.exports = connectDB;
