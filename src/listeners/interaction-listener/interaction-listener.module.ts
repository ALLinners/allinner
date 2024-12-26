import { Module } from '@nestjs/common';
import { InteractionListenerService } from './interaction-listener.service';
import { StockModule } from '../../modules/stock.module';
import { MessageCacheModule } from '../../modules/message-cache.module';

@Module({
  imports: [MessageCacheModule, StockModule],
  controllers: [],
  providers: [InteractionListenerService],
  exports: [InteractionListenerService],
})
export class InteractionListenerModule {}
