import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose'; // Импортируем Types для ObjectId
import { Deposit } from './schemas/deposit.schema';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';

export interface DepositWithProfit {
  _id: string;
  bank: string;
  interestRate: number;
  amount: number;
  term: number;
  __v: number;
  profit: number;
}

@Injectable()
export class DepositsService {
  constructor(@InjectModel(Deposit.name) private depositModel: Model<Deposit>) {}

  async findAll(): Promise<Deposit[]> {
    return this.depositModel.find().exec();
  }

  async findMatching(amount: number, term: number): Promise<DepositWithProfit[]> {
    const deposits = await this.depositModel
      .find({
        amount: { $gte: amount },
        term: { $gte: term },
      })
      .exec();

    const depositsWithProfit = deposits.map(deposit => {
      const depositObj = deposit.toObject() as { _id: Types.ObjectId; bank: string; interestRate: number; amount: number; term: number; __v: number };
      return {
        _id: depositObj._id.toString(), // Теперь TypeScript знает, что _id — это ObjectId
        bank: depositObj.bank,
        interestRate: depositObj.interestRate,
        amount: depositObj.amount,
        term: depositObj.term,
        __v: depositObj.__v,
        profit: depositObj.amount * (depositObj.interestRate / 100) * (depositObj.term / 12),
      };
    });

    return depositsWithProfit.sort((a, b) => b.profit - a.profit);
  }

  async create(createDepositDto: CreateDepositDto): Promise<Deposit> {
    const newDeposit = new this.depositModel(createDepositDto);
    return newDeposit.save();
  }

  async update(id: string, updateDepositDto: UpdateDepositDto): Promise<Deposit> {
    const existingDeposit = await this.depositModel.findByIdAndUpdate(id, updateDepositDto, { new: true }).exec();
    if (!existingDeposit) {
      throw new NotFoundException(`Deposit with ID "${id}" not found`);
    }
    return existingDeposit;
  }
}