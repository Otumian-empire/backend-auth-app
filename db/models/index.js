const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bio: { type: String },
    phone: { type: String },
    email: { type: String, unique: true, dropDups: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("profile", profileSchema);
