function ResultScreen({
    score, total, saveResult, fetchResult, restartQuiz
}) {
    return (
        <div className="app-container"
        style={{ padding: "20px" }}>

            <h1>Quiz Finished 🎉</h1>
            <h2 style={{fontSize: "28px", margin: "20px 0" }}>Your score: {score} / {total}</h2>
            <button className="primary-btn" 
            onClick={saveResult}>
                Save Result
            </button>
            <button className="primary-btn"
            onClick={fetchResult} style={{ marginLeft: "10px" }}>
                View Past Results
            </button>
            <br /><br />

            <button className="primary-btn"
            onClick={restartQuiz}>
                Play Again
            </button>
        </div>
    )
}
export default ResultScreen;