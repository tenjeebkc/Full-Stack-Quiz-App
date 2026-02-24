const express = require("express");
const cors = require("cors");  // helps interact with react

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

// Dummy quiz question
const questions = [
    {
        id: 1,
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyperlinks Text Mark Language",
            "Hyper Tool Multi Language",
        ],
        correctAnswer: 0
    },
    {
        id: 2,
        question: "Which language runs in the browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        correctAnswer: 3
    },

    {
        id: 3,
        question: "What is React?",
        options: [
            "Database",
            "Frontend library",
            "Operating system",
            "Programming language"
        ],
        correctAnswer: 1
    }

]

app.get('/', (req, res) => {
  res.send('Hello World!')
})
// Api route
app.get('/api/questions', (req, res) => {
    res.json(questions);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});