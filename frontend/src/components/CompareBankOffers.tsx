import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

// Структура данных, соответствующая BankOfferComparisonResultDto с бэкенда
interface BankOfferComparisonResult {
  _id: string;
  bankName: string;
  productName?: string;
  interestRate: number;
  minAmount: number;
  maxAmount?: number;
  termMonths: number;
  depositAmount: number;    // Сумма, по которой сравнивали
  depositTermMonths: number;// Срок, по которому сравнивали
  profit: number;           // Рассчитанная прибыль
  createdAt: string;
  updatedAt: string;
}

const CompareBankOffers = (): React.ReactElement => {
  const [results, setResults] = useState<BankOfferComparisonResult[]>([]);
  const [amount, setAmount] = useState<string>('');
  const [term, setTerm] = useState<string>('');

  const handleCompare = async () => {
    const numericAmount = parseInt(amount, 10);
    const numericTerm = parseInt(term, 10);

    if (isNaN(numericAmount) || isNaN(numericTerm) || numericAmount <= 0 || numericTerm <= 0) {
      alert('Please enter valid positive numbers for amount and term.');
      return;
    }

    try {
      // Эндпоинт сравнения публичный, токен не нужен
      const response = await axios.get<BankOfferComparisonResult[]>('/bank-offers/compare', {
        params: { 
          amount: numericAmount, 
          term: numericTerm 
        },
      });
      setResults(response.data);
    } catch (error) {
      console.error('Failed to compare bank offers:', error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;
        let errorMessage = axiosError.message;
        if (axiosError.response) {
          if (axiosError.response.data && typeof axiosError.response.data === 'object' && 'message' in axiosError.response.data) {
            errorMessage = (axiosError.response.data as { message: string }).message;
          } else if (typeof axiosError.response.data === 'string') {
            errorMessage = axiosError.response.data;
          }
        }
        alert(`Failed to compare offers: ${errorMessage}`);
      } else {
        alert('Failed to compare offers. An unexpected error occurred.');
      }
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  return (
    <div>
      <h2>Compare Bank Offers</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={handleAmountChange}
      />
      <input
        type="number"
        placeholder="Term (months)"
        value={term}
        onChange={handleTermChange}
      />
      <button onClick={handleCompare}>Compare</button>
      {results.length > 0 && (
        <ul>
          {results.map((offer) => ( // Используем правильные поля
            <li key={offer._id}>
              <strong>{offer.bankName}</strong> {offer.productName && `(${offer.productName})`}
              <br />
              Rate: {offer.interestRate}% | Term: {offer.termMonths} months
              <br />
              Min Amount: {offer.minAmount} 
              {offer.maxAmount !== null && offer.maxAmount !== undefined && offer.maxAmount !== Infinity ? ` | Max Amount: ${offer.maxAmount}` : ''}
              <br />
              For your deposit of {offer.depositAmount} over {offer.depositTermMonths} months:
              <br />
              <strong>Calculated Profit: {offer.profit}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompareBankOffers;