const mongoose = require("mongoose");
const { Schema } = mongoose;
const crypto = require("crypto");

const Users = new Schema(
  {
    uuid: { type: String, default: crypto.randomUUID(), unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    liked: { type: Array, default: [] },
    role: {
      type: String,
      enum: ["USER", "ADMIN", "DONATER", "VIP"],
      default: "USER",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", Users);
