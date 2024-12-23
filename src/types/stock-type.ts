export type StockType = {
  reutersCode: string; // AAPL.O
  stockName: string; // 애플
  stockNameEng: string; // Apple Inc
  symbolCode: string; // AAPL
  tradeStopType: {
    code: '1' | '2';
    text: '운영.Trading' | '정지.Halted';
    name: 'TRADING' | 'HALTED';
  };
  stockExchangeType: {
    code: string; // NSQ
    nationType: string; // USA
    nameKor: string; // 나스닥 증권거래소
    nameEng: string; // NASDAQ Stock Exchange
    name: string; // NASDAQ
    nationName: string; // 미국
    nationCode: string; // USA
  };
  closePrice: string; // 마감가
  compareToPreviousClosePrice: string; // 변화값
  fluctuationsRatio: string; // 변화율
  overMarketPriceInfo: {
    overPrice: string; // 주가
  };
  imageCharts: {
    day: string;
    candleMonth: string;
    areaYear: string;
    day_up_tablet: string;
    areaYearThree: string;
    areaMonthThree: string;
    transparent: string;
    day_up: string;
    candleWeek: string;
    candleDay: string;
    areaYearTen: string;
  };
  currencyType: {
    text: string; // US dollar
    name: string; // USD
  };
  stockItemTotalInfos: [
    {
      code: 'basePrice'; // 전일
      key: '전일'; // 전일
      value: string; // 253.48
    },
    {
      code: 'openPrice'; // 시가
      key: '시가'; // 시가
      value: string; // 252.16
      compareToPreviousPrice: {
        code: string; // 5
        text: string; // 하락
        name: string; // FALLING
      };
    },
    {
      code: 'highPrice'; // 고가
      key: '고가'; // 고가
      value: string; // 254.28
      compareToPreviousPrice: {
        code: string; // 2
        text: string; // 상승
        name: string; // RISING
      };
    },
    {
      code: 'lowPrice'; // 저가
      key: '저가'; // 저가
      value: string; // 247.74
      compareToPreviousPrice: {
        code: string; // 5
        text: string; // 하락
        name: string; // FALLING
      };
    },
    {
      code: 'accumulatedTradingVolume'; // 거래량
      key: '거래량'; // 거래량
      value: string; // 56,774,101
    },
    {
      code: 'accumulatedTradingValue'; // 대금
      key: '대금'; // 대금
      value: string; // 142억 USD
    },
    {
      code: 'marketValue'; // 시총
      key: '시총'; // 시총
      value: string; // 3조 7,495억 USD
      valueDesc: string; // 5,435조 9,960억원
    },
    {
      code: 'industryGroupKor'; // 업종
      key: '업종'; // 업종
      value: string; // 전화 및 소형 장치
    },
    {
      code: 'highPriceOf52Weeks'; // 52주 최고
      key: '52주 최고'; // 52주 최고
      keyDesc: string; // 2024.12.17.
      value: string; // 253.83
    },
    {
      code: 'lowPriceOf52Weeks'; // 52주 최저
      key: '52주 최저'; // 52주 최저
      keyDesc: string; // 2024.04.19.
      value: string; // 164.08
    },
    {
      code: 'per'; // PER
      key: 'PER'; // PER
      keyDesc: string; // 2024.09.
      value: string; // 40.87배
    },
    {
      code: 'eps'; // EPS
      key: 'EPS'; // EPS
      keyDesc: string; // 2024.09.
      value: string; // 6.07
    },
    {
      code: 'pbr'; // PBR
      key: 'PBR'; // PBR
      keyDesc: string; // 2024.09.
      value: string; // 65.84배
    },
    {
      code: 'bps'; // BPS
      key: 'BPS'; // BPS
      keyDesc: string; // 2024.09.
      value: string; // 3.77
    },
    {
      code: 'dividend'; // 주당배당금
      key: '주당배당금'; // 주당배당금
      keyDesc: string; // 2024.11.
      value: string; // 1.00
    },
    {
      code: 'dividendYieldRatio'; // 배당수익률
      key: '배당수익률'; // 배당수익률
      keyDesc: string; // 2024.11.
      value: string; // 0.39%
    },
    {
      code: 'dividendAt'; // 배당일
      key: '배당일'; // 배당일
      value: string; // 2024.11.14.
    },
    {
      code: 'exDividendAt'; // 배당락일
      key: '배당락일'; // 배당락일
      value: string; // 2024.11.08.
    },
    {
      code: 'faceValueDivisionRate'; // 액면변경
      key: '액면변경'; // 액면변경
      keyDesc: string; // 2020.08.31.
      value: string; // 1:4 분할
    },
    {
      code: 'faceValue'; // 액면가
      key: '액면가'; // 액면가
      value: string; // N/A
    },
  ];
  nationType: string; // USA
  nationName: string; // 미국
};
