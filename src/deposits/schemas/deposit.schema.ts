import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Deposit extends Document {
  @Prop({ required: true })
  bank: string;

  @Prop({ required: true })
  interestRate: number;
}

export const DepositSchema = SchemaFactory.createForClass(Deposit);