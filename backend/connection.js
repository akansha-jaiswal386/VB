const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongo_url = process.env.DB_URL;

mongoose.connect(mongo_url)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err);
  });

module.exports = mongoose;
