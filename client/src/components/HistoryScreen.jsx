function HistoryScreen({ pastResults, setShowHistory, clearHistory }) {
    return (
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
      <button onClick={clearHistory} style={{marginLeft: "20px"}}>Clear History</button>
      </div>
    )
}

export default HistoryScreen;