import { Module } from '@nestjs/common';
import { InteractionListenerService } from './interaction-listener.service';
import { MessageCacheModule } from '../../message-cache/message-cache.module';

@Module({
  imports: [MessageCacheModule],
  controllers: [],
  providers: [InteractionListenerService],
  exports: [InteractionListenerService],
})
export class InteractionListenerModule {}
