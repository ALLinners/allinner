import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trader } from '../entities/trader.entity';
import { Stock } from '../entities/stock.entity';

@Injectable()
export class TraderService {
  constructor(
    @InjectRepository(Trader)
    private readonly traderRepository: Repository<Stock>,
  ) {}
}
