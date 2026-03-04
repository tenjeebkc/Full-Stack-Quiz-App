function QuestionCard({
    currentQuestion,
    currentIndex,
    selectedAnswer,
    handleAnswerClick,
    handleNext
}) {
    return (
        <div style={{ padding: "20px" }}>
            <h1>Quiz App - Made for you</h1>
            <h2>Question: {currentIndex + 1}</h2>
            <h3>{currentQuestion.question}</h3>

            {currentQuestion.options.map((option, index) => (
                <div key={index}>
                    <button onClick={() => handleAnswerClick(index)}
                        style={{
                            margin: "5px", fontSize: "16px",
                            backgroundColor: selectedAnswer === index ? "lightgreen" : "white"
                        }}>
                        {option}
                    </button>
                </div>
            ))}

            <button
                onClick={handleNext}
                disabled={selectedAnswer === null}
                style={{ marginTop: "20px" }}>Next</button>
        </div>
    )
}

export default QuestionCard;