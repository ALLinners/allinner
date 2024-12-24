import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessageListenerModule } from './listeners/message-listener/message-listener.module';
import { InteractionListenerModule } from './listeners/interaction-listener/interaction-listener.module';
import { MessageCacheModule } from './message-cache/message-cache.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './config/get-typeorm-config';
import { UserModule } from './user/user.module';
import { KospiModule } from './kospi/kospi.module';
import { NasdaqModule } from './nasdaq/nasdaq.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        getTypeOrmConfig(configService),
    }),
    MessageListenerModule,
    InteractionListenerModule,
    MessageCacheModule,
    UserModule,
    KospiModule,
    NasdaqModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
