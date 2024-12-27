import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TradeHistory } from '../entities/trade-history.entity';
import { User } from '../entities/user.entity';
import { Stock } from '../entities/stock.entity';
import { fetchStockData } from '../util/fetch-stock-data';
import { StockService } from './stock.service';

@Injectable()
export class TradeHistoryService {
  constructor(
    @InjectRepository(TradeHistory)
    private readonly tradeHistoryRepository: Repository<TradeHistory>,
    private readonly stockService: StockService,
  ) {}

  async buy(user: User, stock: Stock) {
    const stockData = await fetchStockData(
      await this.stockService.findByName('삼성전자'),
    );
    return await this.tradeHistoryRepository.save({
      price: Number(stockData.closePrice.replace(/,/g, '')),
      user: user,
      stock: stock,
    });
  }

  async findAllByUser(user: User) {
    // todo 여러번에 걸쳐 매수된거 계산, 매수, 매도 구분 컬럼 추후 추가
    return await this.tradeHistoryRepository.find({
      where: { user: user },
      relations: ['stock', 'stock.trader'],
    });
  }
}
