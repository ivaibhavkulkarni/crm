import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  company: String,
  mobile: String,
  email: { type: String, unique: true },
  password: String,
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
