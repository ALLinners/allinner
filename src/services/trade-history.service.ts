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
    const trades = await this.tradeHistoryRepository.find({
      where: { user: user },
      relations: ['stock', 'stock.trader'],
    });

    const holdings = trades.reduce(
      (
        acc: { [key: number]: { quantity: number; totalCost: number } },
        trade,
      ) => {
        const { stock, price, tradeType } = trade;
        if (!acc[stock.id]) acc[stock.id] = { quantity: 0, totalCost: 0 };

        if (tradeType === '매수') {
          acc[stock.id].quantity += trade.amount;
          acc[stock.id].totalCost += parseFloat(price.toString());
        } else if (tradeType === '매도') {
          acc[stock.id].quantity -= trade.amount;
          acc[stock.id].totalCost -= parseFloat(price.toString());
        }

        return acc;
      },
      {},
    );

    const result = Object.entries(holdings).map(
      ([stockId, { quantity, totalCost }]) => ({
        stockId: Number(stockId),
        quantity,
        averagePrice: quantity > 0 ? Math.round(totalCost / quantity) : 0,
      }),
    );

    const tradesResult: TradeHistory[] = [];

    result.forEach((o) => {
      const match = trades.find((trade) => trade.stock.id === o.stockId);
      const myTrade: TradeHistory = {
        ...match,
        price: o.averagePrice,
        amount: o.quantity,
      };
      tradesResult.push(myTrade);
    });

    return tradesResult;
  }
}
