import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trader } from './entities/trader.entity';
import { Repository } from 'typeorm';
import { Stock } from '../stock/entities/stock.entity';

@Injectable()
export class TraderService {
  constructor(
    @InjectRepository(Trader)
    private readonly traderRepository: Repository<Stock>,
  ) {}
}
