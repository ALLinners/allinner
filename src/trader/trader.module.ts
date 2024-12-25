import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trader } from './entities/trader.entity';
import { TraderService } from './trader.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trader])],
  controllers: [],
  providers: [TraderService],
  exports: [TraderService],
})
export class TraderModule {}
