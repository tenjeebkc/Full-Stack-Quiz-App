const express = require("express");
const cors = require("cors");  // helps interact with react
const mongoose = require("mongoose");


const mongoURL = "mongodb+srv://user_tenjeeb:ebNHAY4ErdjAJhSi@sharedcluster.m8sceit.mongodb.net/quizApp?retryWrites=true&w=majority";
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

// Connnect to the mongoDB
mongoose.connect(mongoURL)
.then(() => console.log("MongoDB connnected"))
.catch(err => console.log("MongoDb connection error", err)
)

// Dummy quiz question
const Question = require("./models/Question");

// Api route
app.get('/api/questions', async(req, res) => {
    try{
        const questions = await Question.find();
        res.json(questions);
    } catch(err) {
        console.error(err);
        res.status(500).json({error: "Server error"});
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});