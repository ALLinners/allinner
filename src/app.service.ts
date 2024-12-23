import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  Client,
  GatewayIntentBits,
  Interaction,
  Message,
  OmitPartialGroupDMChannel,
  Partials,
} from 'discord.js';
import { ConfigService } from '@nestjs/config';
import { MessageListenerService } from './listeners/message-listener/message-listener.service';
import { InteractionListenerService } from './listeners/interaction-listener/interaction-listener.service';

@Injectable()
export class AppService implements OnModuleInit {
  private client: Client;

  constructor(
    private readonly configService: ConfigService,
    private readonly commandListenerService: MessageListenerService,
    private readonly interactionListenerService: InteractionListenerService,
  ) {
    this.client = new Client({
      intents: [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
      ],
      partials: [Partials.Channel],
    });
  }

  async onModuleInit() {
    await this.client.login(this.configService.get<string>('TOKEN'));
    this.initializeListeners();
  }

  private initializeListeners() {
    this.client.on('ready', () => {
      console.log(`Logged in as ${this.client.user.tag}`);
    });

    this.client.on(
      'messageCreate',
      (message: OmitPartialGroupDMChannel<Message<boolean>>) => {
        if (message.author.bot) return; // 메세지 작성자가 봇이면 리턴
        if (!message.content.startsWith('!')) return; // 메세지가 !로 시작하지 않으면 리턴
        this.commandListenerService.handleMessage(message);
      },
    );

    this.client.on('interactionCreate', (interaction: Interaction) => {
      this.interactionListenerService.handleInteraction(interaction);
    });
  }
}
