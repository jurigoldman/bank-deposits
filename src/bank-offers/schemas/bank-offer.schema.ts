import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class BankOffer extends Document {
  @Prop({ type: String, required: true, trim: true })
  bankName: string;

  @Prop({ type: String, trim: true })
  productName?: string;

  @Prop({ type: Number, required: true })
  interestRate: number;

  @Prop({ type: Number, default: 0 })
  minAmount: number;

  @Prop({ type: Number, default: Infinity })
  maxAmount: number;

  @Prop({ type: Number, required: true })
  termMonths: number;
}

export const BankOfferSchema = SchemaFactory.createForClass(BankOffer);