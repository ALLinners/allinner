import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from '../entities/stock.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
  ) {}

  async findByName(name: string) {
    return await this.stockRepository.findOne({
      where: { name: name },
      relations: ['trader'],
    });
  }

  async findAll() {
    return await this.stockRepository.find();
  }
}
