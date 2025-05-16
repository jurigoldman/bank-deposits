import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, Min, IsOptional, MaxLength, IsPositive } from 'class-validator';

export class CreateBankOfferDto {
  @ApiProperty({ example: 'Big Bank Corp', description: 'Name of the bank', maxLength: 100 })
  @IsString()
  @MaxLength(100)
  bankName: string;

  @ApiPropertyOptional({ example: 'Super Saver Account', description: 'Name of the bank product/offer', maxLength: 100 })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  productName?: string;

  @ApiProperty({ example: 5.5, description: 'Annual interest rate (e.g., 5.5 for 5.5%)' })
  @IsNumber()
  @IsPositive()
  interestRate: number;

  @ApiProperty({ example: 1000, description: 'Minimum deposit amount for this offer', default: 0 })
  @IsNumber()
  @Min(0)
  minAmount: number;

  @ApiPropertyOptional({ example: 50000, description: 'Maximum deposit amount for this offer' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxAmount?: number;

  @ApiProperty({ example: 12, description: 'Term of the deposit in months' })
  @IsNumber()
  @IsPositive()
  termMonths: number;
}