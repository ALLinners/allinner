import { Wallet } from '../wallet/entities/wallet.entity';
import { EmbedBuilder } from 'discord.js';
import { StockType } from '../types/stock-type';
import { getChangeValueWithIcon } from '../util/get-icon-by-rate';
import { calculateSpace } from '../util/calculate-space';

export const createWalletDetailEmbed = async (
  ownerName: string,
  wallet: Wallet,
  stocks: StockType[],
) => {
  let description = '';
  description += '소유자: ' + ownerName + '\n';
  description += '잔고: ' + wallet.balance + '원\n';
  description +=
    '계좌 번호: ' + wallet.accountNumber + '\n\n보유주식들 현황:\n';

  description += '```';
  description +=
    '종목' +
    '　'.repeat(8) +
    '가격　변화' +
    '　'.repeat(2) +
    '이익률　변화' +
    '\n';
  description += '---------------------------------\n';
  stocks.forEach((stock) => {
    const stockName = stock.stockName;
    const stockDelta = stock.compareToPreviousClosePrice;
    const stockDeltaPercentWithIcon = getChangeValueWithIcon(stockDelta);
    description +=
      stockName +
      calculateSpace(stockName, 10) +
      stockDeltaPercentWithIcon +
      calculateSpace(stockDeltaPercentWithIcon, 7) +
      stock.fluctuationsRatio +
      '%' +
      '\n';
  });
  description += '```';

  return new EmbedBuilder()
    .setColor(0x00ff00)
    .setTitle(ownerName + '지갑 정보')
    .setDescription(description);
};
