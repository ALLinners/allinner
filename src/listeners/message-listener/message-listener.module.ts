import { Module } from '@nestjs/common';
import { MessageListenerService } from './message-listener.service';
import { UserModule } from '../../user/user.module';
import { MessageCacheModule } from '../../modules/message-cache.module';
import { StockModule } from '../../modules/stock.module';

@Module({
  imports: [MessageCacheModule, UserModule, StockModule],
  controllers: [],
  providers: [MessageListenerService],
  exports: [MessageListenerService],
})
export class MessageListenerModule {}
