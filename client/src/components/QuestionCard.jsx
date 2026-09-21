function QuestionCard({
  currentQuestion,
  currentIndex,
  selectedAnswer,
  handleAnswerClick,
  handleNext,
  totalQuestions,
  progress,
  timeLeft,
}) {
  return (
    <div className="app-container">
      <div className="quiz-header">
        <div>
          <p className="quiz-label">QUIZIZ</p>
          <h1>Test Your Knowledge</h1>
        </div>

        <div className="question-count">
          {currentIndex + 1} / {totalQuestions}
        </div>
      </div>

      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="question-section">
        <div className="timer">
          Time left: {timeLeft}s
        </div>

        <h2>{currentQuestion.question}</h2>
      </div>

      <div className="options-container">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            className={`option-btn ${
              selectedAnswer === index ? "selected" : ""
            }`}
            onClick={() => handleAnswerClick(index)}
          >
            <span className="option-letter">
              {String.fromCharCode(65 + index)}
            </span>

            <span>{option}</span>
          </button>
        ))}
      </div>

      <div className="quiz-footer">
        <span>
          {selectedAnswer === null
            ? "Select an answer"
            : "Answer selected"}
        </span>

        <button
          className="primary-btn"
          onClick={handleNext}
          disabled={selectedAnswer === null}
        >
          {currentIndex + 1 === totalQuestions
            ? "Finish Quiz"
            : "Next Question"}
        </button>
      </div>
    </div>
  );
}

export default QuestionCard;