import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// Этот DTO описывает одно предложение в результате сравнения
export class BankOfferComparisonResultDto {
  @ApiProperty({ example: '60d21b4667d0d8992e610c85', description: 'Unique identifier of the bank offer' })
  _id: string;

  @ApiProperty({ example: 'Big Bank Corp', description: 'Name of the bank' })
  bankName: string;

  @ApiPropertyOptional({ example: 'Super Saver Account', description: 'Name of the bank product/offer' })
  productName?: string;

  @ApiProperty({ example: 5.5, description: 'Annual interest rate (e.g., 5.5 for 5.5%)' })
  interestRate: number;

  @ApiProperty({ example: 1000, description: 'Minimum deposit amount for this offer' })
  minAmount: number;

  @ApiPropertyOptional({ example: 50000, description: 'Maximum deposit amount for this offer. Can be null if no limit.' })
  maxAmount?: number; // В схеме это number (default: Infinity), здесь делаем optional для DTO

  @ApiProperty({ example: 12, description: 'Term of the deposit in months' })
  termMonths: number;

  @ApiPropertyOptional({ description: 'Date and time of creation' })
  createdAt?: Date;

  @ApiPropertyOptional({ description: 'Date and time of last update' })
  updatedAt?: Date;

  // Дополнительные поля для результата сравнения
  @ApiProperty({ example: 10000, description: 'The deposit amount used for this comparison' })
  depositAmount: number;

  @ApiProperty({ example: 12, description: 'The deposit term in months used for this comparison' })
  depositTermMonths: number;

  @ApiProperty({ example: 550, description: 'Calculated profit for the given amount and term with this offer' })
  profit: number;
}