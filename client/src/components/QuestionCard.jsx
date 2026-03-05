function QuestionCard({
    currentQuestion,
    currentIndex,
    selectedAnswer,
    handleAnswerClick,
    handleNext,
    totalQuestions,
    progress
}) {
    return (
        <div className="app-container" style={{ padding: "20px" }}>
            <h1>Quiz App - Made for you</h1>

            {/* Question counter */}
            <h2>Question {currentIndex + 1} / {totalQuestions}</h2>

            {/* PROGRESS BAR */}
            <div style={{
                width: "100%",
                height: "10px",
                background: "#e5e7eb",
                borderRadius: "5px",
                marginBUtton: "20px"
            }}>
                <div style={{
                    width: `${progress}%`,
                    height: "100%",
                    background: "#667eea",
                    borderRadius: "5px",
                    transition: "width 0.3s ease"
                }}></div>
             </div>

            <h3>{currentQuestion.question}</h3>

            {currentQuestion.options.map((option, index) => (
                <div key={index}>
                    <button
                        className="secondary-btn"
                        onClick={() => handleAnswerClick(index)}
                        style={{
                            margin: "5px", fontSize: "16px",
                            backgroundColor: selectedAnswer === index ? "lightgreen" : "white"
                        }}>
                        {option}
                    </button>
                </div>
            ))}

            <button
                className="primary-btn"
                onClick={handleNext}
                disabled={selectedAnswer === null}
                style={{ marginTop: "20px" }}>Next</button>
        </div>
    )
}

export default QuestionCard;