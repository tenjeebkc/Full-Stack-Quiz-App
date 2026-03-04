function HistoryScreen({ pastResults, setShowHistory, clearHistory }) {
    return (
              <div className="app-container"
              style={{ padding : "20px" }}>
        <h1>Past Results</h1>

        {pastResults.map((r, index) =>(
          <div key={index} style={{ marginBottom: "10px" }}>
            Score: {r.score} / {r.total}
          </div>
        ))}

    <button className="primary-btn"
     onClick={() => setShowHistory(false)}>
      Back
      </button>
      <button className="primary-btn"
       onClick={clearHistory} style={{marginLeft: "20px"}}>Clear History</button>
      </div>
    )
}

export default HistoryScreen;