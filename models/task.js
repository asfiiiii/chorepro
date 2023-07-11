const mongoose = require("mongoose");

const schema = mongoose.Schema;

taskSchema = new schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: schema.Types.ObjectId,
    ref: "User",
  },
  client: {
    type: schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["completed", "pending", "paused"],
  },
  review: [
    {
      type: schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  time: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("tasks", taskSchema);
