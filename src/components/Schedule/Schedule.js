function Schedule(props) {
  const {username, email, studentID, schedule} = props;

  const rows = schedule.map((row, index) =>
    <tr key={index}>
      <td>{row.subject}</td>
      <td>{row.topic}</td>
      <td>{row.timeslot}</td>
    </tr>
  );

  return (
    <div className="schedule">
      <div className="schedule__header">
        <h2>Schedule</h2>
        <div className="schedule__head-data schedule__username">
          <span className="data-label">Username:</span>
          <span className="data-info">{username}</span>
        </div>
        <div className="schedule__head-data schedule__email">
          <span className="data-label">Email:</span>
          <span className="data-info">{email}</span>
        </div>
        <div className="schedule__head-data schedule__studentID">
          <span className="data-label">ID:</span>
          <span className="data-info">{studentID}</span>
        </div>
      </div>
      <div className="schedule__classes">
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Topic</th>
              <th>Timeslot</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Schedule;