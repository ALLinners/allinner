import { Module } from '@nestjs/common';
import { MessageListenerService } from './message-listener.service';
import { UserModule } from '../../modules/user.module';
import { MessageCacheModule } from '../../modules/message-cache.module';
import { StockModule } from '../../modules/stock.module';
import { WalletModule } from '../../modules/wallet.module';
import { TradeHistoryModule } from '../../modules/trade-history.module';

@Module({
  imports: [
    MessageCacheModule,
    UserModule,
    StockModule,
    WalletModule,
    TradeHistoryModule,
  ],
  controllers: [],
  providers: [MessageListenerService],
  exports: [MessageListenerService],
})
export class MessageListenerModule {}
