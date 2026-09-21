function ResultScreen({
  score,
  total,
  saveResult,
  fetchResult,
  restartQuiz,
}) {
  const percentage = Math.round((score / total) * 100);

  return (
    <div
      className="app-container"
      style={{
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1>Quiz Finished</h1>

      <h2
        style={{
          fontSize: "28px",
          margin: "20px 0",
        }}
      >
        Your Score
      </h2>

      <div
        style={{
          fontSize: "42px",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        {score} / {total}
      </div>

      <p
        style={{
          fontSize: "20px",
          marginBottom: "25px",
        }}
      >
        {percentage}%
      </p>

      <div>
        <button
          className="primary-btn"
          onClick={saveResult}
        >
          Save Result
        </button>

        <button
          className="primary-btn"
          onClick={fetchResult}
          style={{ marginLeft: "10px" }}
        >
          View Past Results
        </button>
      </div>

      <br />

      <button
        className="primary-btn"
        onClick={restartQuiz}
      >
        Play Again
      </button>
    </div>
  );
}

export default ResultScreen;