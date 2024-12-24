import { ConflictException, Injectable } from '@nestjs/common';
import { Message, OmitPartialGroupDMChannel } from 'discord.js';
import { MessageCacheService } from '../../message-cache/message-cache.service';
import { StockListType } from '../../types/stock-list-type';
import { fetchStockData } from '../../util/fetch-stock-data';
import { createStockEmbed } from '../../component-builder/create-stock-embed';
import { createStockButton } from '../../component-builder/create-stock-button';
import { createStockTypeEmbed } from '../../component-builder/create-stock-type-embed';
import { UserService } from '../../user/user.service';

@Injectable()
export class MessageListenerService {
  constructor(
    private readonly messageCacheService: MessageCacheService,
    private readonly userService: UserService,
  ) {}

  async handleMessage(message: OmitPartialGroupDMChannel<Message<boolean>>) {
    const [command, ...args] = message.content.slice(1).split(' ');

    switch (command) {
      case '가입':
        try {
          const user = await this.userService.signup({
            id: message.author.id,
            name: message.author.globalName,
          });

          await message.reply(user.name + '님 가입을 환영합니다.');
        } catch (e) {
          if (e instanceof ConflictException) {
            await message.reply(
              message.author.globalName + '님은 이미 가입되어 있습니다.',
            );
          }
        }

        break;

      case '주식': // !주식 테슬라
        const stockName = args[0]; // 테슬라
        const reutersCode = StockListType[stockName];

        if (!reutersCode) {
          message.channel.send(stockName + ' (이)라는 종목을 찾을 수 없어요.');
          break;
        }

        const stockData = await fetchStockData(reutersCode);

        const stockEmbed = await createStockEmbed(stockData);
        const stockRow = createStockButton(stockData);

        await message.channel.send({
          embeds: [stockEmbed],
          components: [stockRow],
        });

        if (this.messageCacheService.getState(message.author.id))
          this.messageCacheService.deleteState(message.author.id);
        this.messageCacheService.setState(message.author.id, message);

        break;

      case '종목':
        const stockTypeEmbed = createStockTypeEmbed(Object.keys(StockListType));
        message.channel.send({ embeds: [stockTypeEmbed] });
        break;

      default:
        message.channel.send(command + ' (이)라는 명령어가 존재하지 않아요.');
        break;
    }
  }
}
