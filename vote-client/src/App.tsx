import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PollPage from "./pages/PollPage";
import NewPollPage from "./pages/NewPollPage";
import EditPollPage from "./pages/EditPollPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/polls/:id" element={<PollPage />} />
        <Route path="/polls/new" element={<NewPollPage />} />
        <Route path="/polls/:id/edit" element={<EditPollPage />} />
      </Routes>
    </Router>
  );
}

export default App;
