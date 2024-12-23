import { StockType } from '../types/stock-type';

export const getMarketValue = (stockData: StockType) => {
  const marketValueInfo = stockData.stockItemTotalInfos.find(
    (o) => o.code === 'marketValue',
  );
  if (marketValueInfo?.code === 'marketValue') {
    return marketValueInfo ? marketValueInfo.valueDesc : 'N/A';
  }

  return 'N/A';
};
