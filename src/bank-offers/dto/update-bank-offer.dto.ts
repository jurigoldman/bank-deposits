import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, Min, MaxLength, IsPositive } from 'class-validator';

export class UpdateBankOfferDto {
  @ApiPropertyOptional({ description: 'Name of the bank', maxLength: 100 })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  bankName?: string;

  @ApiPropertyOptional({ description: 'Name of the bank product/offer', maxLength: 100 })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  productName?: string;

  @ApiPropertyOptional({ description: 'Annual interest rate (e.g., 5.5 for 5.5%)' })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  interestRate?: number;

  @ApiPropertyOptional({ description: 'Minimum deposit amount for this offer' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minAmount?: number;

  @ApiPropertyOptional({ description: 'Maximum deposit amount for this offer' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxAmount?: number;

  @ApiPropertyOptional({ description: 'Term of the deposit in months' })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  termMonths?: number;
}