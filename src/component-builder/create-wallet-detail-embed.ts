import { Wallet } from '../entities/wallet.entity';
import { EmbedBuilder } from 'discord.js';
import { getChangeValueWithIcon } from '../util/get-icon-by-rate';
import { calculateSpace } from '../util/calculate-space';
import { TradeHistory } from '../entities/trade-history.entity';
import { fetchStockData } from '../util/fetch-stock-data';
import { calculateUsdToKrw } from '../util/calculate-usd-to-krw';
import { formatCurrency } from '../util/format-currency';

export const createWalletDetailEmbed = async (
  ownerName: string,
  wallet: Wallet,
  stocks: TradeHistory[],
) => {
  const currentPrice: number[] = [];

  for (const stock of stocks) {
    const stockData = await fetchStockData(stock.stock);
    if (stock.stock.trader.name === 'NASDAQ')
      currentPrice.push(
        await calculateUsdToKrw(stockData.overMarketPriceInfo.overPrice),
      );
    else
      currentPrice.push(
        stockData.overMarketPriceInfo.overPrice.replace(/,/g, ''),
      );
  }

  let totalProperty = 0;

  stocks.forEach((stock, index) => {
    totalProperty += Math.round(currentPrice[index] * stock.amount);
    totalProperty += wallet.balance;
  });

  let description = '';
  description += '총 자산 가치:　**' + formatCurrency(totalProperty) + '원**\n';
  description +=
    '예 　수 　금:　**' + formatCurrency(wallet.balance) + '원**\n';

  description += '```diff\n';

  stocks.forEach((stock, index) => {
    const stockName = stock.stock.name;
    const stockDelta = Math.round(
      (currentPrice[index] - stock.price) * stock.amount,
    );

    const changePercentage = (
      ((currentPrice[index] - stock.price) / stock.price) *
      100
    ).toFixed(2);

    const colorSelector =
      Number(changePercentage) > 0
        ? '+ '
        : Number(changePercentage) < 0
          ? '- '
          : '= ';

    const stockDeltaPercentWithIcon = getChangeValueWithIcon(stockDelta);
    description +=
      colorSelector +
      stockName +
      calculateSpace(stockName, 9) +
      String(stock.amount) +
      '주' +
      calculateSpace(String(stock.amount), 4) +
      formatCurrency(Math.round(currentPrice[index] * stock.amount)) +
      calculateSpace(
        formatCurrency(Math.round(currentPrice[index] * stock.amount)),
        9,
      ) +
      stockDeltaPercentWithIcon +
      calculateSpace(stockDeltaPercentWithIcon, 10) +
      changePercentage +
      '%' +
      '\n';
  });
  description += '```';

  return new EmbedBuilder()
    .setColor(0x00ff00)
    .setTitle(ownerName + '님의 총 자산')
    .setDescription(description);
};
