import { useState } from 'react'
import { useEffect } from 'react'

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);  //Which question to show
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0); // correct answer count
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/api/questions")
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

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1)
    }
    else {
      setShowResult(true)
    }
  }

  if(showResult){
    return(
      <div style={{padding: "20px" }}>
        <h1>Quiz Finished 🎉</h1>
        <h2>Your score: {score} / {questions.length}</h2>
      </div>
    )
  }

  return (
      <div style={{ padding: "20px" }}>
        <h1>Quiz App - Made for you</h1>
        <h2>Question: {currentIndex + 1}</h2>
        <h3>{currentQuestion.question}</h3>

        {currentQuestion.options.map((option, index) =>(
          <div key={index}>
            <button onClick={ () => handleAnswerClick(index)}
            style={{margin: "5px" , fontSize: "16px",
              backgroundColor: selectedAnswer === index ? "lightgreen" : "white"
             }}>
              {option}
            </button>
          </div>
        ))}

        <button
        onClick={handleNext} 
        disabled = {selectedAnswer === null}
        style={{marginTop: "20px"}}>Next</button>
      </div>
  
  )
}

export default App
