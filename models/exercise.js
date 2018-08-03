const mongoose = require("mongoose");
const shortid = require("shortid");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate(),
    required: true
  },
  userId: {
    type: String,
    ref: "User",
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  date: {
    type: String
  }
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
