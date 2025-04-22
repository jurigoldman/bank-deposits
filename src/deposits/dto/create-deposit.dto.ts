import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min } from 'class-validator';

export class CreateDepositDto {
  @ApiProperty({ example: 'Bank A', description: 'Name of the bank' })
  @IsString()
  bank: string;

  @ApiProperty({ example: 2.5, description: 'Interest rate of the deposit' })
  @IsNumber()
  @Min(0)
  interestRate: number;
}