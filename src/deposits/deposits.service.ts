import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Deposit } from './schemas/deposit.schema';
import { CreateDepositDto } from './dto/create-deposit.dto';

@Injectable()
export class DepositsService {
  constructor(@InjectModel(Deposit.name) private depositModel: Model<Deposit>) {}

  async findAll(): Promise<Deposit[]> {
    return this.depositModel.find().exec();
  }

  async create(createDepositDto: CreateDepositDto): Promise<Deposit> {
    const newDeposit = new this.depositModel(createDepositDto);
    return newDeposit.save();
  }
}