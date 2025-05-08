import { useEffect, useState } from 'react';
import axios from 'axios';

const Deposits = () => {
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const response = await axios.get('http://localhost:3001/deposits', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setDeposits(response.data);
      } catch (error) {
        console.error('Failed to fetch deposits:', error);
      }
    };
    fetchDeposits();
  }, []);

  return (
    <div>
      <h2>Deposits</h2>
      <ul>
        {deposits.map((deposit) => (
          <li key={deposit._id}>
            {deposit.bankName} - {deposit.interestRate}% - {deposit.term} months
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Deposits;