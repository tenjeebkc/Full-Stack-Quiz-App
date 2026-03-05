import "./App.css";
import { useState, useEffect } from 'react'

import QuestionCard from "./components/QuestionCard"
import ResultScreen from "./components/ResultScreen"
import HistoryScreen from "./components/HistoryScreen"

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);  //Which question to show
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0); // correct answer count
  const [showResult, setShowResult] = useState(false);

  const [pastResults, setPastResults] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    fetch("http://localhost:3000/api/questions")
      .then(res => res.json())
      .then(data => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setLoading(false);
      })
  }, []);

  // Timer logic
  useEffect(() => {
   if(timeLeft === 0) {
    handleNext();  // Move to next question automatically
    return;
   }

   const timer = setTimeout(() =>{
    setTimeLeft(timeLeft - 1);
   }, 1000);
   
   return () => clearTimeout(timer);   // Clear the old timer
  }, [timeLeft])
  

  if (loading) return <h2>Loading questions...</h2>
  if (questions.length === 0) return <h2>No questions found!</h2>

  const currentQuestion = questions[currentIndex];

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
  }

  const handleNext = () => {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1)
    }

    setSelectedAnswer(null);
    setTimeLeft(10);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1)
    }
    else {
      setShowResult(true)
    }
  }

  const saveResult = async () => {
    try {
      await fetch("http://localhost:3000/api/results", {
        method: "POST",
        // Tells the server the request body is JSON.
        headers: {
          "Content-Type": "application/json"
        },
        // Convert the json object into json text for server
        body: JSON.stringify({
          score: score,
          total: questions.length
        })
      });
      alert("Result saved!");
    } catch (err) {
      alert("Error saving result⚠️")
      console.error("Error saving result:", err)
    }
  }

  const fetchResult = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/results")
      const data = await res.json();
      setPastResults(data)
      setShowHistory(true);
    }
    catch (err) {
      console.error("Error fetching results:", err);
    }
  }

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setShowHistory(false);
  };

  const clearHistory = async () =>{
    try{
      await fetch("http://localhost:3000/api/results", {
        method: "DELETE",
      });

      setPastResults([]);
    } catch(err){
      console.error("Error clearing history:", err);
    }
  };

  // Progress bar
  const progress = ((currentIndex + 1) / questions.length) * 100;

  if (showResult && !showHistory) {
    return (
      <ResultScreen
        score={score}
        total={questions.length}
        saveResult={saveResult}
        fetchResult={fetchResult}
       restartQuiz={restartQuiz}
      />
    )
  }

  if (showHistory) {
    return (
      <HistoryScreen
        pastResults={pastResults}
        setShowHistory={setShowHistory}
        setPastResults = {setPastResults}
        clearHistory={clearHistory} />    
    )
  }

  return (
    <QuestionCard
      currentQuestion={currentQuestion}
      currentIndex={currentIndex}
      selectedAnswer={selectedAnswer}
      handleAnswerClick={handleAnswerClick}
      handleNext={handleNext}
      totalQuestions={questions.length}
      progress={progress}
      timeLeft = {timeLeft}
    />
  )
}

export default App
