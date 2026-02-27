const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  score: { type: Number, required: true },
  total: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Result", ResultSchema);