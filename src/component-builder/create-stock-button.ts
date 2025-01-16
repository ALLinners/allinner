import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { StockType } from '../types/stock-type';
import { calculateUsdToKrw } from '../util/calculate-usd-to-krw';
import { formatCurrency } from '../util/format-currency';

export const createStockButton = async (stockData: StockType) => {
  if (stockData.currencyType && stockData.currencyType.name === 'USD') {
    const krw = await calculateUsdToKrw(
      stockData.overMarketPriceInfo.overPrice,
    );
    stockData.closePrice = String(formatCurrency(Math.round(krw)));
  }

  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId('buyStock')
      .setLabel(
        stockData.overMarketPriceInfo.overPrice + ' ' + 'KRW 에 매수하기',
      )
      .setStyle(ButtonStyle.Primary),
  );
};
