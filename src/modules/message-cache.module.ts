import { Module } from '@nestjs/common';
import { MessageCacheService } from '../services/message-cache.service';

@Module({
  imports: [],
  controllers: [],
  providers: [MessageCacheService],
  exports: [MessageCacheService],
})
export class MessageCacheModule {}
