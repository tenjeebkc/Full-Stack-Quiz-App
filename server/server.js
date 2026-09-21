require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Question = require("./models/Question");
const Result = require("./models/Result");

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

if (!MONGO_URI) {
  console.error("MONGO_URI is not configured.");
  process.exit(1);
}

// Middleware
app.use(
  cors({
    origin: CLIENT_URL,
  })
);

app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Quiz API is running",
  });
});

// Get quiz questions in random order
app.get("/api/questions", async (req, res) => {
  try {
    const questions = await Question.aggregate([
      { $sample: { size: 10 } },
    ]);

    res.status(200).json(questions);
  } catch (err) {
    console.error("Error fetching questions:", err);

    res.status(500).json({
      error: "Failed to fetch questions",
    });
  }
});

// Save quiz result
app.post("/api/results", async (req, res) => {
  try {
    const { score, total} = req.body;

    // Validate required fields
    if (
      typeof score !== "number" ||
      typeof total !== "number"
    ) {
      return res.status(400).json({
        error: "Score and total must be numbers",
      });
    }

    // Validate score range
    if (score < 0 || total <= 0 || score > total) {
      return res.status(400).json({
        error: "Invalid score or total",
      });
    }

    // Calculate percentage
    const percentage = Math.round((score / total) * 100);

    const newResult = new Result({
      score,
      total,
      percentage,
    });

    const savedResult = await newResult.save();

    res.status(201).json({
      message: "Result saved successfully",
      result: savedResult,
    });
  } catch (err) {
    console.error("Error saving result:", err);

    res.status(500).json({
      error: "Failed to save result",
    });
  }
});

// Get quiz history
app.get("/api/results", async (req, res) => {
  try {
    const results = await Result.find().sort({
      createdAt: -1,
    });

    res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching results:", err);

    res.status(500).json({
      error: "Failed to fetch results",
    });
  }
});

// Delete quiz history
app.delete("/api/results", async (req, res) => {
  try {
    const result = await Result.deleteMany({});

    res.status(200).json({
      message: "All results deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    console.error("Error clearing history:", err);

    res.status(500).json({
      error: "Failed to delete history",
    });
  }
});

// Connect to MongoDB and start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });