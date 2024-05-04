import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Redirect from './Components/Redirect';
import Play from './Components/Play';

function App() {
  return (
    <div className="App">
      <Router basename="/spotify-trivia">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/redirect" element={<Redirect />} />
          <Route path="/play" element={<Play />} />
        </Routes>
      </Router>
    </div>
  );
} 

export default App;
