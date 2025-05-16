import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import BankOfferList from './components/BankOfferList';
import CreateBankOffer from './components/CreateBankOffer';
import CompareDeposits from './components/CompareBankOffers';
import React from 'react';

function App(): React.ReactElement {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/bank-offers" element={<BankOfferList />} />
          <Route path="/create-bank-offer" element={<CreateBankOffer />} />
          <Route path="/compare-deposits" element={<CompareDeposits />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;