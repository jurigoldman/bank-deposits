export interface BankOffer {
    id: string;
    bankName: string;
    rate: number;
    minAmount: number;
    maxAmount?: number;
    minTerm: number;
    maxTerm?: number;
    currency?: string;
    logoUrl?: string;
    compoundingFrequency?: 'monthly' | 'end_of_term' | 'quarterly' | 'annually';
    specialConditions?: string[];
    isEarlyWithdrawal?: boolean;
    isCapitalization?: boolean;
    additionalConditions?: string;
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
