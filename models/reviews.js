const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
