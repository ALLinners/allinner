import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { StockType } from '../types/stock-type';

export const createStockButton = (stockData: StockType) => {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
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
};
