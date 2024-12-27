import { NotFoundException } from '@nestjs/common';

export const calculateUsdToKrw = async (usd: number) => {
  try {
    const response = await fetch(
      'https://m.stock.naver.com/front-api/marketIndex/prices?category=exchange&reutersCode=FX_USDKRW&page=1',
    );
    const usdData = await response.json();
    const krwPerUsd = Number(usdData.result[0].closePrice.replace(/,/g, ''));
    return krwPerUsd * usd;
  } catch {
    throw new NotFoundException();
  }
};
