import { EmbedBuilder } from 'discord.js';
import { formatCurrency } from '../util/format-currency';
import { getChangeValueWithIcon } from '../util/get-icon-by-rate';
import { getMarketValue } from '../util/get-market-value';
import { StockType } from '../types/stock-type';
import { getKospiMarketValue } from '../util/get-kospi-market-value';

export const createStockEmbed = async (stockData: StockType) => {
  const titleIcon =
    Number(stockData.compareToPreviousClosePrice) < 0 ? '📉' : '📈';
  const currentPrice = Number(stockData.closePrice.replace(/,/g, ''));
  const marketValueKospi = await getKospiMarketValue(stockData.reutersCode);

  return new EmbedBuilder()
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
      text: stockData.stockExchangeType.name + ' / ' + stockData.symbolCode,
    });
};
