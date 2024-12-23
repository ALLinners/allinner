import { Injectable } from '@nestjs/common';
import {
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  Message,
  OmitPartialGroupDMChannel,
  ButtonStyle,
} from 'discord.js';
import { MessageCacheService } from '../../message-cache/message-cache.service';
import { StockListType } from '../../types/stock-list-type';
import { fetchStockData } from '../../util/fetch-stock-data';
import { getKospiMarketValue } from '../../util/get-kospi-market-value';
import { formatCurrency } from '../../util/format-currency';
import { getChangeValueWithIcon } from '../../util/get-icon-by-rate';
import { getMarketValue } from '../../util/get-market-value';

@Injectable()
export class MessageListenerService {
  constructor(private readonly messageCacheService: MessageCacheService) {}

  async handleMessage(message: OmitPartialGroupDMChannel<Message<boolean>>) {
    const [command, ...args] = message.content.slice(1).split(' ');

    switch (command) {
      case '주식': // !주식 테슬라
        const stockName = args[0]; // 테슬라
        const reutersCode = StockListType[stockName];

        if (!reutersCode) {
          message.channel.send(stockName + ' (이)라는 종목을 찾을 수 없어요.');
          break;
        }

        const stockData = await fetchStockData(reutersCode);

        const currentPrice = Number(stockData.closePrice.replace(/,/g, ''));
        const titleIcon =
          Number(stockData.compareToPreviousClosePrice) < 0 ? '📉' : '📈';
        const marketValueKospi = await getKospiMarketValue(reutersCode);

        const embed = new EmbedBuilder()
          .setColor(0x0099ff)
          .setTitle(titleIcon + ' ' + stockData.stockNameEng)
          .setDescription(
            formatCurrency(currentPrice) +
              ' ' +
              (stockData.currencyType ? stockData.currencyType.name : 'KRW') +
              '\u3000' +
              getChangeValueWithIcon(stockData.compareToPreviousClosePrice) +
              '\u3000' +
              stockData.fluctuationsRatio +
              '%',
          )
          .setImage(stockData.imageCharts.day_up)
          .addFields({
            name: '시가총액',
            value: stockData.stockItemTotalInfos
              ? getMarketValue(stockData)
              : marketValueKospi,
          })
          .setFooter({
            text:
              stockData.stockExchangeType.name + ' / ' + stockData.symbolCode,
          });

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
          new ButtonBuilder()
            .setCustomId('buyStock')
            .setLabel(
              stockData.closePrice +
                ' ' +
                (stockData.currencyType ? stockData.currencyType.name : 'KRW') +
                '에 매수하기',
            )
            .setStyle(ButtonStyle.Primary),
        );

        await message.channel.send({
          embeds: [embed],
          components: [row],
        });

        if (this.messageCacheService.getState(message.author.id)) {
          this.messageCacheService.deleteState(message.author.id);
        }
        this.messageCacheService.setState(message.author.id, message);

        break;

      default:
        message.channel.send(command + ' (이)라는 명령어가 존재하지 않아요.');
        break;
    }
  }
}
