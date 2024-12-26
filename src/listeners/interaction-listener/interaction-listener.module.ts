import { Module } from '@nestjs/common';
import { InteractionListenerService } from './interaction-listener.service';
import { MessageCacheModule } from '../../message-cache/message-cache.module';
import { StockModule } from '../../stock/stock.module';

@Module({
  imports: [MessageCacheModule, StockModule],
  controllers: [],
  providers: [InteractionListenerService],
  exports: [InteractionListenerService],
})
export class InteractionListenerModule {}
