import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { StockService } from './stock.service';

@Module({
  imports: [TypeOrmModule.forFeature([Stock])],
  controllers: [],
  providers: [StockService],
  exports: [StockService],
})
export class StockModule {}
