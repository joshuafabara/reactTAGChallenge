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
        <div className="schedule__username">Username: {username}</div>
        <div className="schedule__email">Email: {email}</div>
        <div className="schedule__studentID">ID: {studentID}</div>
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