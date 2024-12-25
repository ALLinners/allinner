import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Traders } from './entities/traders.entity';
import { TradersService } from './traders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Traders])],
  controllers: [],
  providers: [TradersService],
  exports: [TradersService],
})
export class TradersModule {}
