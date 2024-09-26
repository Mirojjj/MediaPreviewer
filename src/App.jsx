import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./screens/Homepage";
import Mediapage from "./screens/Mediapage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/media" element={<Mediapage />} />
      </Routes>
    </Router>
  );
}

export default App;
