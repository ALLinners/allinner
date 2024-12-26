import { Module } from '@nestjs/common';
import { MessageListenerService } from './message-listener.service';
import { MessageCacheModule } from '../../message-cache/message-cache.module';
import { UserModule } from '../../user/user.module';
import { StockModule } from '../../stock/stock.module';

@Module({
  imports: [MessageCacheModule, UserModule, StockModule],
  controllers: [],
  providers: [MessageListenerService],
  exports: [MessageListenerService],
})
export class MessageListenerModule {}
