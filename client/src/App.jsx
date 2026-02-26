import { useState } from 'react'
import { useEffect } from 'react'

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch("http://localhost:3001/api/questions")
  .then(res => res.json())
  .then(data => {
    setQuestions(data);
    setLoading(false);
  })
  .catch(err =>{
    console.error("Error fetching questions:", err);
    setLoading(false);
  })
  }, []);

  if(loading) return <h2>Loading questions...</h2>
  

  return (
    <>
    <div style={{padding: "20px"}}>
      <h1>Quiz App - Made for you</h1>

      {questions.map( q => (
          <div key={q._id} style={{marginBottom: "20px"}}>
            <h3>{q.question}</h3>
            {q.options.map ((option, index) => (
              <div key={index}>
                <button>{option}</button>
              </div>
            ))}
          </div>
      ))}
    </div>
    </>
  )
}

export default App
