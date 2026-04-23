function LabResultsCard({ labResults }) {
  return (
    <section className="card-panel lab-results-card">
      <h2 className="section-title">Lab Results</h2>
      <ul className="lab-list">
        {labResults.map((result) => (
          <li key={result} className="lab-row">
            <span>{result}</span>
            <span className="download-icon" aria-hidden="true">
              \u2b73
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default LabResultsCard;
