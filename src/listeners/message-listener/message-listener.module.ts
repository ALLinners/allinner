import { Module } from '@nestjs/common';
import { MessageListenerService } from './message-listener.service';
import { MessageCacheModule } from '../../message-cache/message-cache.module';
import { UserModule } from '../../user/user.module';

@Module({
  imports: [MessageCacheModule, UserModule],
  controllers: [],
  providers: [MessageListenerService],
  exports: [MessageListenerService],
})
export class MessageListenerModule {}
