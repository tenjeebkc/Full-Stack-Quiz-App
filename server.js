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

const Result = require("./models/Result")

// Use Post req because we are creating a new Data
app.post('/api/results', async(req, res) => {
    try{
        const { score, total } = req.body;

        // new Result is how you turn raw request data into a properly structured MongoDB document before saving it.
        const newResult = new Result({ score, total });  
        await newResult.save();

        res.json({ message: "Result saved successfully" });

    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Failed to save result" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});