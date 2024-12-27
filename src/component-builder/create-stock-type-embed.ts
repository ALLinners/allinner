import { EmbedBuilder } from 'discord.js';
import { calculateSpace } from '../util/calculate-space';

export const createStockTypeEmbed = (stockNameList: string[]) => {
  let description = '';

  stockNameList.forEach((stockName, index) => {
    if (index % 2 === 1) description += stockName + '\n';
    else description += stockName + calculateSpace(stockName, 10);
  });

  return new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle('종목')
    .setDescription('```' + description + '\n```');
};
