import { useState } from 'react'
import { useEffect } from 'react'

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);  //Which question to show
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0); // correct answer count
  const [showResult, setShowResult] = useState(false);

  const [pastResults, setPastResults] = useState([]);
  const [showHistory, setShowHistory] = useState(false);


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

  const saveResult = async() => {
    try{
      await fetch("http://localhost:3000/api/results", {
        method: "POST",
        // Tells the server the request body is JSON.
        headers:{
          "Content-Type": "application/json"
        },
        // Convert the json object into json text for server
        body: JSON.stringify({
          score: score,
          total: questions.length
        })
      });
      alert("Result saved!");
    }catch(err){
     alert("Error saving result⚠️")
      console.error("Error saving result:", err)
    }
  }

  const fetchResult = async() => {
    try{
      const res = await fetch("http://localhost:3000/api/results")
      const data = await res.json();
      setPastResults(data)
      setShowHistory(true);
    }
    catch(err){
      console.error("Error fetching results:", err);
    }
  }

  if(showResult && !showHistory){
    return(
      <div style={{padding: "20px" }}>
        <h1>Quiz Finished 🎉</h1>
        <h2>Your score: {score} / {questions.length}</h2>
        <button onClick={saveResult}>
          Save Result
        </button>
        <button onClick={fetchResult} style={{marginLeft: "10px"}}>
          View Past Results
          </button>
      </div>
    )
  }

  if(showHistory){
    return(
      <div style={{ padding : "20px" }}>
        <h1>Past Results</h1>

        {pastResults.map((r, index) =>(
          <div key={index} style={{ marginBottom: "10px" }}>
            Score: {r.score} / {r.total}
          </div>
        ))}

    <button onClick={() => setShowHistory(false)}>
      Back
      </button>
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
