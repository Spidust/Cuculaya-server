const mongoose = require("mongoose");
const { Schema } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Posts = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    postId: { type: Number, unique: true },
    view: { type: Number, default: 0 },
    like: { type: Number, default: 0 },
  },
  { timestamps: true }
);

Posts.plugin(AutoIncrement, { inc_field: "postId" });

module.exports = mongoose.model("posts", Posts);
