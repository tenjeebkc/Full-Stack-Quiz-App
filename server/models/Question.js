const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },

  options: {
    type: [String],
    required: true,
    validate: {
      validator: (options) => options.length === 4,
      message: "Each question must have exactly 4 options",
    },
  },

  correctAnswer: {
    type: Number,
    required: true,
    min: 0,
    max: 3,
  },
});

module.exports = mongoose.model("Question", QuestionSchema);