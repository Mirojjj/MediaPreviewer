import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./screens/Homepage";
import Mediapage from "./screens/Mediapage";
import Profilepage from "./screens/Profilepage";
import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/media" element={<Mediapage />} />
          <Route path="/profile" element={<Profilepage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
