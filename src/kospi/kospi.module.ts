import { Module } from '@nestjs/common';
import { KospiService } from './kospi.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kospi } from './entities/kospi.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Kospi])],
  controllers: [],
  providers: [KospiService],
  exports: [KospiService],
})
export class KospiModule {}
