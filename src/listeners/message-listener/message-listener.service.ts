import { ConflictException, Injectable } from '@nestjs/common';
import { Message, OmitPartialGroupDMChannel } from 'discord.js';
import { fetchStockData } from '../../util/fetch-stock-data';
import { createStockEmbed } from '../../component-builder/create-stock-embed';
import { createStockButton } from '../../component-builder/create-stock-button';
import { createStockTypeEmbed } from '../../component-builder/create-stock-type-embed';
import { UserService } from '../../user/user.service';
import { StockService } from '../../services/stock.service';
import { MessageCacheService } from '../../services/message-cache.service';

@Injectable()
export class MessageListenerService {
  constructor(
    private readonly messageCacheService: MessageCacheService,
    private readonly userService: UserService,
    private readonly stockService: StockService,
  ) {}

  async handleMessage(message: OmitPartialGroupDMChannel<Message<boolean>>) {
    const [command, ...args] = message.content.slice(1).split(' ');

    if (!command) {
      message.channel.send('명령어를 입력해주세요.');
    } else if (command === '가입') {
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
    } else if (command === '탈퇴') {
      try {
        await this.userService.delete(message.author.id);
        await message.reply('탈퇴가 완료되었습니다.');
      } catch (e) {
        if (e instanceof ConflictException) {
          await message.reply(
            message.author.globalName + '님은 가입되지 않은 사용자입니다.',
          );
        }
      }
    } else if (command === '주식') {
      const stockName = args[0]; // 테슬라

      if (!stockName) {
        message.channel.send("'!주식 <종목명>' 으로 입력해주세요");
        return;
      }
      const findStock = await this.stockService.findByName(stockName);
      console.log(JSON.stringify(findStock));

      if (!findStock) {
        message.channel.send(stockName + ' (이)라는 종목을 찾을 수 없어요.');
      }

      const stockData = await fetchStockData(findStock);

      const stockEmbed = await createStockEmbed(stockData);
      const stockRow = await createStockButton(stockData);

      await message.channel.send({
        embeds: [stockEmbed],
        components: [stockRow],
      });

      if (this.messageCacheService.getState(message.author.id))
        this.messageCacheService.deleteState(message.author.id);
      this.messageCacheService.setState(message.author.id, message);
    } else if (command === '종목') {
      const findStocks = await this.stockService.findAll();
      const stockList = findStocks.map((stock) => stock.name);
      const stockTypeEmbed = createStockTypeEmbed(stockList);
      message.channel.send({ embeds: [stockTypeEmbed] });
    } else {
      message.channel.send(command + ' (이)라는 명령어가 존재하지 않아요.');
    }
  }
}
