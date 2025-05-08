import { useEffect, useState } from 'react';
import axios from 'axios';

const CompareDeposits = () => {
  const [deposits, setDeposits] = useState([]);
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('');

  const handleCompare = async () => {
    try {
      const response = await axios.get('http://localhost:3001/deposits/compare', {
        params: { amount, term },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setDeposits(response.data);
    } catch (error) {
      console.error('Failed to compare deposits:', error);
    }
  };

  return (
    <div>
      <h2>Compare Deposits</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="number"
        placeholder="Term (months)"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button onClick={handleCompare}>Compare</button>
      <ul>
        {deposits.map((deposit, index) => (
          <li key={index}>
            {deposit.bankName} - {deposit.interestRate}% - Profit: {deposit.profit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompareDeposits;