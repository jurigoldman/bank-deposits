import { api } from './axios';
import { BankOffer } from '../types/bankOffer';

export interface BankOfferComparisonParams {
  amount: number;
  termInMonths: number;
  isEarlyWithdrawal?: boolean;
  isCapitalization?: boolean;
}

export const bankOffersApi = {
  // Получение всех предложений
  getAll: async (): Promise<BankOffer[]> => {
    const { data } = await api.get<BankOffer[]>('/bank-offers');
    return data;
  },

  // Получение предложения по ID
  getById: async (id: string): Promise<BankOffer> => {
    const { data } = await api.get<BankOffer>(`/bank-offers/${id}`);
    return data;
  },

  // Сравнение предложений по параметрам
  compare: async (params: BankOfferComparisonParams): Promise<BankOffer[]> => {
    const { data } = await api.get<BankOffer[]>('/bank-offers/compare', { params });
    return data;
  },

  // Создание нового предложения (для админа)
  create: async (offer: Omit<BankOffer, 'id'>): Promise<BankOffer> => {
    const { data } = await api.post<BankOffer>('/bank-offers', offer);
    return data;
  },

  // Обновление предложения (для админа)
  update: async (id: string, offer: Partial<BankOffer>): Promise<BankOffer> => {
    const { data } = await api.patch<BankOffer>(`/bank-offers/${id}`, offer);
    return data;
  },

  // Удаление предложения (для админа)
  delete: async (id: string): Promise<void> => {
    await api.delete(`/bank-offers/${id}`);
  },
};
