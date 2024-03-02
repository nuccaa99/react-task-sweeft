//styles
import "./styles/reset.css";
import "./styles/style.css";
//routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//components & pages
import Home from './pages/Home';
import History from './pages/History';
import Navbar from './components/Navbar';


function App() {
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/history' element={<History />} />
      </Routes>
    </Router >

  );
}

export default App;
