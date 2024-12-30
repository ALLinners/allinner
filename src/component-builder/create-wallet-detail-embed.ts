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
      currentPrice.push(await calculateUsdToKrw(stockData.closePrice));
    else currentPrice.push(stockData.closePrice.replace(/,/g, ''));
  }

  let description = '';
  description += '예수금: ' + wallet.balance + '원\n';
  description += '계좌번호: ' + wallet.accountNumber + '\n';

  description += '```diff\n';
  console.log(stocks);
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
      formatCurrency(stock.price * stock.amount) +
      calculateSpace(formatCurrency(stock.price * stock.amount), 10) +
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
