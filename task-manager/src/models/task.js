const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const TaskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
