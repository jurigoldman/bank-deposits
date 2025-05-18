export interface BankOffer {
  id: string;
  bankName: string;
  rate: number; // Годовая процентная ставка, например, 0.05 для 5%
  minAmount: number;
  maxAmount?: number; // Опционально, если нет максимальной суммы
  minTerm: number; // Минимальный срок в месяцах
  maxTerm?: number; // Опционально, если есть максимальный срок
  currency?: string; // Валюта вклада
  logoUrl?: string; // URL логотипа банка
  compoundingFrequency?: 'monthly' | 'end_of_term' | 'quarterly' | 'annually'; // Частота капитализации
  specialConditions?: string[]; // Дополнительные условия
  isEarlyWithdrawal?: boolean; // Возможность досрочного снятия
  isCapitalization?: boolean; // Капитализация процентов
  additionalConditions?: string; // Дополнительные условия в виде текста
}

export interface BankOfferComparisonParams {
  amount: number;
  termInMonths: number;
  isEarlyWithdrawal?: boolean;
  isCapitalization?: boolean;
}

export interface BankOfferComparisonResult {
  bankName: string;
  interestRate: number;
  totalAmount: number;
  interestAmount: number;
  monthlyPayment?: number;
  logoUrl?: string;
}