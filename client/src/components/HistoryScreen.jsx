function HistoryScreen({
  pastResults,
  setShowHistory,
  clearHistory,
}) {
  return (
    <div className="app-container history-screen">
      <div className="history-header">
        <div>
          <p className="quiz-label">YOUR ACTIVITY</p>
          <h1>Quiz History</h1>
        </div>

        <button
          className="secondary-btn"
          onClick={() => setShowHistory(false)}
        >
          Back to Quiz
        </button>
      </div>

      {pastResults.length === 0 ? (
        <div className="empty-history">
          <div className="empty-icon">📋</div>
          <h2>No results yet</h2>
          <p>
            Complete a quiz and save your result to see it here.
          </p>
        </div>
      ) : (
        <>
          <div className="history-list">
            {pastResults.map((result, index) => (
              <div className="history-item" key={result._id}>
                <div className="history-number">
                  {pastResults.length - index}
                </div>

                <div className="history-details">
                  <strong>
                    {result.score} / {result.total}
                  </strong>

                  <span>
                    {result.percentage}% score
                  </span>

                  {result.createdAt && (
                    <small>
                      {new Date(
                        result.createdAt
                      ).toLocaleString()}
                    </small>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            className="danger-btn"
            onClick={clearHistory}
          >
            Clear History
          </button>
        </>
      )}
    </div>
  );
}

export default HistoryScreen;