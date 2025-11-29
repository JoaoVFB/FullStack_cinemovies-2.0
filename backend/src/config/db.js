// src/config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/cinemovies_db";
  const poolSizeMin = parseInt(process.env.POOL_MIN || "2", 10);
  const poolSizeMax = parseInt(process.env.POOL_MAX || "10", 10);

  await mongoose.connect(uri, {
    minPoolSize: poolSizeMin,
    maxPoolSize: poolSizeMax,
    autoIndex: true
  });

  console.log("MongoDB connected:", uri);
};

export default connectDB;
