import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Deposit } from './schemas/deposit.schema';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto'; 

@Injectable()
export class DepositsService {
  constructor(@InjectModel(Deposit.name) private depositModel: Model<Deposit>) {}

  async findAll(): Promise<Deposit[]> {
    return this.depositModel.find().exec();
  }

  //Новый метод для поиска подходящих вкладов
  async findMatching(amount: number, term: number): Promise<Deposit[]> {
    //Логика может быть сложнее, например, искать вклады >= amount и >= term
    //Здесь для примера ищем точное совпадение или больше
    return this.depositModel.find({
      amount: { $gte: amount },
      term: { $gte: term },
    }).exec();
  }

  async create(createDepositDto: CreateDepositDto): Promise<Deposit> {
    //проверка, что amount и term передаются при создании
    const newDeposit = new this.depositModel(createDepositDto);
    return newDeposit.save();
  }

  //Новый метод для обновления вклада
  async update(id: string, updateDepositDto: UpdateDepositDto): Promise<Deposit> {
    const existingDeposit = await this.depositModel.findByIdAndUpdate(id, updateDepositDto, { new: true }).exec();
    if (!existingDeposit) {
      throw new NotFoundException(`Deposit with ID "${id}" not found`);
    }
    return existingDeposit;
  }
}