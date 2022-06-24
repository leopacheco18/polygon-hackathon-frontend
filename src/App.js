import './App.css';
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/home/Home';
function App() {
  return (
    <Router>
    

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
  </Router>
  );
}

export default App;
