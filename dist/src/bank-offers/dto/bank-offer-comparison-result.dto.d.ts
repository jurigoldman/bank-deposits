export declare class BankOfferComparisonResultDto {
    _id: string;
    bankName: string;
    productName?: string;
    interestRate: number;
    minAmount: number;
    maxAmount?: number;
    termMonths: number;
    createdAt?: Date;
    updatedAt?: Date;
    depositAmount: number;
    depositTermMonths: number;
    profit: number;
}
