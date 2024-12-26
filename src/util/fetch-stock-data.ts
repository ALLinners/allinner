import { StockType } from '../types/stock-type';
import { Stock } from '../stock/entities/stock.entity';

export const fetchStockData = async (
  stock: Stock,
): Promise<StockType | any> => {
  const fetchFromAPI = async (url: string): Promise<any> => {
    const response = await fetch(url);
    return response.json();
  };

  const formatKospiData = (data: any): StockType | any => {
    if (data.code === 'StockConflict') {
      return data;
    }

    return {
      ...data,
      currencyType: { text: 'KR won', name: 'KRW' },
      compareToPreviousClosePrice: data.compareToPreviousClosePrice.replace(
        /,/g,
        '',
      ),
      stockNameEng: data.stockName,
      symbolCode: data.reutersCode,
    };
  };

  if (stock.trader.name === 'NASDAQ') {
    stock.reutersCode += '.O';
  }

  const data = await fetchFromAPI(
    `${stock.trader.baseUri}${stock.reutersCode}/basic`,
  );

  return stock.trader.name === 'KOSPI' ? formatKospiData(data) : data;
};
