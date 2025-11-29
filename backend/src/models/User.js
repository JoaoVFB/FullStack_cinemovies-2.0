// src/models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  password: { type: String, required: true }, // hashed
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", UserSchema);
