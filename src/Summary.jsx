function Summary({ entries }) {

  const formatDuration = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  }

  return (
    <div className="summary">
      <h2>Time Sheet Summary</h2>
      {entries.length === 0 ? (
        <p>No time entries yet.</p>
      ) : (
        <table className="time-entries-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Task</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={index}>
                <td>{entry.employee}</td>
                <td>{entry.description}</td>
                <td>{formatDate(entry.startTime)}</td>
                <td>{formatDate(entry.endTime)}</td>
                <td>{formatDuration(entry.duration)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Summary;