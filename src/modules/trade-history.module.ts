import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradeHistory } from '../entities/trade-history.entity';
import { TradeHistoryService } from '../services/trade-history.service';
import { StockModule } from './stock.module';

@Module({
  imports: [TypeOrmModule.forFeature([TradeHistory]), StockModule],
  controllers: [],
  providers: [TradeHistoryService],
  exports: [TradeHistoryService],
})
export class TradeHistoryModule {}
