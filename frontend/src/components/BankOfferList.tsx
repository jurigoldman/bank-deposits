import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

// Описываем структуру банковского предложения, как она приходит с бэкенда
// (соответствует BankOffer схеме + _id, createdAt, updatedAt)
interface BankOffer {
  _id: string;
  bankName: string;
  productName?: string; // productName может быть опциональным
  interestRate: number;
  minAmount: number;
  maxAmount?: number; // maxAmount может быть опциональным или Infinity
  termMonths: number;
  createdAt: string; // Даты обычно приходят как строки ISO
  updatedAt: string;
}

const BankOfferList = (): React.ReactElement => {
  const [bankOffers, setBankOffers] = useState<BankOffer[]>([]); // Типизируем состояние

  useEffect(() => {
    const fetchBankOffers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // Обработка случая, когда токен отсутствует (например, редирект на логин)
          console.warn('No token found, user might need to login.');
          return;
        }
        // Используем относительный путь благодаря proxy и новые эндпоинты
        const response = await axios.get<BankOffer[]>('/bank-offers', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBankOffers(response.data);
      } catch (error) {
        console.error('Failed to fetch bank offers:', error);
        // Здесь можно добавить более специфичную обработку ошибок AxiosError, как в Login.tsx
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<any>; // Укажем <any> для data, чтобы получить доступ
          let errorMessage = axiosError.message; // Сообщение по умолчанию
          if (axiosError.response?.data && typeof axiosError.response.data === 'object' && 'message' in axiosError.response.data) {
            errorMessage = (axiosError.response.data as { message: string }).message;
          } else if (typeof axiosError.response?.data === 'string') {
            errorMessage = axiosError.response.data;
          }
          alert(`Failed to load offers: ${errorMessage}`);
        } else {
          alert('Failed to load offers. An unexpected error occurred.');
        }
      }
    };
    fetchBankOffers();
  }, []);

  return (
    <div>
      <h2>Bank Offers</h2> {/* Обновляем заголовок */}
      {bankOffers.length === 0 ? (
        <p>No bank offers available at the moment.</p>
      ) : (
        <ul>
          {bankOffers.map((offer) => ( // Используем 'offer' вместо 'deposit'
            <li key={offer._id}>
              <strong>{offer.bankName}</strong>
              {offer.productName && ` - ${offer.productName}`}
              <br />
              Rate: {offer.interestRate}% | Term: {offer.termMonths} months
              <br />
              Amount: {offer.minAmount} - {offer.maxAmount !== Infinity ? offer.maxAmount : 'No limit'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BankOfferList;