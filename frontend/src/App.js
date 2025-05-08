import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Deposits from './components/Deposits';
import CreateDeposit from './components/CreateDeposit';
import CompareDeposits from './components/CompareDeposits';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/deposits" element={<Deposits />} />
          <Route path="/create-deposit" element={<CreateDeposit />} />
          <Route path="/compare-deposits" element={<CompareDeposits />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;