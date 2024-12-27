import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from '../entities/wallet.entity';
import { WalletService } from '../services/wallet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet])],
  controllers: [],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}
