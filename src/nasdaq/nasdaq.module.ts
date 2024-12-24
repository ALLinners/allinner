import { Module } from '@nestjs/common';
import { NasdaqService } from './nasdaq.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nasdaq } from './entities/nasdaq.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nasdaq])],
  controllers: [],
  providers: [NasdaqService],
  exports: [NasdaqService],
})
export class NasdaqModule {}
