import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { InteractionListenerService } from './listeners/interaction-listener/interaction-listener.service';
import { MessageListenerService } from './listeners/message-listener/message-listener.service';
import { MessageListenerModule } from './listeners/message-listener/message-listener.module';
import { InteractionListenerModule } from './listeners/interaction-listener/interaction-listener.module';
import { MessageCacheModule } from './message-cache/message-cache.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MessageListenerModule,
    InteractionListenerModule,
    MessageCacheModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
