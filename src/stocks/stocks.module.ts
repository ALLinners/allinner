import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stocks } from './entities/stocks.entity';
import { StocksService } from './stocks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Stocks])],
  controllers: [],
  providers: [StocksService],
  exports: [StocksService],
})
export class StocksModule {}
