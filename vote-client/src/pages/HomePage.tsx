import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

type Poll = {
  id: number;
  title: string;
  created_at: string;
  options: string[];
};

function HomePage() {
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/polls")
      .then((res) => res.json())
      .then((data) => setPolls(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="dark-theme">
      <div className="wide-card-container">
        <div className="header-row">
          <h1>All Polls</h1>
          <Link to="/polls/new">
            <button className="create-btn">Create Poll</button>
          </Link>
        </div>
        <div className="table-container">
          <table className="polls-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Created At</th>
                <th>Options Count</th>
              </tr>
            </thead>
            <tbody>
              {polls.map((poll) => (
                <tr key={poll.id}>
                  <td>
                    <Link to={`/polls/${poll.id}`}>{poll.title}</Link>
                  </td>
                  <td>{new Date(poll.created_at).toLocaleString()}</td>
                  <td>{poll.options.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HomePage;