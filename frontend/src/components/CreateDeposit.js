import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateDeposit = () => {
  const [bankName, setBankName] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [term, setTerm] = useState('');
  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      await axios.post(
        'http://localhost:3001/deposits',
        { bankName, interestRate, term },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      navigate('/deposits');
    } catch (error) {
      console.error('Failed to create deposit:', error);
    }
  };

  return (
    <div>
      <h2>Create Deposit</h2>
      <input
        type="text"
        placeholder="Bank Name"
        value={bankName}
        onChange={(e) => setBankName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Interest Rate (%)"
        value={interestRate}
        onChange={(e) => setInterestRate(e.target.value)}
      />
      <input
        type="number"
        placeholder="Term (months)"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button onClick={handleCreate}>Create</button>
    </div>
  );
};

export default CreateDeposit;