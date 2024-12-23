import { StockType } from '../types/stock-type';

export const fetchStockData = async (
  reutersCode: string,
): Promise<StockType | any> => {
  const isKospi =
    !isNaN(Number(reutersCode)) && !isNaN(parseFloat(reutersCode));

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

  const baseUrl = isKospi
    ? 'https://m.stock.naver.com/api/stock/'
    : 'https://api.stock.naver.com/stock/';

  const data = await fetchFromAPI(`${baseUrl}${reutersCode}/basic`);

  return isKospi ? formatKospiData(data) : data;
};
