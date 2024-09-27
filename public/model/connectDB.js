const mongoose = require("mongoose");
const MONGOURL = process.env.MONGO_URL;
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(MONGOURL);
    console.log("MongoDB connected! :)")
  }
  catch (err) {
    console.error("MongoDB  connection failed: ", err);
    process.exit(1);
  }
};

module.exports = connectDB;