import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Deposit extends Document {
  @Prop({ required: true })
  bank: string;

  @Prop({ required: true })
  interestRate: number;

  @Prop({ required: true })
  amount: number; //Добавлено поле для суммы

  @Prop({ required: true })
  term: number; //Добавлено поле для срока (в месяцах, например)
}

export const DepositSchema = SchemaFactory.createForClass(Deposit);