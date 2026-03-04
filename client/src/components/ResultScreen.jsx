function ResultScreen({
    score, total, saveResult, fetchResult, restartQuiz
}) {
    return (
        <div style={{ padding: "20px" }}>
            <h1>Quiz Finished 🎉</h1>
            <h2>Your score: {score} / {total}</h2>
            <button onClick={saveResult}>
                Save Result
            </button>
            <button onClick={fetchResult} style={{ marginLeft: "10px" }}>
                View Past Results
            </button>
            <br /><br />

            <button onClick={restartQuiz}>
                Play Again
            </button>
        </div>
    )
}
export default ResultScreen;