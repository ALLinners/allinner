import { Module } from '@nestjs/common';
import { MessageListenerService } from './message-listener.service';
import { MessageCacheModule } from '../../message-cache/message-cache.module';

@Module({
  imports: [MessageCacheModule],
  controllers: [],
  providers: [MessageListenerService],
  exports: [MessageListenerService],
})
export class MessageListenerModule {}
