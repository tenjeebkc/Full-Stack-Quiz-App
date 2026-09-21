import "./App.css";
import { useState, useEffect } from "react";

import QuestionCard from "./components/QuestionCard";
import ResultScreen from "./components/ResultScreen";
import HistoryScreen from "./components/HistoryScreen";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const [pastResults, setPastResults] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const [timeLeft, setTimeLeft] = useState(15);

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/api/questions`);

        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }

        const data = await response.json();

        setQuestions(data);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Unable to load questions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Timer
  useEffect(() => {
    if (loading || showResult || showHistory || questions.length === 0) {
      return;
    }

    if (timeLeft <= 0) {
      moveToNextQuestion();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((previousTime) => previousTime - 1);
    }, 1500);

    return () => clearTimeout(timer);
  }, [timeLeft, loading, showResult, showHistory]);

  const currentQuestion = questions[currentIndex];

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
  };

  const moveToNextQuestion = () => {
    const isCorrect =
      selectedAnswer !== null &&
      selectedAnswer === currentQuestion.correctAnswer;

    const newScore = isCorrect ? score + 1 : score;

    setScore(newScore);
    setSelectedAnswer(null);
    setTimeLeft(15);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((previousIndex) => previousIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const saveResult = async () => {
    try {
      const response = await fetch(`${API_URL}/api/results`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score,
          total: questions.length,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save result");
      }

      alert("Result saved!");
    } catch (err) {
      console.error("Error saving result:", err);
      alert("Error saving result ⚠️");
    }
  };

  const fetchResult = async () => {
    try {
      const response = await fetch(`${API_URL}/api/results`);

      if (!response.ok) {
        throw new Error("Failed to fetch results");
      }

      const data = await response.json();

      setPastResults(data);
      setShowHistory(true);
    } catch (err) {
      console.error("Error fetching results:", err);
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setTimeLeft(10);
    setShowResult(false);
    setShowHistory(false);
  };

  const clearHistory = async () => {
    try {
      const response = await fetch(`${API_URL}/api/results`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to clear history");
      }

      setPastResults([]);
    } catch (err) {
      console.error("Error clearing history:", err);
    }
  };

  if (loading) {
    return <h2>Loading questions...</h2>;
  }

  if (error) {
    return (
      <div>
        <h2>{error}</h2>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  if (questions.length === 0) {
    return <h2>No questions found!</h2>;
  }

  const progress =
    ((currentIndex + 1) / questions.length) * 100;

  if (showResult && !showHistory) {
    return (
      <ResultScreen
        score={score}
        total={questions.length}
        saveResult={saveResult}
        fetchResult={fetchResult}
        restartQuiz={restartQuiz}
      />
    );
  }

  if (showHistory) {
    return (
      <HistoryScreen
        pastResults={pastResults}
        setShowHistory={setShowHistory}
        setPastResults={setPastResults}
        clearHistory={clearHistory}
      />
    );
  }

  return (
    <QuestionCard
      currentQuestion={currentQuestion}
      currentIndex={currentIndex}
      selectedAnswer={selectedAnswer}
      handleAnswerClick={handleAnswerClick}
      handleNext={moveToNextQuestion}
      totalQuestions={questions.length}
      progress={progress}
      timeLeft={timeLeft}
    />
  );
}

export default App;