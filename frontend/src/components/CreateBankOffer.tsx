import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

// Данные, которые мы отправляем на бэкенд (соответствуют CreateBankOfferDto)
interface CreateBankOfferPayload {
  bankName: string;
  productName?: string;
  interestRate: number;
  minAmount: number;
  maxAmount?: number; // Может быть не указано, тогда на бэкенде будет Infinity
  termMonths: number;
}

const CreateBankOffer = (): React.ReactElement => {
  const [bankName, setBankName] = useState<string>('');
  const [productName, setProductName] = useState<string>(''); // Новое поле
  const [interestRate, setInterestRate] = useState<string>(''); // Храним как строку, конвертируем при отправке
  const [minAmount, setMinAmount] = useState<string>('');       // Новое поле
  const [maxAmount, setMaxAmount] = useState<string>('');       // Новое поле
  const [termMonths, setTermMonths] = useState<string>('');     // Переименовано с term
  
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // Валидация и конвертация типов перед отправкой
    const rate = parseFloat(interestRate);
    const term = parseInt(termMonths, 10);
    const min = parseInt(minAmount, 10);
    const max = maxAmount ? parseInt(maxAmount, 10) : undefined; // maxAmount опционален

    if (!bankName || isNaN(rate) || isNaN(term) || isNaN(min)) {
      alert('Please fill in all required fields correctly (Bank Name, Interest Rate, Term, Min Amount).');
      return;
    }
    if (rate <= 0 || term <= 0 || min < 0) {
        alert('Interest Rate, Term, and Min Amount must be positive values.');
        return;
    }
    if (max !== undefined && max < min) {
        alert('Max Amount cannot be less than Min Amount.');
        return;
    }

    const payload: CreateBankOfferPayload = {
      bankName,
      productName: productName || undefined, // Отправляем undefined если пусто
      interestRate: rate,
      minAmount: min,
      maxAmount: max,
      termMonths: term,
    };

    try {
      const token = localStorage.getItem('token');
      await axios.post('/bank-offers', payload, { // Обновленный URL
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/bank-offers'); // Обновленный путь для навигации
    } catch (error) {
      console.error('Failed to create bank offer:', error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;
        let errorMessage = axiosError.message; // Сообщение по умолчанию

        // Явная проверка на существование response
        if (axiosError.response) { 
          if (axiosError.response.data && typeof axiosError.response.data === 'object' && 'message' in axiosError.response.data) {
            errorMessage = (axiosError.response.data as { message: string }).message;
          } else if (typeof axiosError.response.data === 'string') {
            errorMessage = axiosError.response.data;
          }
        }
        // Если response нет, останется axiosError.message по умолчанию

        alert(`Failed to create offer: ${errorMessage}`);
      } else {
        alert('Failed to create offer. An unexpected error occurred.');
      }
    }
  };

  // Общие обработчики для input для простоты, можно сделать и отдельные
  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
  };

  return (
    <div>
      <h2>Create Bank Offer</h2>
      <input
        type="text" placeholder="Bank Name*" value={bankName}
        onChange={handleChange(setBankName)}
      />
      <input
        type="text" placeholder="Product Name (optional)" value={productName}
        onChange={handleChange(setProductName)}
      />
      <input
        type="number" placeholder="Interest Rate (%)*" value={interestRate}
        onChange={handleChange(setInterestRate)}
      />
      <input
        type="number" placeholder="Min Amount*" value={minAmount}
        onChange={handleChange(setMinAmount)}
      />
      <input
        type="number" placeholder="Max Amount (optional)" value={maxAmount}
        onChange={handleChange(setMaxAmount)}
      />
      <input
        type="number" placeholder="Term (months)*" value={termMonths}
        onChange={handleChange(setTermMonths)}
      />
      <button onClick={handleSubmit}>Create Offer</button>
    </div>
  );
};

export default CreateBankOffer;