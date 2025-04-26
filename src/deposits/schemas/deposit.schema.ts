import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Deposit extends Document {
  @Prop({ required: true })
  bank: string;

  @Prop({ required: true })
  interestRate: number;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  term: number;
}

export const DepositSchema = SchemaFactory.createForClass(Deposit);